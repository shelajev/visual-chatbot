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

The application obviously needs to have an LLM to operate against. When it starts, a configuration modal will pop up, where you will have the ability to choose between the following LLM backends:

- **OpenAI** (an API key will be required)
- **Ollama** - will auto-detect whether it connects using localhost or `host.docker.internal` (if running in a container)
- **Docker Model Runner** - will auto-detect if it needs to connect via localhost or `model-runner.docker.internal`

Once the backend is selected, a collection of models are presented. For Ollama and the Docker Model Runner, the list consists of those currently downloaded.

## Development setup

If you wish to setup the development environment, do the following:

1. Run the following in each of the `api` and `client` directories:

    ```console
    npm install
    npm run dev
    ```

2. Open your browser to [http://localhost:5173/](http://localhost:5173/).

And don't worry... a containerized setup will be coming soon ;)

## Contributions

This project is mostly a for-fun training aid, so is likely fairly close to being "done." But, feel free to open an issue if you'd like and start a discussion.
