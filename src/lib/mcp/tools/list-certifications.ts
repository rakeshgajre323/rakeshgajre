import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { certificationCategories, certifications } from "../data";

export default defineTool({
  name: "list_certifications",
  title: "List certifications",
  description:
    "List Rakesh Gajre's public certifications with issuer, date, category and verification link. Optionally filter by category.",
  inputSchema: {
    category: z
      .enum(certificationCategories)
      .optional()
      .describe("Optional category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? certifications.filter((c) => c.category === category) : [...certifications];
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { certifications: items },
    };
  },
});
