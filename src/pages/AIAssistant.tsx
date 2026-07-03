"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatTeardropDots, Scan, PaperPlaneTilt, Robot, Camera,
  CheckCircle, Warning, Flask, ArrowRight,
} from "@phosphor-icons/react";
import { PEST_DATABASE, IMAGES } from "@/constants";

interface AIAssistantProps { farmState: any; t: Record<string, any>; }

type Message = { role: "user" | "assistant"; content: string; id: string };

const QUICK_PROMPTS = ["When should I water my tomatoes?", "Best fertilizer for peppers?", "How to control aphids?", "When to harvest spinach?", "Ideal spacing for okra?"];

const AI_RESPONSES: Record<string, string> = {
  water: "Based on current conditions, I recommend watering your vegetables every 2-3 days during dry season. Early morning is best to minimize evaporation. Check soil moisture by pressing a finger 2cm into the soil - if it feels dry, it is time to water.",
  fertilizer: "For tomatoes and peppers, apply NPK 15-15-15 at planting and side-dress with nitrogen-rich fertilizer when flowering begins. Organic alternatives include well-rotted poultry manure or compost tea applied every 2 weeks.",
  pest: "Common pests in Nigerian vegetable farms include aphids, whiteflies, and tomato leaf miner. I recommend regular scouting, neem oil spray as organic control, and crop rotation to break pest cycles.",
  harvest: "Harvest spinach when leaves reach 10-15cm, usually 35-45 days after planting. Pick outer leaves first and allow the center to keep producing. Harvest early morning for best quality and shelf life.",
  spacing: "For okra, space plants 30-45cm apart in rows 60-90cm apart. This allows good air circulation and easy harvesting. Thin seedlings to the strongest plant per stand when they reach 10cm tall.",
};

function findResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("water") || q.includes("irrigation")) return AI_RESPONSES.water;
  if (q.includes("fertilizer") || q.includes("manure") || q.includes("npk")) return AI_RESPONSES.fertilizer;
  if (q.includes("pest") || q.includes("aphid") || q.includes("insect")) return AI_RESPONSES.pest;
  if (q.includes("harvest") || q.includes("pick") || q.includes("ready")) return AI_RESPONSES.harvest;
  if (q.includes("spac") || q.includes("distance") || q.includes("okra")) return AI_RESPONSES.spacing;
  return "That is a great question. For the most accurate advice, I would need to know your specific crop type, location, and current growing stage. Could you share more details?";
}

export function AIAssistant({ farmState, t }: AIAssistantProps) {
  const { addDiagnosis, diagnostics } = farmState;
  const [activeMode, setActiveMode] = useState<"chat" | "scanner">("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am your FarmSmart AI assistant. Ask me anything about crop management, pest control, irrigation, or soil health.", id: "init" },
  ]);
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<(typeof PEST_DATABASE)[0] | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim(), id: `msg-${Date.now()}` };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = { role: "assistant", content: findResponse(input.trim()), id: `msg-${Date.now()}-ai` };
      setMessages((prev) => [...prev, aiMsg]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 600);
  };

  const handleScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const result = PEST_DATABASE[Math.floor(Math.random() * PEST_DATABASE.length)];
      setScanResult(result);
      addDiagnosis(result);
      setScanning(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.ai.title}</h1><p className="text-zinc-400 text-sm mt-1">{t.ai.subtitle}</p></div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
          <button onClick={() => setActiveMode("chat")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMode === "chat" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><ChatTeardropDots weight="fill" className="w-4 h-4" />{t.ai.chat}</button>
          <button onClick={() => setActiveMode("scanner")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMode === "scanner" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><Scan weight="fill" className="w-4 h-4" />{t.ai.scanner}</button>
        </div>
      </div>

      {activeMode === "chat" && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden">
            <div className="h-[450px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-md" : "bg-zinc-800 text-zinc-200 rounded-bl-md"}`}>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1"><Robot weight="fill" className="w-3.5 h-3.5 text-emerald-400" /><span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">FarmSmart AI</span></div>
                    )}
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} onClick={() => setInput(prompt)} className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors">{prompt}</button>
              ))}
            </div>
            <div className="border-t border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder={t.ai.askQuestion} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                <button onClick={handleSend} disabled={!input.trim()} className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl transition-colors"><PaperPlaneTilt weight="fill" className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMode === "scanner" && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6">
            <div className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-800 border-2 border-dashed ${scanning ? "border-emerald-500" : "border-zinc-700"} flex items-center justify-center cursor-pointer group transition-colors`} onClick={() => !scanning && !scanResult && handleScan()}>
              <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.diseaseBlight})` }} />
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.diseaseAphid})` }} />
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.cropTomato})` }} />
              </div>
              {scanning && (
                <motion.div className="absolute inset-0 z-10" initial={{ background: "transparent" }} animate={{ background: "rgba(16, 185, 129, 0.08)" }}>
                  <motion.div className="absolute left-0 right-0 h-1 bg-emerald-500/60" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                  <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-emerald-500/40" animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
                </motion.div>
              )}
              {!scanning && !scanResult && (
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Camera weight="regular" className="w-12 h-12 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{t.ai.dragDrop}</p>
                  <span className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl">{t.ai.startScan}</span>
                </div>
              )}
              {scanning && <p className="relative z-20 text-emerald-400 font-medium text-sm">{t.ai.scanning}</p>}
            </div>

            <AnimatePresence>
              {scanResult && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    {scanResult.severityKey.includes("Mild") ? <CheckCircle weight="fill" className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Warning weight="fill" className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />}
                    <div><h3 className="text-base font-bold">{scanResult.nameKey}</h3><p className="text-xs text-zinc-500 mt-0.5">Severity: {scanResult.severityKey} - Confidence: 87%</p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-zinc-900/50 rounded-lg p-3"><p className="text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5"><Warning weight="fill" className="w-3 h-3 text-amber-400" />Symptoms</p><p className="text-xs text-zinc-300 leading-relaxed">{scanResult.symptomsKey}</p></div>
                    <div className="bg-zinc-900/50 rounded-lg p-3"><p className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5"><Flask weight="fill" className="w-3 h-3" />{t.ai.treatment}</p><p className="text-xs text-zinc-300 leading-relaxed">{scanResult.treatmentKey}</p></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => { setScanResult(null); handleScan(); }} className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors">Scan Another Leaf</button>
                    <button onClick={() => setScanResult(null)} className="px-4 py-2.5 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm font-medium rounded-xl transition-colors">{t.common.close}</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {diagnostics.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Recent Scans</h3>
              <div className="space-y-2">
                {diagnostics.slice(0, 5).map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/60 rounded-xl p-3">
                    <img src={d.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{d.nameKey}</p><p className="text-xs text-zinc-500">{d.severityKey}</p></div>
                    <ArrowRight weight="regular" className="w-4 h-4 text-zinc-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
