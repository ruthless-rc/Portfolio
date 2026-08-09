import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Bot, Sparkles, User, MessageSquare } from 'lucide-react';
import { personalInfo, projects, skillCategories, heroStats } from '../data/portfolioData';

const QUICK_PROMPTS = [
  "🚀 Tell me about Rishi's Top Projects",
  "⚡ What are Rishi's core skills?",
  "🎓 Where does Rishi study?",
  "📧 How can I get in touch with Rishi?"
];

export default function AIChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Greetings! I'm Rishi's AI Portfolio Companion 🤖. Ask me anything about Rishi's background, engineering projects, or skills!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('work') || q.includes('build')) {
      const topProjects = projects.slice(0, 3).map(p => `• ${p.title} (${p.category}): ${p.description}`).join('\n');
      return `Rishi has built high-impact systems across IoT, Web, AI, and Software Engineering!\n\nHere are a few flagship projects:\n${topProjects}`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) {
      return `Rishi specializes in:\n• Languages: C, C++, Python, JavaScript, Java, HTML/CSS\n• Web & Mobile: React, Node.js, Express, Tailwind CSS, REST APIs\n• Hardware & IoT: ESP32, Arduino, Sensors, Circuit Design\n• Core CS: Data Structures, OOP, Database Management, Git`;
    }

    if (q.includes('college') || q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('gpa')) {
      return `Rishi is pursuing his B.E. in Computer Science Engineering (2023–2027) at Shree Swaminarayan Institute of Technology, Ahmedabad, affiliated with Gujarat Technological University (GTU).`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone')) {
      return `You can reach Rishi directly via:\n📧 Email: rishimadeforindia@gmail.com\n📞 Phone: +91 93139 53282\n📍 Location: Ahmedabad, Gujarat, India\n🔗 LinkedIn: ${personalInfo.socials.linkedin}`;
    }

    if (q.includes('who') || q.includes('about') || q.includes('bio') || q.includes('rishi')) {
      return `Rishi Choudhary is a passionate CS & Robotics Engineer focused on building software solutions, intelligent algorithms, and IoT embedded hardware. He is also active in campus event management and technical club leadership!`;
    }

    return `That's a great question! Rishi is a Computer Science & Engineering student at SSIT (2023-2027) passionate about software engineering, IoT systems, and robotics. Feel free to explore his projects below or contact him at rishimadeforindia@gmail.com!`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 w-[92vw] sm:w-[420px] max-h-[85vh] h-[550px] z-50 flex flex-col bg-zinc-950/95 backdrop-blur-2xl border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto select-text"
    >
      {/* Header */}
      <div className="px-5 py-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white leading-tight">Rishi's AI Companion</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-zinc-400">Online • Ready to assist</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
              msg.sender === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-white border border-zinc-700'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-md ${
              msg.sender === 'user'
                ? 'bg-white text-black font-medium rounded-tr-none'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1 text-right ${
                msg.sender === 'user' ? 'text-zinc-500' : 'text-zinc-500'
              }`}>
                {msg.timestamp}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs px-2">
            <Bot className="w-4 h-4 animate-bounce text-white" />
            <span>AI Companion is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-white text-[10px] font-medium whitespace-nowrap transition-all shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI assistant about Rishi..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-bold transition-all shrink-0 shadow-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
