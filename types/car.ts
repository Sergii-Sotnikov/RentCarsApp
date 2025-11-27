export type Accessories = string[];
export type Functionalities = string[];
export type RentalConditions = string[];

export type Brand = string

export type BrandsResponse = Brand[];


export type Car = {
  id: string;
  year: number;
  brand?: Brand;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: Accessories;
  functionalities: Functionalities;
  rentalPrice?: string;
  rentalCompany: string;
  address: string;
  rentalConditions: RentalConditions;
  mileage?: number;
};

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export type CatalogFilters = {
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
};



