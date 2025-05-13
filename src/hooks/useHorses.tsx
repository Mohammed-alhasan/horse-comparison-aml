
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { horseApi } from "../services/horseApi";
import type { HorseCreatePayload, HorseUpdatePayload } from "@/types";

// Im using Tanstack Query to fetch the data because it's a simple and easy to use library for fetching data
// it also handles the caching and refetching of the data

// Hook for fetching all horses
export function useHorses() {
  return useQuery({
    queryKey: ["horse"],
    queryFn: horseApi.getAllHorses,
  });
}

// Hook for creating a horse
export function useCreateHorse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newHorse: HorseCreatePayload) => {
      return horseApi.createHorse(newHorse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horse"] });
    },
  });
}

// Hook for updating a horse
export function useUpdateHorse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updateData: HorseUpdatePayload) => {
      return horseApi.updateHorse(updateData);
    },
    onSuccess: (updatedHorse) => {
      queryClient.invalidateQueries({ queryKey: ["horse"] });
      queryClient.invalidateQueries({ queryKey: ["horse", updatedHorse.id] });
    },
  });
} 