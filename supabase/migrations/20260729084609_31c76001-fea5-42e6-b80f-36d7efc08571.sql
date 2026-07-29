-- ROLES
CREATE TYPE public.app_role AS ENUM ('super_admin','admin','customer');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','admin'));
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Staff read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  county text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.is_staff(auth.uid()));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- PRODUCTS
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text,
  description text,
  price_kes integer NOT NULL DEFAULT 0,
  compare_at_kes integer,
  image_url text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  in_stock boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published products" ON public.products FOR SELECT TO anon USING (is_published);
CREATE POLICY "Signed in reads products" ON public.products FOR SELECT TO authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update products" ON public.products FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Super admin delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'super_admin'));

CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ORDERS
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number text NOT NULL UNIQUE DEFAULT ('VLT-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  status text NOT NULL DEFAULT 'pending',
  total_kes integer NOT NULL DEFAULT 0,
  delivery_status text NOT NULL DEFAULT 'preparing',
  courier text,
  tracking_number text,
  delivery_address text,
  estimated_delivery date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_staff(auth.uid()));
CREATE POLICY "Users create own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff update orders" ON public.orders FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  unit_price_kes integer NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  variant jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_staff(auth.uid()))));
CREATE POLICY "Users insert own order items" ON public.order_items FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- SEED CATALOG (prices in KES)
INSERT INTO public.products (category, slug, name, tagline, description, price_kes, sort_order) VALUES
('iphone','17','iPhone 17','Precision, refined.','A19 Bionic, 6.3-inch Super Retina XDR with ProMotion, 48MP Fusion camera system.',103900,1),
('iphone','16','iPhone 16','Hello, Apple Intelligence.','A18 chip, Camera Control, 48MP Fusion camera with macro.',90900,2),
('iphone','15','iPhone 15','Titanium arrives.','A16 Bionic, Dynamic Island, USB-C and a 48MP main camera.',77900,3),
('iphone','14','iPhone 14','Big and bigger.','A15 Bionic with Photonic Engine and Crash Detection.',68900,4),
('iphone','13','iPhone 13','Your new superpower.','A15 Bionic, Cinematic mode and sensor-shift stabilisation.',58900,5),
('iphone','12','iPhone 12','Blast past fast.','A14 Bionic, Ceramic Shield, 5G and the first MagSafe iPhone.',49900,6),
('iphone','11','iPhone 11','Just the right amount of everything.','A13 Bionic with Night mode and dual cameras.',38900,7),
('mac','macbook-pro','MacBook Pro','Mind-blowing. Head-turning.','M4 Pro or M4 Max, Liquid Retina XDR, up to 24 hours battery.',207900,1),
('mac','macbook-air','MacBook Air','Lean. Mean. M4 machine.','M4 chip, 13 or 15-inch Liquid Retina, up to 18 hours battery.',129900,2),
('mac','imac','iMac','Colourfully considered.','M4 chip, 24-inch 4.5K Retina display in seven finishes.',168900,3),
('mac','mac-mini','Mac mini','Small, but mighty.','M4 or M4 Pro with Thunderbolt 5 in five inches square.',77900,4),
('accessory','magsafe-charger','MagSafe Charger','Power','Perfectly aligned magnets snap to your iPhone for faster wireless charging up to 25W.',4900,1),
('accessory','airpods-pro-2','AirPods Pro 2','Audio','Up to 2x more Active Noise Cancellation, Adaptive Audio and Conversation Awareness.',32900,2),
('accessory','finewoven-case','FineWoven Case','Cases','A durable microtwill with a soft, suede-like feel and a built-in magnet array.',7900,3),
('accessory','watch-band','Apple Watch Band','Wearables','A smooth, breathable fluoroelastomer band with a pin-and-tuck closure.',6900,4),
('accessory','usbc-cable','USB-C to Lightning','Cables','Fast-charge compatible cable for syncing and powering your devices.',2500,5),
('accessory','magic-keyboard','Magic Keyboard','Input','A refined scissor mechanism with 1mm travel, Touch ID and a rechargeable battery.',16900,6),
('accessory','display-stand','Studio Display Stand','Displays','Tilt-and-height-adjustable aluminium stand machined to match your display.',51900,7),
('accessory','applecare','AppleCare+','Coverage','Unlimited accidental damage repairs, 24/7 priority support and battery service.',25900,8);