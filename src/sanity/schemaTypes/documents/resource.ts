import { defineType, defineField, defineArrayMember } from "sanity";
import { BookIcon } from "@sanity/icons/Book";
import { coverField, seoFields, slugField } from "../objects/shared";

const isWebinar = ({ document }: { document?: Record<string, unknown> }) =>
  document?.type !== "Webinar";

const isCourse = ({ document }: { document?: Record<string, unknown> }) =>
  document?.type !== "Course";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "gate", title: "Download gate" },
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
      name: "type",
      title: "Resource type",
      description: "Decides which hub the resource lives under.",
      type: "string",
      options: {
        list: ["Webinar", "Ebook", "Template", "Report", "Course"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "topics",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          "Sales",
          "Recruiting",
          "Healthcare",
          "Education",
          "Operations",
          "Engineering",
          "Accessibility",
        ],
      },
      validation: (rule) => rule.required().min(1).max(3),
      group: "meta",
    }),
    defineField({
      name: "level",
      type: "string",
      options: { list: ["Intro", "Practical", "Advanced"], layout: "radio" },
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
      name: "meta",
      title: "Size label",
      description: 'Shown on the card, for example "32 pages" or "42 min".',
      type: "string",
      validation: (rule) => rule.required(),
      group: "meta",
    }),
    defineField({
      name: "featured",
      title: "Feature on the hub",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "duration",
      title: "Running time",
      type: "string",
      hidden: (context) => isWebinar(context) && isCourse(context),
      group: "meta",
    }),
    defineField({
      name: "status",
      title: "Webinar status",
      type: "string",
      options: { list: ["On demand", "Upcoming"], layout: "radio" },
      hidden: isWebinar,
      group: "meta",
    }),
    defineField({
      name: "speakers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "speaker",
          fields: [
            defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
      hidden: isWebinar,
      group: "content",
    }),
    defineField({
      name: "lessons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "lesson",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "length", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "title", subtitle: "length" } },
        }),
      ],
      hidden: isCourse,
      group: "content",
    }),
    defineField({
      name: "highlights",
      title: "What you get",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(3),
      group: "content",
    }),
    defineField({
      name: "gated",
      title: "Ask for details first",
      description: "A gated resource shows the form instead of a direct link.",
      type: "boolean",
      initialValue: false,
      group: "gate",
    }),
    defineField({
      name: "cta",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required(),
      group: "gate",
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
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "type", media: "cover" } },
});
