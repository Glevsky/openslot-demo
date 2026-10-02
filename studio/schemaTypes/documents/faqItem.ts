import { defineType, defineField, defineArrayMember } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

export const FAQ_PAGES = [
  { title: "Pricing", value: "pricing", href: "/pricing" },
  { title: "Product", value: "product", href: "/product" },
  { title: "Contact", value: "contact", href: "/contact" },
];

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pages",
      title: "Show on pages",
      type: "array",
      description: "Tick every page this question appears on. One edit here changes all of them.",
      of: [defineArrayMember({ type: "string" })],
      options: { list: FAQ_PAGES.map(({ title, value }) => ({ title, value })) },
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first. The same order applies on every page.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", pages: "pages" },
    prepare: ({ title, pages }) => ({
      title,
      subtitle: pages?.length
        ? FAQ_PAGES.filter((page) => pages.includes(page.value))
            .map((page) => page.title)
            .join(", ")
        : "Not shown anywhere",
    }),
  },
});
