# Visual Chatbot

This project provides a simple chatbot webapp that is intended to help educate folks on how LLM-based interactions occur. This chatbot displays _all_ messages going back and forth from the LLM, including system messages and tool execution requests and responses.

Additional features include:

- **System prompt adjusting/rebasing** - see how a conversation would change if you changed the initial system prompt
- **Dynamic tool creation** - add custom tools in the middle of a conversation to give the LLM new abilities
- **MCP support** - add tools by starting MCP servers
- **AI-generated tools** - give the LLM the ability to create a tool, which it then can execute


## Quick start

Run the following command to give it a try!

```console
docker run -dp 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock mikesir87/visual-chatbot
```

**NOTE:** The Docker socket is mounted to allow the tool to launch containerized MCP servers

Once the container has started, you can open the app at http://localhost:3000/.

### LLM configuration

The application obviously needs to have an LLM to operate against. 

#### OpenAI (default)

1. Obtain an OpenAI API key. The only required permission is the chat completions endpoint.
2. In the LLM configuration modal (which will launch at startup), enter the API key.

#### Ollama

In the LLM configuration modal, enter the following details:

1. **Endpoint:** http://host.docker.internal:11434/v1/chat/completions
  - This uses the `host.docker.internal` name since the app is running inside a container and needs to access Ollama running on the host
2. **Model:** - whatever model you want to use (such as `llama3.2`)
3. **API Key:** - enter anything... it won't be used but is currently a required field.


## Contributions

This project is mostly a for-fun training aid, so is likely fairly close to being "done." But, feel free to open an issue if you'd like and start a discussion.
