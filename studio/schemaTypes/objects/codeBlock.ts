import { defineType, defineField } from "sanity";
import { CodeBlockIcon } from "@sanity/icons/CodeBlock";

export const codeBlock = defineType({
  name: "code",
  title: "Code",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: {
        list: [
          { title: "Plain text", value: "text" },
          { title: "HTML", value: "html" },
          { title: "JavaScript", value: "javascript" },
          { title: "JSON", value: "json" },
          { title: "Shell", value: "bash" },
        ],
      },
      initialValue: "text",
    }),
    defineField({
      name: "code",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
});
