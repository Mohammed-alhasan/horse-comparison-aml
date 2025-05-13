import { useQuery } from "@tanstack/react-query";
import { horseApi } from "@/services/horseApi";

// Im using Tanstack Query to fetch the data because it's a simple and easy to use library for fetching data
// it also handles the caching and refetching of the data

// Hook for fetching all horses
export function useHorses() {
  return useQuery({
    queryKey: ["horse"],
    queryFn: horseApi.getAllHorses,
  });
}
