import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Tool } from "./tool.mjs";

export class McpServer {
  constructor(name, command, args) {
    this.name = name;
    this.command = command;
    this.args = args;

    this.client = new Client({
      name: "visual-chatbot",
      version: "1.0.0",
    });

    this.transport = new StdioClientTransport({
      command, args,
    });
  }

  async bootstrap() {
    await this.client.connect(this.transport);

    const { tools: availableTools } = await this.client.listTools();

    const self = this;

    this.tools = availableTools.map(availableTool => new Tool(
      `${this.name}__${availableTool.name}`,
      availableTool.description,
      availableTool.inputSchema,
      "mcp",
      async (args) => {
        console.log("Executing tool", availableTool.name, args);
        try {
          const response = await self.client.callTool({ name: availableTool.name, arguments: args });
          console.log("Got response", response);
          return response.content[0].text;
        } catch (e) {
          console.error("Error executing tool", e);
          return "Error executing tool";
        }
      }
    ));
  }

  getTools() {
    return this.tools;
  }

  async shutdown() {
    await this.client.close();
  }

  toJSON() {
    return {
      name: this.name,
      command: this.command,
      args: this.args,
      tools: this.tools.map(tool => ({ name: tool.name, description: tool.description })),
    };
  }
}