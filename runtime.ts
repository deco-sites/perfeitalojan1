import { forApp } from "deco/clients/withManifest.ts";
import type { Storefront } from "./apps/site.ts"

export const Runtime = forApp<Storefront>();
