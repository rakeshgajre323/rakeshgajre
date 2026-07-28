import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import listCertificationsTool from "./tools/list-certifications";
import getContactInfoTool from "./tools/get-contact-info";

export default defineMcp({
  name: "rakesh-gajre-portfolio",
  title: "Rakesh Gajre Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools for Rakesh Gajre's portfolio site. Use `get_profile` for who he is, `list_projects` for portfolio work, `list_certifications` for verified credentials, and `get_contact_info` for how to reach him. All data is public; no private or analytics data is exposed.",
  tools: [getProfileTool, listProjectsTool, listCertificationsTool, getContactInfoTool],
});
