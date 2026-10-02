import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { coverField, seoFields, slugField } from "../objects/shared";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "seo", title: "SEO" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    { ...slugField, group: "content" },
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Guides", "Scheduling", "Product", "Engineering", "Company"],
      },
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "date",
      title: "Published on",
      type: "date",
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "readTime",
      title: "Read time, minutes",
      type: "number",
      validation: (rule) => rule.required().min(1).max(60),
      group: "meta",
    }),
    defineField({
      name: "draft",
      title: "Hold as draft",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    ...seoFields,
    coverField,
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
