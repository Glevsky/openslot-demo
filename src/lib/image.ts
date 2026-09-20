import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: unknown) => builder.image(source as never);

export const coverUrl = (source: unknown, width = 800) =>
  source ? urlFor(source).width(width).auto("format").url() : undefined;
