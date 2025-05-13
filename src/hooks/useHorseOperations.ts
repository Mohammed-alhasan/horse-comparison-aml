import type { Horse } from "@/types";
import { useCreateHorse, useUpdateHorse } from "@/hooks/useHorses";
import type { HorseFormValues } from "@/schemas/horseSchema";

export const formatHorseData = (values: HorseFormValues): Omit<Horse, "id"> => {
  return {
    name: values.name,
    profile: {
      favouriteFood: values.favoriteFood || null,
      physical: {
        height: values.height !== "" ? Number(values.height) : null,
        weight: values.weight !== "" ? Number(values.weight) : null,
      },
    },
  };
};

export const useHorseCreation = () => {
  const createHorseMutation = useCreateHorse();

  const createHorse = (
    data: Omit<Horse, "id">,
    callbacks: {
      onSuccess?: () => void;
      onError?: () => void;
    }
  ) => {
    createHorseMutation.mutate(data, {
      onSuccess: () => {
        callbacks.onSuccess?.();
      },
      onError: () => {
        callbacks.onError?.();
      },
    });
  };

  return { createHorse };
};

export const useHorseUpdate = () => {
  const updateHorseMutation = useUpdateHorse();

  const updateHorse = (
    horse: Horse | null,
    data: Horse,
    callbacks: {
      onSuccess?: () => void;
      onError?: () => void;
    }
  ) => {
    if (!horse?.id) {
      alert("Cannot update horse: Missing ID");
      return;
    }

    updateHorseMutation.mutate(
      { ...data, id: horse.id },
      {
        onSuccess: () => {
          callbacks.onSuccess?.();
        },
        onError: () => {
          callbacks.onError?.();
        },
      }
    );
  };

  return { updateHorse };
};
