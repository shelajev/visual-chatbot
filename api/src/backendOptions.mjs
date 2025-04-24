import { fetch, Agent } from "undici";
import dns from "dns";

export class BackendOptions {
  static async getConfigurations() {
    const configurations = [];

    const [ollamaConfiguration, modelRunnerConfiguration] = await Promise.all([
      BackendOptions.#createOllamaConfiguration(),
      BackendOptions.#createModelRunnerConfiguration(),
    ]);
    if (modelRunnerConfiguration) configurations.push(modelRunnerConfiguration);
    if (ollamaConfiguration) configurations.push(ollamaConfiguration);

    configurations.push(
      { 
        name: "OpenAI",
        endpoint: "https://api.openai.com/v1/chat/completions",
        models: ["gpt-4o", "o3-mini", "gpt-4o-mini"],
        requiresApiKey: true,
      },
    );
    
    return configurations;
  }

  static async #createOllamaConfiguration() {
    let ollamaAddress = "http://localhost:11434";
    let ollamaModels = [];

    try {
      await dns.promises.lookup("host.docker.internal");
      this.inContainer = true;
      ollamaAddress = "http://host.docker.internal:11434";
    } catch (e) {
      this.inContainer = false;
    }

    try {
      const { models } = await fetch(ollamaAddress + "/api/tags").then(r => r.json());
      ollamaModels = models.map(m => m.name);
    } catch (e) {
      return null;
    }

    return {
      name: "Ollama",
      endpoint: ollamaAddress + "/v1/chat/completions",
      models: ollamaModels,
      requiresApiKey: false,
    };
  }

  static async #createModelRunnerConfiguration() {
    try {
      await dns.promises.resolve("model-runner.docker.internal");
      const response = await fetch("http://model-runner.docker.internal/engines/v1/models").then(r => r.json());
      return {
        name: "Docker Model Runner",
        endpoint: "http://model-runner.docker.internal/engines/v1/chat/completions",
        models: response.data.map(data => data.id),
        requiresApiKey: false,
      };
    } catch (e) { console.log(e); }

    try {
      const response = await fetch("http://localhost/exp/vDD4.40/engines/v1/models", {
        dispatcher: new Agent({
          connect: {
            socketPath: "/var/run/docker.sock"
          }
        })
      }).then(r => r.json());
      
      return {
        name: "Docker Model Runner",
        endpoint: "http://docker-socket/exp/vDD4.40/engines/v1/chat/completions",
        models: response.data.map(d => d.id),
        requiresApiKey: false,
      };
    } catch (e) { console.log("HMM", e); }
  }
}