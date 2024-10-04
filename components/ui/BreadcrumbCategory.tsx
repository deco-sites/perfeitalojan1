import Breadcrumb from "../ui/Breadcrumb.tsx";
import { type LoaderReturnType } from "@deco/deco";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function BreadcrumbCategory({ page }: Props) {
  if (!page?.breadcrumb) {
    return <div />;
  }

  return <Breadcrumb itemListElement={page.breadcrumb.itemListElement} />;
}

export default BreadcrumbCategory;
