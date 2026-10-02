import { defineType, defineField, defineArrayMember } from "sanity";
import { CreditCardIcon } from "@sanity/icons/CreditCard";

const linkFields = [
  defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
  defineField({
    name: "href",
    title: "Link",
    type: "string",
    description: "A path on this site, for example /signup.",
    validation: (rule) => rule.required(),
  }),
];

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing page",
  type: "document",
  icon: CreditCardIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "plans", title: "Plans" },
    { name: "faq", title: "Questions" },
    { name: "closing", title: "Closing block" },
    { name: "seo", title: "Search" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label above the heading",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heading",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "text", title: "Intro", type: "text", rows: 3, group: "hero" }),

    defineField({
      name: "saving",
      title: "Yearly saving badge",
      type: "string",
      description: "Shown next to the yearly switch, for example Save 20 percent.",
      group: "plans",
    }),
    defineField({
      name: "plans",
      type: "array",
      group: "plans",
      validation: (rule) => rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "plan",
          fields: [
            defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "featured",
              title: "Most popular",
              type: "boolean",
              description: "Adds the badge and the dark button. Switch it on for one plan only.",
              initialValue: false,
            }),
            defineField({
              name: "yearly",
              title: "Price, billed yearly",
              type: "string",
              description: "As shown on the page, for example $25 or Custom.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "monthly",
              title: "Price, billed monthly",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "unit",
              title: "Line under the price",
              type: "string",
              description: "For example per user, per month.",
            }),
            defineField({ name: "text", title: "Description", type: "text", rows: 2 }),
            defineField({
              name: "cta",
              title: "Button",
              type: "object",
              fields: linkFields,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "features",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "yearly", featured: "featured" },
            prepare: ({ title, subtitle, featured }) => ({
              title,
              subtitle: featured ? `${subtitle} · Most popular` : subtitle,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "note",
      title: "Small print under the plans",
      type: "text",
      rows: 2,
      group: "plans",
    }),

    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "faq" }),
    defineField({
      name: "faq",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    defineField({
      name: "closing",
      title: "Closing block",
      type: "object",
      group: "closing",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "primary", title: "Main button", type: "object", fields: linkFields }),
        defineField({ name: "secondary", title: "Second button", type: "object", fields: linkFields }),
        defineField({ name: "note", title: "Line under the buttons", type: "string" }),
      ],
    }),

    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown in the browser tab and in search results.",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Meta description",
      type: "text",
      rows: 2,
      description: "120 to 155 characters.",
      group: "seo",
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: { prepare: () => ({ title: "Pricing page" }) },
});
