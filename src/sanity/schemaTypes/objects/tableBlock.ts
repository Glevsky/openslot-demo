import { defineType, defineField, defineArrayMember } from "sanity";
import { ThLargeIcon } from "@sanity/icons/ThLarge";

export const tableCell = defineType({
  name: "cell",
  title: "Cell",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});

export const tableRow = defineType({
  name: "row",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      type: "array",
      of: [defineArrayMember({ type: "cell" })],
    }),
  ],
});

export const tableBlock = defineType({
  name: "table",
  title: "Table",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "headerRows",
      title: "Header rows",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "rows",
      type: "array",
      of: [defineArrayMember({ type: "row" })],
    }),
  ],
});
