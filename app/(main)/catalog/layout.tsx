import type { ReactNode } from "react";
import css from "./catalog.module.css"

type CatalogLayoutProps = {
  children: ReactNode;
  filters: ReactNode;
};

export default function CatalogLayout({ children, filters }: CatalogLayoutProps) {
  return (
    <section className={css.catalog}>
      <div>
        {filters}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
}
