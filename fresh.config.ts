/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import { plugins } from "deco/plugins/deco.ts";

import decoManifest from "./manifest.gen.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  build: { target: ["chrome99", "firefox99", "safari12"] },
  plugins: [
    ...plugins(
      {
        manifest: decoManifest,
      },
    ),
  ],
});
