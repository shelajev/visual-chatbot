import EventEmitter from 'node:events';

export class ToolStore {
  constructor() {
    this.tools = [];
    this.eventEmitter = new EventEmitter();
  }

  addTool(tool) {
    if (this.tools.find(t => t.name === tool.name)) {
      this.removeToolByName(tool.name);
    }
    
    this.tools.push(tool);
    this.eventEmitter.emit("toolAdded", tool);
  }

  setToolEnabled(toolName, enabled) {
    const tool = this.tools.find(t => t.name === toolName);
    
    if (!tool) {
      return;
    }

    tool.setEnabled(enabled);
    this.eventEmitter.emit('toolUpdated', tool);
  }

  getTools() {
    return this.tools;
  }

  onToolAdded(cb) {
    return this.eventEmitter.on('toolAdded', cb);
  }

  onToolUpdated(cb) {
    return this.eventEmitter.on('toolUpdated', cb);
  }

  onRemovedTool(cb) {
    return this.eventEmitter.on('toolRemoved', cb);
  }

  getToolConfiguration() {
    return this.tools
      .filter(tool => tool.enabled)
      .map(tool => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameterSchema,
        }
      }));
  }

  getToolsJSON() {
    return this.tools.map(tool => tool.toJSON());
  }

  removeToolByName(toolName) {
    const tool = this.tools.find(t => t.name === toolName);

    if (!tool) {
      console.error(`Trying to remove tool ${toolName}, but it was not found`);
      return;
    }

    this.tools = this.tools.filter(t => t.name !== toolName);
    this.eventEmitter.emit("toolRemoved", tool);
  }
}