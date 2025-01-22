import type { AppContext } from "apps/vtex/mod.ts";
import productListingPage, {Props as LoaderProps} from "apps/vtex/loaders/intelligentSearch/productListingPage.ts";
import { Section } from "$live/blocks/section.ts";

export type Props = LoaderProps & {
  url?: string;
  collectionTags?: Section;
};

const loader = (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  return productListingPage(
    props,
    new Request(props.url || req.url, { headers: req.headers }),
    ctx,
  );
};

export default loader;
