import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Horse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ViewHorse } from "@/components/horseDetails/ViewHorse";
import { HorseForm } from "@/components/horseDetails/HorseForm";

import { horseFormSchema, type HorseFormValues } from "@/schemas/horseSchema";
import { toast } from "sonner";
import { getDialogMetadata, getInitialFormValues } from "@/lib/utils";
import { formatHorseData, useHorseCreation, useHorseUpdate } from "@/hooks/useHorseOperations";

interface HorseDetailsProps {
  horse: Horse | null;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
}

export function HorseDetailsModal({
  horse,
  isOpen,
  onClose,
  mode,
}: HorseDetailsProps) {
  const [activeMode, setActiveMode] = useState(mode);
  const isEditing = activeMode === "edit" || activeMode === "create";
  const isCreating = activeMode === "create";
  
  const { createHorse } = useHorseCreation();
  const { updateHorse } = useHorseUpdate();


  const form = useForm<HorseFormValues>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: getInitialFormValues(horse),
  });


  useEffect(() => {
    if (isOpen) {
      form.reset(getInitialFormValues(horse));
      setActiveMode(mode);
    }
  }, [horse, isOpen, form, mode]);

  // Handle mode switching
  const handleEdit = () => setActiveMode("edit");
  const handleCancel = () => {
    if (isCreating) {
      onClose();
    } else {
      setActiveMode("view");
    }
  };

  // Form submission handler
  const handleSubmit = (values: HorseFormValues) => {
    const horseData = formatHorseData(values);

    if (isCreating) {
      createHorse(horseData, {
        onSuccess: () => {
          toast("Horse created successfully!");
          onClose();
        },
        onError: () => {
          toast("Failed to create horse. Please try again.");
        },
      });
    } else {
      updateHorse(
        horse,
        { ...horseData, id: horse?.id || "" },
        {
          onSuccess: () => {
            toast("Horse updated successfully!");
            onClose();
          },
          onError: () => {
            toast("Failed to update horse. Please try again.");
          },
        }
      );
    }
  };

  // Get dialog title and description based on current mode
  const { title, description } = getDialogMetadata(isCreating, activeMode, horse);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {isEditing ? (
          <HorseForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isCreating={isCreating}
          />
        ) : (
          <ViewHorse horse={horse} onEdit={handleEdit} />
        )}
      </DialogContent>
    </Dialog>
  );
}

