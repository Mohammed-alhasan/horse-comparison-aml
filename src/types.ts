// the types are based on the API response
export type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood: string | null;
    physical: {
      height: number | null;
      weight: number | null;
    };
  };
};

export type HorseCreatePayload = Omit<Horse, "id">;

export type HorseUpdatePayload = Horse;
