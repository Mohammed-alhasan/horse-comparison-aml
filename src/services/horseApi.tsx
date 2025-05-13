import axios from "axios";
import type { Horse, HorseCreatePayload, HorseUpdatePayload } from "@/types";

const API_URL = "http://localhost:3016"; //TODO: Move to .env

export const horseApi = {
  getAllHorses: async (): Promise<Horse[]> => {
    const response = await axios.get(`${API_URL}/horse`);
    return response.data;
  },

  // Im not using this as i did not need to fetch a single horse since im passing the horse data to the modal
  getHorse: async (id: string): Promise<Horse> => {
    const response = await axios.get(`${API_URL}/horse/${id}`);
    return response.data;
  },

  createHorse: async (horseData: HorseCreatePayload): Promise<Horse> => {
    const response = await axios.put(`${API_URL}/horse`, horseData);
    return response.data;
  },

  updateHorse: async (horseData: HorseUpdatePayload): Promise<Horse> => {
    const response = await axios.put(
      `${API_URL}/horse/${horseData.id}`,
      horseData
    );
    return response.data;
  },
};
