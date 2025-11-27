"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BrandsResponse } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";

type FiltersSidebarProps = {
  brandsOptions: BrandsResponse;
};

const priceOptions = ["30", "40", "50", "60", "70", "80"];
const allBrands = 'all'

export default function FiltersSidebar({ brandsOptions }: FiltersSidebarProps) {
  const filters = useCatalogStore(state => state.filters);
  const setFilters = useCatalogStore(state => state.setFilters);

  const [brand, setBrand] = React.useState<string>(
    filters.brand ?? allBrands
  );
  const [price, setPrice] = React.useState<string | undefined>(
    filters.rentalPrice !== undefined ? String(filters.rentalPrice) : undefined
  );
  const [minMileage, setMinMileage] = React.useState<string>(
    filters.minMileage !== undefined ? String(filters.minMileage) : ""
  );
  const [maxMileage, setMaxMileage] = React.useState<string>(
    filters.maxMileage !== undefined ? String(filters.maxMileage) : ""
  );

  const handleSearch = () => {
    const rentalPriceNum = price ? Number(price) : undefined;
    const minMileageNum = minMileage ? Number(minMileage) : undefined;
    const maxMileageNum = maxMileage ? Number(maxMileage) : undefined;

    setFilters({
      brand: brand === allBrands ? undefined : brand,
      rentalPrice: Number.isNaN(rentalPriceNum) ? undefined : rentalPriceNum,
      minMileage: Number.isNaN(minMileageNum) ? undefined : minMileageNum,
      maxMileage: Number.isNaN(maxMileageNum) ? undefined : maxMileageNum,
    });
  };

  return (
    <aside className="flex flex-row gap-4 items-end">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Car brand
        </label>
        <Select
          value={brand}
          onValueChange={value => setBrand(value)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose a brand" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value={allBrands}>All brands</SelectItem>
            <SelectGroup>
              {brandsOptions.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Price / 1 hour */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Price / 1 hour
        </label>
        <Select
          value={price}
          onValueChange={value => setPrice(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="To $40" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {priceOptions.map(price => (
                <SelectItem key={price} value={price}>
                  {price}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Car mileage / km */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Car mileage / km
        </label>
        <div className="flex gap-2">
          <Input
            className="w-[150px]"
            placeholder="From 3,000"
            inputMode="numeric"
            value={minMileage}
            onChange={e => setMinMileage(e.target.value)}
          />
          <Input
            className="w-[150px]"
            placeholder="To 5,500"
            inputMode="numeric"
            value={maxMileage}
            onChange={e => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      {/* Search button */}
      <Button
        type="button"
        className="h-[52px] px-8"
        onClick={handleSearch}
      >
        Search
      </Button>
    </aside>
  );
}
