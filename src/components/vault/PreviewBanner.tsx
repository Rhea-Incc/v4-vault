import { Eye } from "lucide-react";
import { setPreviewMode, useIsStaff, usePreviewMode } from "@/lib/store";

/**
 * Staff-only ribbon shown while the storefront is rendering staged drafts
 * instead of the published catalog.
 */
export function PreviewBanner() {
  const staff = useIsStaff();
  const preview = usePreviewMode();
  if (!preview || staff.data !== true) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] flex flex-wrap items-center justify-center gap-3 border-t border-hairline bg-foreground px-4 py-3 text-background">
      <Eye className="h-4 w-4" strokeWidth={1.8} aria-hidden />
      <p className="text-sm">
        Draft preview — you are seeing staged changes, not the live store.
      </p>
      <button
        onClick={() => setPreviewMode(false)}
        className="btn-pill h-9 border border-background/30 px-4 text-sm hover:bg-background/10"
      >
        Exit preview
      </button>
    </div>
  );
}
