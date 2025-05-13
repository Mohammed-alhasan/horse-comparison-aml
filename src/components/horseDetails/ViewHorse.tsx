import type { Horse } from "@/types";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

interface ViewHorseProps {
  horse: Horse | null;
  onEdit: () => void;
}

export function ViewHorse({ horse, onEdit }: ViewHorseProps) {
  if (!horse) {
    return <div className="text-center py-4">No horse data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <section className="space-y-1">
          <h3 className="text-sm font-medium">Physical Attributes</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Height</p>
              <p>{horse.profile.physical.height ?? "Not specified"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p>{horse.profile.physical.weight ?? "Not specified"}</p>
            </div>
          </div>
        </section>

        <section className="space-y-1">
          <h3 className="text-sm font-medium">Preferences</h3>
          <div>
            <p className="text-xs text-muted-foreground">Favorite Food</p>
            <p>{horse.profile.favouriteFood || "Not specified"}</p>
          </div>
        </section>
      </div>

      <DialogFooter>
        <Button type="button" onClick={onEdit}>
          Edit Details
        </Button>
      </DialogFooter>
    </div>
  );
}
