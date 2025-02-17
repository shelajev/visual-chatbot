import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as WeatherService from "./weatherService.js";

const server = new McpServer({
  name: "Weather",
  version: "1.0.0"
});

server.tool(
  "get-hourly-forecast",
  "Get the hourly forecast for a given location",
  { latitude: z.number().describe("The latitude coordinate"), longitude: z.number().describe("The longitude coordinate") },
  async ({ latitude, longitude }) => {
    try {
      const forecast = await WeatherService.getHourlyForecast(latitude, longitude);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(forecast)
        }]
      };
    } catch (err) {
      const error = err;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);

server.tool(
  "get-forecast",
  "Get the forecast for the next few days for a given location",
  { latitude: z.number().describe("The latitude coordinate"), longitude: z.number().describe("The longitude coordinate") },
  async ({ latitude, longitude }) => {
    try {
      const forecast = await WeatherService.getForecast(latitude, longitude);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(forecast)
        }]
      };
    } catch (err) {
      const error = err;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);


server.tool(
  "get-weather-warnings",
  "Get applicable weather warnings for a given location",
  { latitude: z.number().describe("The latitude coordinate"), longitude: z.number().describe("The longitude coordinate") },
  async ({ latitude, longitude }) => {
    try {
      const warnings = await WeatherService.getWarnings(latitude, longitude);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(warnings)
        }]
      };
    } catch (err) {
      const error = err;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);