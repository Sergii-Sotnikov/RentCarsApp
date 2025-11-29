import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CatalogFilters, Car } from "../../types/car";

type CatalogState = {
  filters: CatalogFilters;
  cars: Car[];
  favoritesCars: string[];

  setFilters: (filters: Partial<CatalogFilters>) => void;
  resetFilters: () => void;

  setCars: (cars: Car[]) => void;
  resetCars: () => void;

  toggleFavorite: (id: string) => void;
};

const initialFilters: CatalogFilters = {
  brand: undefined,
  rentalPrice: undefined,
  minMileage: undefined,
  maxMileage: undefined,
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      filters: initialFilters,
      cars: [],
      favoritesCars: [],

      // фільтри 
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      // скидання усіх фільтрів
      resetFilters: () =>
        set(() => ({
          filters: initialFilters,
          cars: [],
        })),

      // список авто
      setCars: (cars) => set({ cars }),
      resetCars: () => set({ cars: [] }),

      // улюблені
      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favoritesCars.includes(id);
          return {
            favoritesCars: exists
              ? state.favoritesCars.filter((x) => x !== id)
              : [...state.favoritesCars, id],
          };
        }),
    }),
    {
      name: "catalog-store",
      partialize: (state) => ({
        favoritesCars: state.favoritesCars,
      }),
    }
  )
);
