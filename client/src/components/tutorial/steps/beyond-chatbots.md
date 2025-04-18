# Going beyond chatbots

While most GenAI interactions have a chatbot-like experience, that's certainly not a requirement! Most LLMs can handle a variety of content, not just human-readable text.


## A fictional scenario

Imagine we have a system that allows users to submit product feedback. In this system, we want to perform several operations, one of which is generating a response that we can send back to the feedback author. This would be a great use case for GenAI!

Since we want to make sure our generated response is cordial, we want to have a system prompt that sets various rules for the response.

```custom prompt
You are a customer support representative for an AI assistant called Jarvis. Your task is to generate polite, helpful responses to user comments. If multiple comments are submitted (as a JSON object), generate a response for each comment and return it in a JSON array with no wrapping markdown markers.

Guidelines for responses:

1. Be empathetic and acknowledge the user's feedback
2. Thank the user for their input
3. If the comment is positive, express appreciation
4. If the comment is negative, apologize for the inconvenience and assure them you're working on improvements
5. If the comment is neutral, acknowledge their observation
6. If relevant, mention that their feedback will be considered for future updates
7. Keep responses concise (2-4 sentences) and professional
8. Do not make specific promises about feature implementation or timelines
9. In each response, sign the response with "The Jarvis Team" on a separate line (empty new line separating comment from signature)
```

Now, we can add a user message that provides the comment we want to generate a response for:

```custom message
User comment: Jarvis is pretty helpful when it works, but I’ve noticed a few glitches lately – it sometimes misunderstands simple requests and occasionally just freezes up. It’s a promising tool, but needs a bit more refinement.
```

We can even send a collection of comments to generate multiple responses at a time:

```custom message language=json
{
  "messages": [
    "Jarvis is pretty helpful when it works, but I’ve noticed a few glitches lately – it sometimes misunderstands simple requests and occasionally just freezes up. It’s a promising tool, but needs a bit more refinement.",
    "Jarvis is seriously impressive – the speed at which it responds is incredible! I’ve never used an AI assistant that’s so quick and efficient.",
    "Jarvis is pretty handy for quickly getting information and setting reminders, but I’ve noticed it occasionally misunderstands complex requests. Overall, it’s a useful tool, though I’m still getting used to its quirks."
  ]
}
```

## Recap 

As you move forward with this tutorial, remember that while this is presented in a chatbot-like interaction, you can weave GenAI into any existing applications.
