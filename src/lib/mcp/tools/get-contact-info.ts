import { defineTool } from "@lovable.dev/mcp-js";
import { profile } from "../data";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Get the public ways to reach Rakesh Gajre: email, hire/enquiry page URL and social profiles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      email: profile.email,
      hireUrl: profile.hireUrl,
      website: profile.website,
      socials: profile.socials,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: { contact },
    };
  },
});
