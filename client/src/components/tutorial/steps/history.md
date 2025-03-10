# History and threads

As you may be starting to see, the LLM itself has _no_ memory of previous interactions or engagements. It _only_ has the context of what you provide it in the API call.

Therefore, in order to give it memory of the conversation, you simply keep track of the messages you've covered up to this point.

It is quite often the case that you will see the `messages` look something like this...

```json
[
  { "role": "system", "content": "Instructions for the agent" },
  { "role": "user", "content": "First message" },
  { "role": "assistant", "content": "First response" },
  { "role": "user", "content": "Second message" },
  { "role": "assistant", "content": "Second response" },
  { "role": "user", "content": "Third message" },
  { "role": "assistant", "content": "Third response" }
]
```

Now, as you can imagine, this could create a very large payload. And since LLMs often charge by "token" (more payload = more token usage), some patterns encourage the usage of trimming or summarizing messages.

> [!tip]
> To learn more about summarizing chat histories, [check out this "How to" guide from LangChain](https://python.langchain.com/docs/how_to/chatbots_memory/#summary-memory).

## Your task

1. In the chat, enter a fact about yourself (such as "My favorite pets are dogs"). Then, ask it about your favorite pet. You'll get a response you'd expect!

2. Reset the conversation and try it again, but before you ask about your favorite pet, delete the message specifying your favorite pet (and the response). You'll see it doesn't know how to answer you!

