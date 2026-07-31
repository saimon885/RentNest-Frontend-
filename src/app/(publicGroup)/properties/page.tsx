import React from "react";
import PropertiesCard, {
  Property,
} from "../_components/properties/PropertiesCard";
import { TopFilterBar } from "../_components/properties/TopPropertyFilters";
import { SidebarFilters } from "../_components/properties/LeftSideFilterProperty";
import { GetCategory } from "@/app/(dashboardGroup)/dashboard/_actions/Landlord/CateGory";
import { PropertyPagination } from "../_components/properties/Pagination";

type PropertiesProps = {
  searchParams?: Promise<{
    searchTerm?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
    name?: string;
    categoryId?: string;
    page?: string;
  }>;
};

const Properties = async ({ searchParams }: PropertiesProps) => {
  const allCategory = await GetCategory();
  const categorys = allCategory?.data;
  const query = await searchParams;
  const params = new URLSearchParams();

  // Search Term
  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm);
  }
  // Sort Options
  if (query?.sortBy) {
    params.set("sortBy", query.sortBy);
  }
  if (query?.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }
  // Location & Price Filters
  if (query?.location) {
    params.set("location", query.location);
  }
  if (query?.minPrice) {
    params.set("minPrice", query.minPrice);
  }
  if (query?.maxPrice) {
    params.set("maxPrice", query.maxPrice);
  }
  // Category Filters
  if (query?.name) {
    params.set("name", query.name);
  }
  if (query?.categoryId) {
    params.set("categoryId", query.categoryId);
  }

  // Page
  if (query?.page) {
    params.set("page", query.page);
  }

  const queryString = params.toString();

  const data = await fetch(
    `${process.env.SERVER_API_URL}/api/properties${
      queryString ? `?${queryString}` : ""
    }`,
    {
      next: { revalidate: 300, tags: ["properties"] },
    },
  );

  const allProperties = await data.json();
  const properties: Property[] = allProperties?.data || [];
  const meta = allProperties?.meta;

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Explore Rental Properties
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Find your dream home or commercial space from verified listings
        </p>
      </div>

      <TopFilterBar categorys={categorys} />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm top-24">
          <SidebarFilters />
        </aside>

        <div className="flex-1 w-full">
          {properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertiesCard key={property.id} property={property} />
                ))}
              </div>

              {meta && <PropertyPagination meta={meta} />}
            </>
          ) : (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                No properties found matching your filter options!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
