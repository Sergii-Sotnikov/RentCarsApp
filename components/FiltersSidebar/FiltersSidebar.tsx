"use client";

import css from "./FiltersSidebar.module.css";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { BrandsResponse } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";

type FiltersSidebarProps = {
  brandsOptions: BrandsResponse;
};

const priceOptions = ["30", "40", "50", "60", "70", "80"];


export default function FiltersSidebar({ brandsOptions }: FiltersSidebarProps) {
  const filters = useCatalogStore((state) => state.filters);
  const setFilters = useCatalogStore((state) => state.setFilters);

  // если в сторе бренда ещё нет — держим пустую строку
  const [brand, setBrand] = React.useState<string>(filters.brand ?? "");
  const [price, setPrice] = React.useState<string | undefined>(
    filters.rentalPrice !== undefined ? String(filters.rentalPrice) : undefined
  );
  const [minMileage, setMinMileage] = React.useState<string>(
    filters.minMileage !== undefined ? String(filters.minMileage) : ""
  );
  const [maxMileage, setMaxMileage] = React.useState<string>(
    filters.maxMileage !== undefined ? String(filters.maxMileage) : ""
  );

  const formatNumber = (value: string) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleSearch = () => {
    const rentalPriceNum = price ? Number(price) : undefined;
    const minMileageNum = minMileage ? Number(minMileage) : undefined;
    const maxMileageNum = maxMileage ? Number(maxMileage) : undefined;

    setFilters({
      // если бренд не выбран (""), кладём undefined
      brand: brand || undefined,
      rentalPrice: Number.isNaN(rentalPriceNum) ? undefined : rentalPriceNum,
      minMileage: Number.isNaN(minMileageNum) ? undefined : minMileageNum,
      maxMileage: Number.isNaN(maxMileageNum) ? undefined : maxMileageNum,
    });
  };

  return (
    <aside className={css.filter}>
 
      <div className={css.select}>
        <label className={css.label}>Car brand</label>
        <Select
          defaultValue={undefined}
          onValueChange={(value) => setBrand(value)}
        >
          <SelectTrigger className={css.selectTrigger}>
            <SelectValue
              className={css.placeholder}
              placeholder="Choose a brand"
            />
          </SelectTrigger>
          <SelectContent className={css.selectContent}>
            <SelectGroup>
              {brandsOptions.map((brandOption) => (
                <SelectItem
                  key={brandOption}
                  value={brandOption}
                  className={css.item}
                >
                  {brandOption}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

  
      <div className={css.select}>
        <label className={css.label}>Price / 1 hour</label>

        <Select value={price} onValueChange={(value) => setPrice(value)}>
          <SelectTrigger
            className={`${css.selectTrigger} ${css.selectTriggerPrice}`}
          >
            <span className={css.placeholder}>
              {price ? `To $${price}` : "Choose a price"}
            </span>
          </SelectTrigger>
          <SelectContent className={css.selectContentPrice}>
            <SelectGroup>
              {priceOptions.map((priceOption) => (
                <SelectItem
                  key={priceOption}
                  value={priceOption}
                  className={css.item}
                >
                  {priceOption}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

   
<div className={css.twoInput}>
  <label className={css.label}>Car mileage / km</label>

  <div className={css.mileageGroup}>
    <input
      type="text"
      placeholder="From"
      className={css.mileageInputLeft}
      value={minMileage ? `From ${formatNumber(minMileage)}` : ""}
      onChange={(e) => setMinMileage(e.target.value.replace(/\D/g, ""))}
    />

    <input
      type="text"
      placeholder="To"
      className={css.mileageInputRight}
      value={maxMileage ? `To ${formatNumber(maxMileage)}` : ""}
      onChange={(e) => setMaxMileage(e.target.value.replace(/\D/g, ""))}
    />
  </div>
</div>

      <Button type="button" className={css.button} onClick={handleSearch}>
        Search
      </Button>
    </aside>
  );
}
