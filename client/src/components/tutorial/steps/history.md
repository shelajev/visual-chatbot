# Maintaining history

If you haven't picked up on it yet, the LLM itself has _no_ memory of previous interactions or engagements. It _only_ has the context of what is provided in the API call.

Therefore, in order for it to have memory or context of the entire presentation, all of the previous messages need to be provided.

It is quite often the case that you will see the `messages` look something like this...

```json
{
  "messages": [
    { 
      "role": "system", 
      "content": "You are a helpful agent" 
    },
    { 
      "role": "user", 
      "content": "What can you do for me?" 
    },
    { 
      "role": "assistant", 
      "content": "There are many things I can do. What do you need help with?" 
    },
    { 
      "role": "user", 
      "content": "Dogs are my favorite pet" 
    },
    { 
      "role": "assistant", 
      "content": "That is great to hear! Dogs make great pets!" 
    },
    { 
      "role": "user", 
      "content": "Do you have any suggestions for names?"
    }
  ]
}
```

Now, as you can imagine, this could create a very large payload. And since LLM services often charge by "token" (more payload = more token usage), some patterns encourage the usage of trimming or summarizing messages.

> [!tip]
> To learn more about summarizing chat histories, [check out this "How to" guide from LangChain](https://python.langchain.com/docs/how_to/chatbots_memory/#summary-memory).

## Your task

1. In the chat, enter a fact about yourself (such as "My favorite pets are dogs"). Then, ask it about your favorite pet. You'll get a response you'd expect!

2. Reset the conversation and try asking for names for your favorite pet, but before you add a message specifying your favorite pet. You'll see it doesn't know how to answer you!

