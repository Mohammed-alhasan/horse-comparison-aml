import axios from "axios";
import type { Horse } from "@/types";

const API_URL = "http://localhost:3016"; //TODO: Move to .env

export const horseApi = {
  getAllHorses: async (): Promise<Horse[]> => {
    const response = await axios.get(`${API_URL}/horse`);
    return response.data;
  },
};
