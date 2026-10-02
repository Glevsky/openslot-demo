import { defineType, defineField, defineArrayMember } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";
import { quoteField, seoFields, slugField, statsField } from "../objects/shared";

export const customerStory = defineType({
  name: "customerStory",
  title: "Customer story",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Customer name",
      type: "string",
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "title",
      title: "Story headline",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    { ...slugField, options: { source: "name", maxLength: 96 }, group: "content" },
    defineField({
      name: "industry",
      type: "string",
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "plan",
      type: "string",
      options: { list: ["Free", "Pro", "Team", "Enterprise"] },
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "products",
      title: "What they use",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
      group: "meta",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    { ...statsField, group: "content" },
    { ...quoteField, group: "content" },
    ...seoFields,
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
    }),
  ],
  orderings: [
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "industry" } },
});
