import type { StructureResolver } from "sanity/structure";
import { BookIcon } from "@sanity/icons/Book";
import { CaseIcon } from "@sanity/icons/Case";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { UserIcon } from "@sanity/icons/User";

const RESOURCE_HUBS = [
  { title: "Webinars", type: "Webinar" },
  { title: "Guides and ebooks", type: "Ebook" },
  { title: "Reports", type: "Report" },
  { title: "Templates", type: "Template" },
  { title: "Courses", type: "Course" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Openslot")
    .items([
      S.documentTypeListItem("blogPost").title("Blog").icon(DocumentTextIcon),

      S.listItem()
        .title("Resources")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Resources")
            .items([
              S.listItem()
                .title("All resources")
                .icon(BookIcon)
                .child(
                  S.documentTypeList("resource")
                    .title("All resources")
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
              S.divider(),
              ...RESOURCE_HUBS.map((hub) =>
                S.listItem()
                  .title(hub.title)
                  .id(hub.type)
                  .icon(BookIcon)
                  .child(
                    S.documentList()
                      .title(hub.title)
                      .schemaType("resource")
                      .filter('_type == "resource" && type == $type')
                      .params({ type: hub.type })
                      .defaultOrdering([{ field: "date", direction: "desc" }])
                  )
              ),
            ])
        ),

      S.documentTypeListItem("customerStory").title("Customer stories").icon(CaseIcon),

      S.divider(),

      S.documentTypeListItem("author").title("Authors").icon(UserIcon),
      S.documentTypeListItem("legalPage").title("Legal pages").icon(DocumentIcon),
    ]);
