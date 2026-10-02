import type { SchemaTypeDefinition } from "sanity";

import { richText } from "./objects/richText";
import { codeBlock } from "./objects/codeBlock";
import { tableBlock, tableRow, tableCell } from "./objects/tableBlock";
import { author } from "./documents/author";
import { blogPost } from "./documents/blogPost";
import { customerStory } from "./documents/customerStory";
import { resource } from "./documents/resource";
import { legalPage } from "./documents/legalPage";
import { faqItem } from "./documents/faqItem";
import { pricingPage } from "./documents/pricingPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  author,
  blogPost,
  resource,
  customerStory,
  legalPage,
  pricingPage,
  faqItem,
  richText,
  tableBlock,
  tableRow,
  tableCell,
  codeBlock,
];
