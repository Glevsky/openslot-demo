import { defineField, defineArrayMember } from "sanity";

export const seoFields = [
  defineField({
    name: "summary",
    title: "Meta description",
    type: "text",
    rows: 2,
    description: "120 to 155 characters. Used as the page description.",
    validation: (rule) => rule.required().max(200),
    group: "seo",
  }),
  defineField({
    name: "excerpt",
    title: "Card sentence",
    type: "text",
    rows: 2,
    description: "Shown on listing cards. Keep it different from the meta description.",
    validation: (rule) => rule.required().max(200),
    group: "seo",
  }),
];

export const slugField = defineField({
  name: "slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

export const coverField = defineField({
  name: "cover",
  title: "Cover image",
  type: "image",
  options: { hotspot: true },
  group: "media",
});

export const statsField = defineField({
  name: "stats",
  title: "Headline numbers",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "stat",
      fields: [
        defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
      ],
      preview: { select: { title: "value", subtitle: "label" } },
    }),
  ],
  validation: (rule) => rule.min(2).max(4),
});

export const quoteField = defineField({
  name: "quote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
  ],
});
