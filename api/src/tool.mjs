export class Tool {

  /**
   * Create a new tool
   * @param {string} name The name of the tool
   * @param {string} description The description of the tool
   * @param {object} parameterSchema A JSON schema of the parameters the tool requires
   * @param {"local" | "mcp"} type The type of the tool - either local or MCP
   * @param {Function} onExecute A function to invoke when the tool is executed
   */
  constructor(name, description, parameterSchema, type, onExecute) {
    this.name = name;
    this.description = description;
    this.parameterSchema = parameterSchema;
    this.type = type;
    this.onExecute = onExecute;
  }

  async execute(parameters) {
    return await this.onExecute(parameters);
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      description: this.description,
      parameters: this.parameterSchema,
    }
  };
}