import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "bio",
      title: "Bio",
      description: "Only people who write on the blog need one.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "avatar",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 50,
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
  orderings: [
    { title: "Team order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
});
