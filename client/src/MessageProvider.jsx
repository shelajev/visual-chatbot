import { createContext, useEffect, useState, useCallback, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [config, setConfig] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [mcpServers, setMcpServers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);

  const updateConfiguration = useCallback(async (newConfig) => {
    const mergedConfig = { ...config, ...newConfig };

    const response = await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mergedConfig),
    });

    const updatedConfig = await response.json();
    setConfig(updatedConfig);
  }, [setConfig, config]);

  const isAiToolGenerationEnabled = useMemo(() => {
    return tools.some((tool) => tool.name === "tool-creator")
  }, [tools]);

  useEffect(() => {
    const socket = io();
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("newMessage", (newMessage) => {
      console.log("newMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("config", (config) => {
      console.log("config", config);
      setConfig(config);
    });

    socket.on("messages", (messages) => {
      console.log("messages", messages);
      setMessages(messages);
    });

    socket.on("mcpServers", (mcpServers) => {
      console.log("mcpServers", mcpServers);
      setMcpServers(mcpServers);
    });

    socket.on("tools", (tools) => {
      console.log("tools", tools);
      setTools(tools);
    });

    socket.on("toolAdded", (tool) => {
      console.log("toolAdded", tool);
      setTools((prevTools) => [...prevTools, tool]);
    });

    socket.on("toolRemoved", (tool) => {
      console.log("toolRemoved", tool);
      setTools((prevTools) => prevTools.filter((t) => t.name !== tool.name));
    });

    socket.on("mcpServerAdded", (mcpServer) => {
      console.log("mcpServerAdded", mcpServer);
      setMcpServers((prevMcpServers) => [...prevMcpServers, mcpServer]);
    });

    socket.on("mcpServerRemoved", (mcpServer) => {
      console.log("mcpServerRemoved", mcpServer);
      setMcpServers((prevMcpServers) => prevMcpServers.filter((m) => m.name !== mcpServer.name));
    });

    return () => socket.disconnect();
  }, [setConnected, setMessages, setTools]);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const resetMessages = useCallback(async () => {
    await fetch("/api/messages", {
      method: "DELETE",
    });
  }, []);

  const toggleAiToolGeneration = useCallback(async () => {
    await fetch("/api/ai-tool-creation", {
      method: isAiToolGenerationEnabled ? "DELETE" : "POST",
    });
  }, [isAiToolGenerationEnabled]);

  const addTool = useCallback(async (tool) => {
    await fetch("/api/tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tool),
    });
  }, []);

  const removeTool = useCallback(async (tool) => {
    await fetch("/api/tools", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tool.name }),
    });
  }, []);

  const addMcpServer = useCallback(async (mcpServer) => {
    await fetch("/api/mcp-servers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mcpServer),
    });
  }, []);

  const removeMcpServer = useCallback(async (mcpServer) => {
    await fetch("/api/mcp-servers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: mcpServer.name }),
    });
  }, []);

  return (
    <MessageContext.Provider value={{ 
      config,
      updateConfiguration,

      connected,
      loading,

      messages,
      sendMessage,
      resetMessages,

      tools,
      addTool,
      removeTool,

      mcpServers,
      addMcpServer,
      removeMcpServer,
      
      isAiToolGenerationEnabled,
      toggleAiToolGeneration,
     }}>
      { config ? children : "Loading..." }
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);