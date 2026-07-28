import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List the public portfolio projects, optionally filtered by year.",
  inputSchema: {
    year: z.string().optional().describe("Optional four-digit year filter, e.g. \"2025\"."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ year }) => {
    const items = year ? projects.filter((p) => p.year === year) : [...projects];
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items },
    };
  },
});
