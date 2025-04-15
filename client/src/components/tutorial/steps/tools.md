# Tools

_Tools_ provide the ability for LLMs to _do_ something, rather than simply answer a question based on the information it was trained on.

Some use cases might include:

- Get the current time (what we'll try in just a moment)
- Look up data in a database
- Take screenshots of websites, decipher what's on it, and ask questions about it
- And more!

## The API structure

Going back to the `/v1/chats/completion` endpoint, there is another property called `tools`. 

The following command now includes the `tools` parameter, which contains a description of a tool that provides the ability to get the current time.

```json with-copy highlight=11-27
curl -v {{ENDPOINT}} \
    -H "Content-type: application/json" \
    -X POST --data-raw '
{
  "model": "{{MODEL}}",
  "messages": [
    { "role": "system", "content": "You are a helpful agent" },
    { "role": "user", "content": "What is the current time in New York City?" }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get-current-time",
        "description": "Get the current time for a specified timezone",
        "parameters": {
          "type": "object",
          "properties": {
            "timezone": {
              "type": "string",
              "description": "The requested timezone"
            }
          },
          "required": ["timezone"]
        }
      }
    }
  ]
}'
```

Note that it's description helps the LLM know when to use the tool and the parameters indicate it needs to know what timezone is requested.

If the LLM decides it needs to use a tool, it will generate a response that will contain a message with a `tool_calls` property, similar to the following:

```json
{
  "role": "assistant",
  "content": null,
  "tool_calls": [
    {
      "id": "call_oz8QXTQqD6CKZj0q68FWVdmF",
      "type": "function",
      "function": {
        "name": "get-current-time",
        "arguments": "{\"timezone\":\"America/New_York\"}"
      }
    }
  ]
}
```

Note how it passes along a random `id` for the request, the requested tool name, and the specified requirements.

At this point, it is up to the codebase to actually execute this tool and create a response.

The response is sent back to the LLM in another message, but this time using the **`tool`** role. In the message, the `id` of the requested execution is relayed back in the `tool_call_id` property.

```json with-copy highlight=23-27
curl -v {{ENDPOINT}} \
    -H "Content-type: application/json" \
    -X POST --data-raw '
{
  "model": "{{MODEL}}",
  "messages": [
    { "role": "system", "content": "You are a helpful agent" },
    { "role": "user", "content": "What is the current time in New York City?" },
    { 
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_oz8QXTQqD6CKZj0q68FWVdmF",
          "type": "function",
          "function": {
            "name": "get-current-time",
            "arguments": "{\"timezone\":\"America/New_York\"}"
          }
        }
      ]
    },
    {
      "role": "tool",
      "content": "2/19/2025, 4:50:24 PM",
      "tool_call_id": "call_oz8QXTQqD6CKZj0q68FWVdmF"
    }
  ]
}'
```

With the additional information, the LLM will further process the request. It may generate a response, ask for another tool execution, or anything else!


## Your task

- Close this dialog and add the time tool using the **+ Add time tool** button. Then, ask it for the current time in any timezone.
- If you're feeling adventerous, click the **+ Add custom tool** button and make up your own tool! An idea is a tool that adds two numbers together, but does it incorrectly.
