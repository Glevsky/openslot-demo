import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";
import { slugField } from "../objects/shared";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Meta description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "richText" }),
  ],
  preview: { select: { title: "title" } },
});
