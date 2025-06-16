import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  Settings,
  Send,
  Paperclip,
  Bot,
  Zap,
  Sparkles,
  Brain,
  ChevronDown,
} from "lucide-react";

// Bootstrap color classes for models
const models = [
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    icon: Bot,
    color: "bg-warning",
    description: "Balanced performance and efficiency",
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    icon: Zap,
    color: "bg-success",
    description: "Advanced reasoning and creativity",
  },
  {
    id: "gemini-2-flash",
    name: "Gemini 2.0 Flash",
    icon: Sparkles,
    color: "bg-primary",
    description: "Fast multimodal processing",
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    icon: Brain,
    color: "bg-purple",
    description: "Most capable for complex tasks",
  },
];

export default function CopilotChatInterface() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [modelDropdown, setModelDropdown] = useState(false);
  const textareaRef = useRef();
  const chatMessagesRef = useRef();

  const currentModel = models.find((m) => m.id === selectedModel);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [currentConversation, conversations]);

  function sendMessage() {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: message,
      timestamp: new Date(),
      model: selectedModel,
      isUser: true,
    };
    const aiMsg = {
      id: Date.now() + 1,
      text:
        "I'm a demo AI assistant. This is a simulated response to show how the interface works!",
      timestamp: new Date(),
      model: selectedModel,
      isUser: false,
    };
    let updatedConvs, newCurrent;
    if (currentConversation) {
      updatedConvs = conversations.map((c) =>
        c.id === currentConversation.id
          ? { ...c, messages: [...c.messages, newMsg, aiMsg] }
          : c
      );
      newCurrent = updatedConvs.find((c) => c.id === currentConversation.id);
    } else {
      const newConv = {
        id: Date.now(),
        title:
          message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [newMsg, aiMsg],
        createdAt: new Date(),
      };
      updatedConvs = [newConv, ...conversations];
      newCurrent = newConv;
    }
    setConversations(updatedConvs);
    setCurrentConversation(newCurrent);
    setMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Utility for Bootstrap color
  function getModelColorClass(color) {
    // Map bg-purple to bg-secondary
    if (color === "bg-purple") return "bg-secondary";
    return color;
  }

  return (
    <div className="d-flex" style={{ height: "600px", minHeight: "600px", background: "#161b22", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="d-flex flex-column border-end border-secondary" style={{ width: 320, background: "#1c2128" }}>
        <div className="px-4 pt-4 pb-3 border-bottom border-secondary">
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="rounded bg-dark p-2 d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
              <Bot className="w-5 h-5 text-light opacity-50" />
            </span>
            <div>
              <div className="fw-bold text-white">Copilot Chat</div>
              <div className="text-muted small">Your AI pair programmer</div>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentConversation(null);
              setMessage("");
            }}
            className="btn btn-success w-100 d-flex align-items-center gap-2 mb-2"
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
        </div>
        <nav className="flex-grow-1 overflow-auto px-2 pt-2 pb-3">
          {conversations.length === 0 ? (
            <div className="mt-5 text-center text-muted small">
              Start chatting to create a new conversation.
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversation(conv)}
                className={`btn btn-sm d-block w-100 text-start mb-2 ${currentConversation?.id === conv.id
                  ? "btn-primary"
                  : "btn-outline-light"
                  }`}
                style={{ background: currentConversation?.id === conv.id ? "#238636" : "transparent", borderColor: "#30363d", color: "#fff" }}
              >
                <div className="fw-medium text-truncate">{conv.title}</div>
                <div className="small text-muted">
                  {conv.messages.length} messages • {conv.createdAt.toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </nav>
      </aside>
      {/* Main */}
      <main className="d-flex flex-column flex-grow-1">
        {/* Top bar */}
        <header className="d-flex align-items-center justify-content-between px-4 border-bottom border-secondary" style={{ height: 56, background: "#161b22" }}>
          <div className="fs-6 fw-medium d-flex align-items-center gap-2">
            <span className={`rounded-circle me-2 ${getModelColorClass(currentModel.color)}`} style={{ width: 12, height: 12, display: "inline-block" }} />
            {currentModel.name}
            <span className="small text-muted ms-2">{currentModel.description}</span>
          </div>
          <div className="position-relative">
            <button
              className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
              type="button"
              onClick={() => setModelDropdown((v) => !v)}
            >
              <ChevronDown size={16} />
              Model
            </button>
            {modelDropdown && (
              <div className="position-absolute end-0 mt-2 bg-dark border border-secondary rounded shadow p-2" style={{ zIndex: 10, width: 260 }}>
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setModelDropdown(false);
                    }}
                    className={`btn btn-sm w-100 d-flex align-items-center gap-2 mb-1 ${selectedModel === model.id ? "btn-primary" : "btn-outline-light"
                      }`}
                    style={{ background: selectedModel === model.id ? "#238636" : "transparent", borderColor: "#30363d", color: "#fff" }}
                  >
                    <span
                      className={`rounded-circle ${getModelColorClass(model.color)}`}
                      style={{ width: 10, height: 10, display: "inline-block" }}
                    />
                    <span className="fw-medium">{model.name}</span>
                    <span className="ms-auto small text-muted">{model.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        {/* Chat */}
        <section className="flex-grow-1 overflow-auto px-4 py-4" style={{ background: "#161b22" }}>
          <div
            ref={chatMessagesRef}
            className="d-flex flex-column mx-auto"
            style={{ maxWidth: 800, minHeight: "90%" }}
          >
            {!currentConversation ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center py-5">
                <div
                  className={`rounded-circle mb-4 d-flex align-items-center justify-content-center ${getModelColorClass(currentModel.color)}`}
                  style={{ width: 64, height: 64 }}
                >
                  <currentModel.icon size={36} className="text-light" />
                </div>
                <div className="fs-3 fw-bold mb-2">How can Copilot help?</div>
                <div className="text-muted mb-4" style={{ maxWidth: 300, margin: "0 auto" }}>
                  Ask technical questions, create issues, or get code explanations, right here.
                </div>
              </div>
            ) : (
              currentConversation.messages.map((msg) => {
                const model = models.find((m) => m.id === msg.model);
                const isUser = msg.isUser;
                const BubbleIcon = isUser ? MessageSquare : (model?.icon || Bot);
                return (
                  <div
                    key={msg.id}
                    className={`d-flex gap-2 mb-4 ${isUser ? "justify-content-end" : ""}`}
                  >
                    {!isUser && (
                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${getModelColorClass(model?.color || "bg-dark")}`}
                        style={{ width: 36, height: 36 }}>
                        <BubbleIcon size={20} className="text-white" />
                      </div>
                    )}
                    <div style={{ maxWidth: "70%" }}>
                      <div className="small text-muted mb-1">
                        {isUser ? "You" : model?.name || "AI"} ·{" "}
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className={`rounded-pill px-4 py-2 mb-0 ${isUser
                          ? "bg-success text-white"
                          : "bg-secondary text-white"
                          }`}
                        style={{
                          borderTopRightRadius: isUser ? 0 : undefined,
                          borderTopLeftRadius: !isUser ? 0 : undefined,
                          minWidth: 60,
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                    {isUser && (
                      <div className="rounded-circle d-flex align-items-center justify-content-center bg-success"
                        style={{ width: 36, height: 36 }}>
                        <BubbleIcon size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
        {/* Input */}
        <form
          className="px-4 py-3 border-top border-secondary"
          style={{ background: "#161b22" }}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className="d-flex align-items-end gap-2 mx-auto" style={{ maxWidth: 800 }}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message to Copilot…"
              className="form-control bg-dark text-white"
              style={{
                resize: "none",
                minHeight: 44,
                maxHeight: 120,
                flex: 1,
                borderColor: "#30363d",
              }}
              rows={1}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              tabIndex={-1}
              style={{ borderColor: "#30363d" }}
            >
              <Paperclip size={20} />
            </button>
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn btn-success"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
        {/* Footer */}
        <footer className="px-4 py-2 border-top border-secondary text-center small text-muted" style={{ background: "#161b22" }}>
          Copilot Chat is powered by {currentModel.name}. Always check outputs for accuracy.
        </footer>
      </main>
    </div>
  );
}