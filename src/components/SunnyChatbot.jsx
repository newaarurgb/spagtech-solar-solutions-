
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles, RotateCcw } from "lucide-react";
import "./SunnyChatbot.css";

const API_URL =
 import.meta.env.VITE_SUNNY_API_URL;

const initialMessage = {
  role: "assistant",
  content:
    "Hey there! ☀️ I'm Sunny, your SPAGTECH solar assistant. Ask me anything about solar systems, savings, or installation!",
};

function SunnyMascot({ mood = "happy" }) {
  return (
    <div className={`sunny-mascot sunny-${mood}`} aria-label={`Sunny is ${mood}`}>
      <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
        <g className="sunny-rays" stroke="#E5B92F" strokeWidth="5" strokeLinecap="round">
          <path d="M60 5v9" />
          <path d="M60 106v9" />
          <path d="M5 60h9" />
          <path d="M106 60h9" />
          <path d="M21 21l7 7" />
          <path d="M92 92l7 7" />
          <path d="M99 21l-7 7" />
          <path d="M28 92l-7 7" />
        </g>
        <circle cx="60" cy="60" r="43" fill="#F9D957" />
        <circle cx="60" cy="60" r="35" fill="#FFF2B2" />
        <ellipse cx="46" cy="58" rx="4" ry="6" fill="#173D2B" />
        <ellipse cx="74" cy="58" rx="4" ry="6" fill="#173D2B" />
        <circle cx="36" cy="68" r="6" fill="#F3A5A0" opacity=".8" />
        <circle cx="84" cy="68" r="6" fill="#F3A5A0" opacity=".8" />
        {mood === "thinking" ? (
          <circle cx="60" cy="76" r="5" fill="none" stroke="#173D2B" strokeWidth="3" />
        ) : mood === "excited" ? (
          <path d="M44 70 Q60 91 76 70" fill="none" stroke="#173D2B" strokeWidth="4" strokeLinecap="round" />
        ) : mood === "confused" ? (
          <path d="M48 76 Q60 70 72 77" fill="none" stroke="#173D2B" strokeWidth="4" strokeLinecap="round" />
        ) : (
          <path d="M46 72 Q60 87 74 72" fill="none" stroke="#173D2B" strokeWidth="4" strokeLinecap="round" />
        )}
        <path d="M27 40 Q60 18 93 40 L87 46 Q60 31 33 46 Z" fill="#25764A" stroke="#17452D" strokeWidth="2" />
        <path d="M33 44 Q60 35 87 44 L77 51 H43 Z" fill="#3D9653" />
        <text x="60" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">S</text>
      </svg>
      {mood === "excited" && <span className="sunny-sparkle">✦</span>}
    </div>
  );
}

export default function SunnyChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("happy");
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(event) {
    event?.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");
    setMood("thinking");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((message) => message !== initialMessage)
            .map(({ role, content }) => ({ role, content }))
            .slice(-12),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sunny couldn't answer right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
      setMood("excited");
      window.setTimeout(() => setMood("happy"), 1600);
    } catch (err) {
      setMood("confused");
      setError(
        err.message ||
          "I couldn't connect to Sunny's AI. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages([initialMessage]);
    setInput("");
    setError("");
    setMood("happy");
  }

  return (
    <div className="sunny-widget">
      {open && (
        <section className="sunny-panel" aria-label="Sunny AI chat">
          <div className="sunny-panel-mascot">
            <div className="sunny-roaming">
              <SunnyMascot mood={loading ? "thinking" : mood} />
            </div>
            <div className="sunny-greeting">
              <span className="sunny-online-dot" />
              <strong>Sunny AI</strong>
              <small>Your solar buddy</small>
            </div>
          </div>

          <header className="sunny-chat-header">
            <div className="sunny-header-icon">
              <Sparkles size={19} />
            </div>
            <div className="sunny-header-copy">
              <strong>Ask Sunny</strong>
              <span>SPAGTECH solar assistant</span>
            </div>
            <button
              className="sunny-icon-button"
              onClick={resetChat}
              aria-label="Reset conversation"
              title="New conversation"
            >
              <RotateCcw size={17} />
            </button>
            <button
              className="sunny-icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="sunny-messages" ref={listRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`sunny-message-row ${message.role}`}
                key={`${index}-${message.role}`}
              >
                {message.role === "assistant" && (
                  <div className="sunny-mini-avatar">☀</div>
                )}
                <div className="sunny-message">{message.content}</div>
              </div>
            ))}

            
{loading && (
  <div className="sunny-message-row assistant sunny-loading-row">
    <div className="sunny-mini-avatar sunny-loading-avatar">☀</div>

    <div className="sunny-loading-content">
      <div className="sunny-thinking-label">
        Sunny is thinking
        <span className="sunny-thinking-ellipsis">...</span>
      </div>

      <div
        className="sunny-message sunny-typing"
        aria-label="Sunny is generating a response"
      >
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
)}
</div>

          <div className="sunny-suggestions">
            {["Which solar system is right for me?", "How do I get a quote?"].map(
              (question) => (
                <button
                  key={question}
                  onClick={() => {
                    setInput(question);
                    inputRef.current?.focus();
                  }}
                  disabled={loading}
                >
                  {question}
                </button>
              )
            )}
          </div>

          {error && <p className="sunny-error">{error}</p>}

          <form className="sunny-composer" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Sunny anything..."
              maxLength={2000}
              aria-label="Message Sunny"
              disabled={loading}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              <Send size={19} />
            </button>
          </form>

          <div className="sunny-panel-footer">
            Powered by AI · Verify quotes with SPAGTECH
          </div>
        </section>
      )}

      <button
        className={`sunny-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close Sunny AI" : "Chat with Sunny AI"}
        aria-expanded={open}
      >
        {open ? <X size={25} /> : <SunnyMascot mood={mood} />}
        {!open && <span className="sunny-launcher-badge">AI</span>}
      </button>
    </div>
  );
}
