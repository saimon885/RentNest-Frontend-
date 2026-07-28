import React from "react";
import PropertiesCard, {
  Property,
} from "../_components/properties/PropertiesCard";

const Properties = async () => {
  const data = await fetch(`${process.env.SERVER_API_URL}/api/properties`);
  const allProperties = await data.json();
  const properties: Property[] = allProperties?.data;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Properties
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Explore our latest verified rental listings
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertiesCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">
            No properties found at the moment!
          </p>
        </div>
      )}
    </section>
  );
};

export default Properties;
