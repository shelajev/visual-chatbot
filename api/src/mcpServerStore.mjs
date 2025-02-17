import EventEmitter from 'node:events';
import { ToolStore } from './toolStore.mjs';

export class McpServerStore {

  /**
   * Create a new store for MCP Servers
   * @param {ToolStore} toolStore A tool store
   */
  constructor(toolStore) {
    this.toolStore = toolStore;
    this.mcpServers = [];
    this.eventEmitter = new EventEmitter();
  }

  /**
   * Add a new MCP Server
   * @param {McpServer} mcpServer The MCP Server to add
   */
  addMcpServer(mcpServer) {
    this.mcpServers.push(mcpServer);

    mcpServer.getTools().forEach(tool => {
      this.toolStore.addTool(tool);
    });

    this.eventEmitter.emit('mcpServerAdded', mcpServer);
  }

  /**
   * Get all MCP Servers
   * @returns {McpServer[]} The MCP Servers
   */
  getMcpServers() {
    return this.mcpServers;
  }


}