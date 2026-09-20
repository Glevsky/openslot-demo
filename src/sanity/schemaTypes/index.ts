import type { SchemaTypeDefinition } from "sanity";

import { richText } from "./objects/richText";
import { codeBlock } from "./objects/codeBlock";
import { tableBlock, tableRow, tableCell } from "./objects/tableBlock";
import { author } from "./documents/author";
import { blogPost } from "./documents/blogPost";
import { customerStory } from "./documents/customerStory";
import { resource } from "./documents/resource";
import { legalPage } from "./documents/legalPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  author,
  blogPost,
  resource,
  customerStory,
  legalPage,
  richText,
  tableBlock,
  tableRow,
  tableCell,
  codeBlock,
];
