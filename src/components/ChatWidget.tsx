import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

const ENDPOINT = import.meta.env.NEXT_PUBLIC_CHAT_API_URL as string;
const STORAGE_KEY = "lemon-chat-history";
const BUBBLE_SEEN_KEY = "lemon-chat-bubble-seen";
const MAX_HISTORY = 10;
const QUICK_QUESTIONS = [
  "What kind of projects has he built?",
  "Why both AI dev and UX?",
  "Why the nickname Lemon?",
];
const BUBBLE_SHOW_DELAY_MS = 4500;
const BUBBLE_AUTO_HIDE_MS = 9000;

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    } catch {
      return [];
    }
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
    } catch {
      /* ignore */
    }
  }, [messages]);

  const dismissBubble = () => {
    setShowBubble(false);
    try {
      localStorage.setItem(BUBBLE_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(BUBBLE_SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen || messages.length > 0) return;

    const showTimer = setTimeout(() => setShowBubble(true), BUBBLE_SHOW_DELAY_MS);
    return () => clearTimeout(showTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    const hideTimer = setTimeout(dismissBubble, BUBBLE_AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBubble]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        inputRef.current?.focus();
      });
    }
  }, [open, messages, loading]);

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-MAX_HISTORY),
        }),
      });
      const data = await res.json();
      const reply = (data?.response as string) ?? "Sorry, I couldn't get a response.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Hmm, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {showBubble && !open && (
        <div
          role="status"
          className="fixed bottom-24 right-5 z-[60] max-w-[220px] animate-scale-in"
        >
          <div className="relative bg-background border border-border rounded-2xl rounded-br-sm shadow-xl px-4 py-3">
            <button
              onClick={dismissBubble}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <button
              onClick={() => {
                setOpen(true);
                dismissBubble();
              }}
              className="text-sm text-foreground leading-snug text-left hover:text-heading"
            >
              👋 Curious about my projects? Ask me anything!
            </button>
          </div>
        </div>
      )}

      <button
        aria-label={open ? "Close chat" : "Ask about Aggelos"}
        onClick={() => {
          setOpen((v) => !v);
          dismissBubble();
        }}
        className={cn(
          "fixed bottom-5 right-5 z-[60] rounded-full bg-lemon text-heading shadow-lg",
          "flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon focus-visible:ring-offset-2",
          open ? "h-14 w-14" : "h-14 px-5",
          showBubble && !open && "animate-glow"
        )}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold">Ask about Aggelos</span>
          </>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "fixed z-[60] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden",
            "animate-scale-in",
            "bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px]",
            "sm:w-96"
          )}
          role="dialog"
          aria-label="Chat with Lemon"
        >
          <div className="px-4 py-3 border-b bg-card flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-lemon flex items-center justify-center text-lg">
              🍋
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-heading leading-tight">Chat with Lemon</p>
              <p className="text-xs text-muted-foreground leading-tight">Ask about my work</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="py-4 space-y-4">
                <div className="text-sm text-muted-foreground text-center px-2">
                  👋 Hi! Ask me anything about my projects, skills, or experience.
                </div>
                <div className="flex flex-col gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      disabled={loading}
                      className="text-left text-sm rounded-xl border border-input bg-background px-3.5 py-2 hover:bg-muted hover:border-lemon transition-colors disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap break-words",
                  m.role === "user"
                    ? "ml-auto bg-lemon text-heading rounded-br-sm"
                    : "mr-auto bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </div>
            )}
          </div>

          <div className="border-t p-3 bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Type a message…"
                className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon max-h-32"
              />
              <Button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                size="icon"
                className="bg-lemon hover:bg-lemon/90 text-heading rounded-xl shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
