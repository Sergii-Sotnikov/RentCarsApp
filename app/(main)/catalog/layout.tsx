import type { ReactNode } from "react";

type CatalogLayoutProps = {
  children: ReactNode;
  filters: ReactNode;
};

export default function CatalogLayout({ children, filters }: CatalogLayoutProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="shrink-0">
        {filters}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
}
