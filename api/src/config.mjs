export class Configuration {
  
  /**
   * Create a new config object
   * @param {string} apiKey The API key to use when making requests
   * @param {string} systemPrompt The system prompt to be used to initialize the LLM
   * @param {string} model The name of the model to use
   * @param {string} endpoint The full URL/endpoint
   */
  constructor(apiKey, systemPrompt, model, endpoint) {
    this.apiKey = apiKey;
    this.systemPrompt = systemPrompt;
    this.model = model;
    this.endpoint = endpoint;
  }

  setSystemPrompt(systemPrompt) {
    this.systemPrompt = systemPrompt;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  getSystemPrompt() {
    return this.systemPrompt;
  }

  getApiKey() {
    return this.apiKey;
  }

  getModel() {
    return this.model;
  }

  getEndpoint() {
    return this.endpoint;
  }

  setModel(model) {
    this.model = model;
  }

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  toJSON() {
    return {
      hasApiKey: this.apiKey !== undefined,
      systemPrompt: this.systemPrompt,
      model: this.model,
      endpoint: this.endpoint,
    };
  }

}