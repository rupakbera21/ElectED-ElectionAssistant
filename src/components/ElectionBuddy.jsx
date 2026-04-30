import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ChevronRight, ArrowLeft, Home, ShieldCheck, ThumbsUp, ThumbsDown } from "lucide-react";
import mascot from "../assets/mascot.png";
import { generateElectionResponse } from "../services/aiService";
import { translations } from "../data/translations";
import { OFFLINE_FAQS } from "../data/faqs";
import { db, analytics, logEvent } from "../lib/firebase";
import { doc, updateDoc, increment, setDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Fuse from "fuse.js";

/* ── JSDoc Definitions ────────────────────────────────────────── */
/**
 * @typedef {Object} FAQ
 * @property {number} id
 * @property {string} category
 * @property {string} question
 * @property {string} answer
 * @property {string[]} keywords
 */

/**
 * @typedef {Object} AnalyticsEvent
 * @property {string} eventName
 * @property {Object} params
 */

/* ── Markdown component map ───────────────────────────────────── */
const markdownComponents = {
  h1: ({ children }) => <h1 className="text-base font-bold text-saffron mt-3 mb-1.5">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-bold text-saffron mt-2.5 mb-1">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold text-saffron/90 mt-2 mb-1">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xs font-semibold text-saffron/80 mt-1.5 mb-0.5">{children}</h4>,
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-white/70">{children}</em>,
  ul: ({ children }) => <ul className="list-disc list-outside ml-4 mb-2 space-y-1 marker:text-saffron/60">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-outside ml-4 mb-2 space-y-1 marker:text-saffron/60">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-saffron underline underline-offset-2 hover:text-saffron-light transition-colors">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-saffron/40 pl-3 my-2 text-white/70 italic">{children}</blockquote>
  ),
  code: ({ children }) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-saffron">{children}</code>,
  hr: () => <hr className="border-white/10 my-3" />,
};

/* ── Chatbot logic (AI-powered) ─────────────────────────────── */

const ChatMessage = memo(({ msg, onFeedback }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  const handleFeedbackClick = (sentiment) => {
    if (feedbackGiven) return;
    setFeedbackGiven(sentiment);
    if (onFeedback) {
      onFeedback(msg.text, sentiment);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${
        msg.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col gap-1 max-w-[85%]">
        <div
          className={`px-4 py-3 text-sm shadow-sm ${
            msg.type === "user"
              ? "bg-saffron text-white rounded-2xl rounded-tr-sm"
              : msg.isContextUpdate
              ? "bg-saffron/10 border border-saffron/20 text-white/90 rounded-2xl rounded-tl-sm"
              : msg.isOfflineAlert
              ? "bg-amber-900/40 border border-amber-500/30 text-white/90 rounded-2xl rounded-tl-sm"
              : "bg-white/5 border border-white/10 text-white/90 rounded-2xl rounded-tl-sm"
          }`}
          role={msg.isOfflineAlert ? "alert" : undefined}
        >
          {msg.isContextUpdate && (
            <Sparkles size={12} className="text-saffron mb-1 inline-block mr-1" />
          )}
          {msg.isOfflineAlert && (
            <ShieldCheck size={14} className="text-amber-500 mb-1.5 inline-block mr-1.5 animate-pulse" />
          )}
          
          {msg.type === "bot" ? (
            <>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {msg.text}
              </ReactMarkdown>
              {msg.isOffline && (
                <p className="text-[10px] mt-2 pt-2 border-t border-white/10 text-white/40 italic">
                  Sourced from the 2026 Election Commission Guidelines.
                </p>
              )}
            </>
          ) : (
            msg.text
          )}
        </div>
        
        {msg.type === "bot" && !msg.isContextUpdate && !msg.isOfflineAlert && (
          <div className="flex items-center gap-2 px-1 mt-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Helpful?</span>
            <button
              onClick={() => handleFeedbackClick('up')}
              disabled={feedbackGiven !== null}
              className={`p-1 rounded transition-colors ${feedbackGiven === 'up' ? 'text-saffron bg-saffron/10' : 'text-white/30 hover:text-saffron hover:bg-white/5'}`}
            >
              <ThumbsUp size={12} />
            </button>
            <button
              onClick={() => handleFeedbackClick('down')}
              disabled={feedbackGiven !== null}
              className={`p-1 rounded transition-colors ${feedbackGiven === 'down' ? 'text-saffron bg-saffron/10' : 'text-white/30 hover:text-saffron hover:bg-white/5'}`}
            >
              <ThumbsDown size={12} />
            </button>
            {feedbackGiven && (
              <span className="text-[10px] text-saffron/80 ml-1">Thank you!</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

/* ── Floating Chatbot Widget ────────────────────────────────── */
export default function ElectionBuddy({ isOpen, setIsOpen, currentStep, isDark, language }) {
  const t = translations[language].chatbot;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Offline State
  const [isOffline, setIsOffline] = useState(false);
  const [faqView, setFaqView] = useState("categories"); // categories, questions, answer
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const categories = [...new Set(OFFLINE_FAQS.map(f => f.category))];
  const filteredFaqs = selectedCategory ? OFFLINE_FAQS.filter(f => f.category === selectedCategory) : [];

  // Fuse.js for fuzzy search
  const fuse = new Fuse(OFFLINE_FAQS, {
    keys: ['question', 'keywords'],
    threshold: 0.4,
    includeScore: true
  });

  const trackFaqView = async (faqId) => {
    try {
      const faqRef = doc(db, 'faq_stats', `faq_${faqId}`);
      await setDoc(faqRef, { view_count: increment(1) }, { merge: true });
      await incrementGlobalStats();
    } catch (err) {
      console.warn("Firebase trackFaqView failed", { faqId, error: err.message });
    }
  };

  const incrementGlobalStats = async () => {
    try {
      const globalRef = doc(db, 'stats', 'global');
      await setDoc(globalRef, { 
        total_answers: increment(1),
        total_queries: increment(1),
        last_active: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Firebase incrementGlobalStats failed", err.message);
    }
  };

  const handleFeedback = useCallback(async (messageText, sentiment) => {
    try {
      await setDoc(doc(db, 'feedback', Date.now().toString()), {
        messageText: messageText.substring(0, 200), // truncate for sanity
        sentiment,
        language,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Firebase handleFeedback failed", err.message);
    }
  }, [language]);

  const findBestOfflineMatch = (query) => {
    const results = fuse.search(query);
    return results.length > 0 ? results[0].item : null;
  };

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          type: "bot",
          text: t.welcome,
        },
      ]);
    }
  }, [language, t.welcome, messages.length]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-suggest based on current step context
  useEffect(() => {
    if (currentStep && !isOffline) {
      const isHi = language === "hi";
      const contextText = isHi 
        ? `मैं देख रहा हूँ कि आप "${currentStep.title}" के बारे में पढ़ रहे हैं। क्या आपके पास इस चरण के बारे में कोई विशिष्ट प्रश्न हैं?`
        : `I see you're reading about "${currentStep.title}". Do you have any specific questions about this step?`;
      
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: contextText,
          isContextUpdate: true,
        },
      ]);
    }
  }, [currentStep, language, isOffline]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 128);
    textarea.style.height = `${newHeight}px`;
  }, [inputValue]);

  const handleSend = useCallback(async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [...prev, { type: "user", text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    // Analytics: log election query
    if (analytics) {
      logEvent(analytics, 'election_query', { 
        query: userMsg, 
        language, 
        isOffline 
      });
    }
    
    // Always increment total_queries in Firestore even if offline (persistence handles it)
    await incrementGlobalStats();

    if (isOffline) {
      // Search local records
      setTimeout(() => {
        const match = findBestOfflineMatch(userMsg);
        if (match) {
          trackFaqView(match.id);
          setMessages((prev) => [...prev, { 
            type: "bot", 
            text: `### ${match.question}\n\n${match.answer}`,
            isOffline: true 
          }]);
        } else {
          setMessages((prev) => [...prev, { 
            type: "bot", 
            text: language === "hi" 
              ? "मुझे आपके प्रश्न का सटीक मिलान नहीं मिला, लेकिन आप नीचे दी गई श्रेणियों में खोज सकते हैं।" 
              : "I couldn't find an exact match in our offline records, but please browse the verified categories below.",
            isOffline: true 
          }]);
          setFaqView("categories");
        }
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      const { text, isOffline: offline } = await generateElectionResponse(userMsg, language);
      
      if (offline) {
        setIsOffline(true);
        if (analytics) logEvent(analytics, 'offline_fallback_triggered', { query: userMsg });
        setMessages((prev) => [...prev, { 
          type: "bot", 
          text: language === "hi" 
            ? "**नोट: मानक एआई अनुपलब्ध है। आधिकारिक ऑफलाइन रिकॉर्ड पर स्विच किया गया।**" 
            : "**Note: Standard AI is unavailable. Switched to Official Offline Records.**",
          isOffline: true,
          isOfflineAlert: true
        }]);
      } else {
        if (analytics) logEvent(analytics, 'ai_query_success', { query: userMsg });
        setMessages((prev) => [...prev, { type: "bot", text, isOffline: false }]);
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Chat failure during AI response generation", error);
      setIsOffline(true);
      setIsTyping(false);
    }
  }, [inputValue, language, isOffline]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, [handleSend, setIsOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, setIsOpen]);

  const suggestedQuestions = t.suggestedQuestions;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            role="button"
            aria-label="Close Chat Overlay"
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-[550px] max-h-[85vh] rounded-3xl overflow-hidden flex flex-col bg-[#060a14]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-saffron/10 to-transparent flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full blur-3xl" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative w-10 h-10 rounded-full bg-black border border-saffron/30 flex items-center justify-center">
                    <img 
                      src={mascot} 
                      alt="Votey" 
                      width="40"
                      height="40"
                      loading="lazy"
                      className="w-10 h-10 object-contain mix-blend-screen contrast-150 brightness-110" 
                      style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 65%)' }}
                    />
                    <motion.span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#060a14] ${isOffline ? "bg-[#d97706]" : "bg-india-green"}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white tracking-widest uppercase text-sm">Votey AI</h3>
                    <p className={`text-[9px] font-bold mt-0.5 uppercase tracking-widest ${isOffline ? "text-[#d97706]" : "text-india-green"}`}>
                      {isOffline ? "LOCAL KNOWLEDGE BASE" : t.onlineStatus}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chat"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border border-white/10 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 chatbot-scrollbar bg-transparent overscroll-contain"
                aria-live="polite"
                aria-atomic="false"
                data-lenis-prevent
              >
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} msg={msg} onFeedback={handleFeedback} />
                ))}

                {isOffline && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 border border-amber-500/20 rounded-2xl overflow-hidden bg-amber-500/5 shadow-[0_4px_15px_rgba(217,119,6,0.1)]"
                  >
                    {/* FAQ Browser UI */}
                    <div className="p-4 border-b border-amber-500/10 bg-amber-500/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {faqView !== "categories" && (
                          <button 
                            onClick={() => {
                              if (faqView === "answer") setFaqView("questions");
                              else setFaqView("categories");
                            }}
                            className="p-1 hover:bg-amber-500/10 rounded-full transition-colors"
                          >
                            <ArrowLeft size={16} className="text-amber-500" />
                          </button>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200/60">
                          {faqView === "categories" ? "Select Category" : faqView === "questions" ? selectedCategory : "Record Detail"}
                        </span>
                      </div>
                      {faqView !== "categories" && (
                        <button 
                          onClick={() => setFaqView("categories")}
                          className="p-1 hover:bg-amber-500/10 rounded-full transition-colors"
                        >
                          <Home size={14} className="text-amber-200/40" />
                        </button>
                      )}
                    </div>

                    <div className="p-2 max-h-[250px] overflow-y-auto chatbot-scrollbar">
                      <AnimatePresence mode="wait">
                        {faqView === "categories" && (
                          <motion.div
                            key="categories"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 gap-2"
                          >
                            {categories.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  setFaqView("questions");
                                  if (analytics) logEvent(analytics, 'faq_category_click', { category: cat });
                                }}
                                className="p-3 text-left bg-amber-500/5 border border-amber-500/5 rounded-xl hover:border-amber-500/30 hover:bg-amber-500/10 transition-all group"
                              >
                                <span className="text-xs font-bold text-amber-200/80 group-hover:text-amber-400 transition-colors">{cat}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}

                        {faqView === "questions" && (
                          <motion.div
                            key="questions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-1.5"
                          >
                            {filteredFaqs.map((faq) => (
                              <button
                                key={faq.id}
                                onClick={() => {
                                  setSelectedAnswer(faq);
                                  setFaqView("answer");
                                  trackFaqView(faq.id);
                                }}
                                className="w-full p-3 text-left bg-amber-500/5 border border-amber-500/5 rounded-xl hover:border-amber-500/30 hover:bg-amber-500/10 transition-all flex justify-between items-center group"
                              >
                                <span className="text-xs text-amber-200/70 group-hover:text-amber-200 transition-colors pr-2">{faq.question}</span>
                                <ChevronRight size={14} className="text-amber-500/40 group-hover:text-amber-500 shrink-0" />
                              </button>
                            ))}
                          </motion.div>
                        )}

                        {faqView === "answer" && selectedAnswer && (
                          <motion.div
                            key="answer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-3"
                          >
                            <h4 className="text-xs font-bold text-amber-500 mb-2 flex items-center gap-2">
                              <ShieldCheck size={14} />
                              {selectedAnswer.question}
                            </h4>
                            <div className="text-xs text-amber-100/90 leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-500/10">
                              {selectedAnswer.answer}
                            </div>
                            <p className="text-[9px] mt-3 text-amber-500/30 italic text-center uppercase tracking-widest font-bold">
                              Verified Official Election Record
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 bg-saffron rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{t.thinking}</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {!isTyping && messages[messages.length - 1]?.type === "bot" && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                  {suggestedQuestions.map((q, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      aria-label={`Ask Votey: ${q}`}
                      onClick={async () => {
                        setInputValue("");
                        setMessages((prev) => [...prev, { type: "user", text: q }]);
                        setIsTyping(true);
                        
                        if (analytics) {
                          logEvent(analytics, 'suggested_question_clicked', { question: q });
                          logEvent(analytics, 'election_query', { query: q, language, isOffline });
                        }

                        if (isOffline) {
                          setTimeout(() => {
                            const match = findBestOfflineMatch(q);
                            if (match) {
                              trackFaqView(match.id);
                              setMessages((prev) => [...prev, { 
                                type: "bot", 
                                text: `### ${match.question}\n\n${match.answer}`,
                                isOffline: true 
                              }]);
                            } else {
                              setMessages((prev) => [...prev, { 
                                type: "bot", 
                                text: language === "hi" ? "क्षमा करें, मुझे ऑफ़लाइन रिकॉर्ड में कोई मिलान नहीं मिला।" : "I couldn't find a direct match in our offline records.",
                                isOffline: true 
                              }]);
                            }
                            setIsTyping(false);
                          }, 600);
                          return;
                        }

                        try {
                          const { text, isOffline: offline } = await generateElectionResponse(q, language);
                          if (offline) {
                            setIsOffline(true);
                            setMessages((prev) => [...prev, { 
                              type: "bot", 
                              text: language === "hi" 
                                ? "**नोट: मानक एआई अनुपलब्ध है। आधिकारिक ऑफ़लाइन रिकॉर्ड पर स्विच किया गया।**" 
                                : "**Note: Standard AI is unavailable. Switched to Official Offline Records.**",
                              isOffline: true,
                              isOfflineAlert: true
                            }]);
                          } else {
                            await incrementGlobalStats();
                            setMessages((prev) => [...prev, { type: "bot", text, isOffline: false }]);
                          }
                          setIsTyping(false);
                        } catch (error) {
                          console.error("AI service failure on suggested question", { error: error.message });
                          setIsOffline(true);
                          setIsTyping(false);
                        }
                      }}
                      className={`shrink-0 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${isOffline ? "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white" : "border-saffron/30 bg-saffron/10 text-saffron hover:bg-saffron hover:text-white"}`}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleSend}
                className="p-4 border-t border-white/10 bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <MessageCircle size={16} className={`absolute left-4 top-[21px] -translate-y-1/2 pointer-events-none transition-colors ${isOffline ? "text-amber-500/40" : "text-white/30"}`} />
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isOffline ? "Ask a common election question..." : t.typePlaceholder}
                      aria-label="Ask an election question"
                      rows={1}
                      className={`w-full bg-black/40 border rounded-2xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none transition-all resize-none overflow-y-auto max-h-32 leading-snug scrollbar-hide ${isOffline ? "border-amber-500/20 focus:border-amber-500/40" : "border-white/10 focus:border-white/20"}`}
                    />
                  </div>
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      aria-label="Send message to Votey"
                      className="shrink-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      {isTyping ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-saffron border-t-transparent rounded-full"
                        />
                      ) : (
                        <Send size={16} className={isOffline ? "text-amber-500" : "text-saffron"} />
                      )}
                    </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-[200] group"
          >
            <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isOffline ? "bg-amber-900/80 border-amber-500/30" : "bg-black/80 border-white/10"}`}>
              {isOffline ? "Search Official Records" : "Ask Votey AI"}
            </div>
            
            <motion.button
              onClick={() => setIsOpen(true)}
              aria-label="Open ElectED Assistant"
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#020408] border shadow-2xl flex items-center justify-center group cursor-pointer transition-all duration-300 ${isOffline ? "border-amber-500/40 shadow-amber-500/20" : "border-saffron/30 shadow-saffron/20"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${isOffline ? "bg-amber-500/10 group-hover:bg-amber-500/20" : "bg-saffron/10 group-hover:bg-saffron/20"}`} />
              
              <div className="relative">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border flex items-center justify-center overflow-hidden ${isOffline ? "border-amber-500/30" : "border-saffron/30"}`}>
                  <img
                    src={mascot}
                    alt="Votey"
                    width="56"
                    height="56"
                    loading="lazy"
                    className="w-12 h-12 md:w-14 md:h-14 relative z-10 transition-transform duration-300 group-hover:scale-110 object-contain mix-blend-screen contrast-150 brightness-110"
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 65%)' }}
                  />
                </div>
                <span className={`absolute top-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-black animate-pulse z-20 ${isOffline ? "bg-[#d97706] shadow-[0_0_10px_rgba(217,119,6,0.8)]" : "bg-india-green shadow-[0_0_10px_rgba(34,197,94,0.8)]"}`} />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
