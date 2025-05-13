import type { Horse } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HorseFormValues } from "@/schemas/horseSchema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialFormValues(horse: Horse | null): HorseFormValues {
  return {
    name: horse?.name || "",
    height: horse?.profile.physical.height?.toString() || "",
    weight: horse?.profile.physical.weight?.toString() || "",
    favoriteFood: horse?.profile.favouriteFood || "",
  };
}

export function getDialogMetadata(
  isCreating: boolean,
  activeMode: "view" | "create" | "edit",
  horse: Horse | null
) {
  const title = isCreating ? "Add New Horse" : horse?.name || "Horse Details";
  const description = isCreating
    ? "Enter details for the new horse"
    : activeMode === "edit"
    ? "Edit horse details"
    : null;

  return { title, description };
}
