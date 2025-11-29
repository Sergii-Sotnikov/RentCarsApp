"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import css from "./FiltersSidebar.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { BrandsResponse } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";

type FiltersSidebarProps = {
  brandsOptions: BrandsResponse;
};

const priceOptions = ["30", "40", "50", "60", "70", "80"];

export default function FiltersSidebar({ brandsOptions }: FiltersSidebarProps) {
  const filters = useCatalogStore((state) => state.filters);
  const setFilters = useCatalogStore((state) => state.setFilters);
  const resetCars = useCatalogStore((state) => state.resetCars);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // 👀 глобальный индикатор запросов по ключу "cars"
  const carsFetchingCount = useIsFetching({ queryKey: ["cars"] });
  const isRefreshing = carsFetchingCount > 0;

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

  React.useEffect(() => {
    setBrand(filters.brand ?? "");
    setPrice(
      filters.rentalPrice !== undefined
        ? String(filters.rentalPrice)
        : undefined
    );
    setMinMileage(
      filters.minMileage !== undefined ? String(filters.minMileage) : ""
    );
    setMaxMileage(
      filters.maxMileage !== undefined ? String(filters.maxMileage) : ""
    );
  }, [
    filters.brand,
    filters.rentalPrice,
    filters.minMileage,
    filters.maxMileage,
  ]);

  const formatNumber = (value: string) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // нормализованные значения из инпутов
  const normalizedBrand = brand || undefined;
  const rentalPriceNum = price ? Number(price) : undefined;
  const minMileageNum = minMileage ? Number(minMileage) : undefined;
  const maxMileageNum = maxMileage ? Number(maxMileage) : undefined;

  const isSameFilters =
    filters.brand === normalizedBrand &&
    filters.rentalPrice === rentalPriceNum &&
    filters.minMileage === minMileageNum &&
    filters.maxMileage === maxMileageNum;

  const handleSearch = () => {
    if (isSameFilters) {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      return;
    }


    const newFilters = {
      brand: normalizedBrand,
      rentalPrice: Number.isNaN(rentalPriceNum) ? undefined : rentalPriceNum,
      minMileage: Number.isNaN(minMileageNum) ? undefined : minMileageNum,
      maxMileage: Number.isNaN(maxMileageNum) ? undefined : maxMileageNum,
    };

    resetCars();
    setFilters(newFilters);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.brand) params.set("brand", newFilters.brand);
      else params.delete("brand");

      if (newFilters.rentalPrice !== undefined)
        params.set("rentalPrice", String(newFilters.rentalPrice));
      else params.delete("rentalPrice");

      if (newFilters.minMileage !== undefined)
        params.set("minMileage", String(newFilters.minMileage));
      else params.delete("minMileage");

      if (newFilters.maxMileage !== undefined)
        params.set("maxMileage", String(newFilters.maxMileage));
      else params.delete("maxMileage");

      params.delete("page");

      const query = params.toString();
      const newUrl = query ? `${pathname}?${query}` : pathname;

      window.history.pushState(null, "", newUrl);
    }
  };

  return (
    <aside className={css.filter}>

      <div className={css.select}>
        <label className={css.label}>Car brand</label>
        <Select
          value={brand || undefined}
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
            onChange={(e) =>
              setMaxMileage(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
      </div>

      <Button
        type="button"
        className={css.button}
        onClick={handleSearch}
        disabled={isRefreshing}
      >
        {isRefreshing ? "Updating…" : "Search"}
      </Button>
    </aside>
  );
}
