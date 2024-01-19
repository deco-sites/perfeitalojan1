import { Product, PropertyValue } from "apps/commerce/types.ts";
import type { Product as ProductTypes } from "apps/commerce/types.ts";

const cmp = <T extends { property: PropertyValue }>(a: T, b: T) =>
  a.property.value! > b.property.value!
    ? 1
    : a.property.value! < b.property.value!
    ? -1
    : 0;

export const useVariantPossibilities = (
  { url: productUrl, isVariantOf }: ProductTypes,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ additionalProperty = [], url, offers }) =>
      additionalProperty.map((property) => ({ property, url, offers }))
    )
    .filter((x) => x.url)
    .filter((x) => x.property.valueReference === "SPECIFICATION") // Remove this line to allow other than specifications
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce(
    (acc, { property, url, offers }) => {
      const { name = "", value = "" } = property;
      const inStock = offers
        ? offers.offers.reduce((acc, { availability }) => {
          if (availability === "https://schema.org/InStock" || acc) {
            return true;
          }
          return acc;
        }, false)
        : false;

      if (!acc[name]) {
        acc[name] = {};
      }

      if (!acc[name][value]) {
        acc[name][value] = { urls: [], inStock };
      }

      if (url) {
        // prefer current url first to easy selector implementation
        url === productUrl
          ? acc[name][value].urls.unshift(url)
          : acc[name][value].urls.push(url);
      }

      return acc;
    },
    {} as Record<string, Record<string, { urls: string[]; inStock: boolean }>>,
  );

  return possibilities;
};

const groupByPropertyNames = <T extends { additionalProperty?: PropertyValue[] }>(items: T[]) => {
  const properties = new Map<string,{ property: PropertyValue; item: T }[]>();

  for (const item of items) {
    const additionalProperty = item.additionalProperty ?? [];
    for (const property of additionalProperty) {
      if (!property.name || !property.value) continue;

      if (!properties.has(property.name)) {
        properties.set(property.name, []);
      }

      properties.get(property.name)?.push({ property, item });
    }
  }

  for (const key of properties.keys()) {
    properties.get(key)!.sort(cmp);
  }

  return properties;
};

export const useVariations = (product: Product) => {
  const productVariations = groupByPropertyNames(
    product.isVariantOf?.hasVariant ?? [],
  );

  return {
    productVariations,
  };
};
