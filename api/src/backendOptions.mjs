import { fetch, Agent } from "undici";
import dns from "dns";

export class BackendOptions {
  static async getConfigurations() {
    const configurations = [
      { 
        name: "OpenAI",
        endpoint: "https://api.openai.com/v1/chat/completions",
        models: ["gpt-4o", "o3-mini", "gpt-4o-mini"],
        requiresApiKey: true,
      },
    ];

    const [ollamaConfiguration, modelRunnerConfiguration] = await Promise.all([
      BackendOptions.#createOllamaConfiguration(),
      BackendOptions.#createModelRunnerConfiguration(),
    ]);
    if (ollamaConfiguration) configurations.push(ollamaConfiguration);
    if (modelRunnerConfiguration) configurations.push(modelRunnerConfiguration);
    
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
    } catch (e) {}

    return {
      name: "Ollama (on host)",
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
        name: "Docker Model Runner (internal)",
        endpoint: "http://model-runner.docker.internal/engines/llama.cpp/v1/chat/completions",
        models: response.map(data => data.id),
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
        name: "Docker Model Runner (socket)",
        endpoint: "http://docker-socket/exp/vDD4.40/engines/llama.cpp/v1/chat/completions",
        models: response.map(d => d.id),
        requiresApiKey: false,
      };
    } catch (e) { console.log("HMM", e); }
  }
}