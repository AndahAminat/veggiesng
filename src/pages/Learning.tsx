"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Users, MagnifyingGlass, Clock, ArrowRight,
  CheckCircle, Phone,
} from "@phosphor-icons/react";
import { DEFAULT_GUIDES, DEFAULT_EXPERTS } from "@/constants";

interface LearningProps { t: Record<string, any>; }

type GuideTab = "All" | "Basics" | "Pest Control" | "Irrigation" | "Soil Health" | "Harvest";
const GUIDE_TABS: GuideTab[] = ["All", "Basics", "Pest Control", "Irrigation", "Soil Health", "Harvest"];

export function Learning({ t }: LearningProps) {
  const [activeTab, setActiveTab] = useState<"guides" | "experts">("guides");
  const [guideFilter, setGuideFilter] = useState<GuideTab>("All");
  const [search, setSearch] = useState("");
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const filteredGuides = useMemo(() => {
    let guides = DEFAULT_GUIDES;
    if (guideFilter !== "All") guides = guides.filter((g) => g.categoryKey === guideFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      guides = guides.filter((g) => g.titleKey.toLowerCase().includes(q) || g.contentKey.toLowerCase().includes(q));
    }
    return guides;
  }, [guideFilter, search]);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.academy.title}</h1><p className="text-zinc-400 text-sm mt-1">{t.academy.subtitle}</p></div>

      <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 w-fit">
        <button onClick={() => setActiveTab("guides")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "guides" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><BookOpen weight="fill" className="w-4 h-4" />{t.academy.guides}</button>
        <button onClick={() => setActiveTab("experts")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "experts" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><Users weight="fill" className="w-4 h-4" />{t.academy.experts}</button>
      </div>

      {activeTab === "guides" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass weight="regular" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.common.search + "..."} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
              {GUIDE_TABS.map((tab) => (
                <button key={tab} onClick={() => setGuideFilter(tab)} className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${guideFilter === tab ? "bg-emerald-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>{tab}</button>
              ))}
            </div>
          </div>

          {filteredGuides.length === 0 ? (
            <p className="text-zinc-500 text-sm py-12 text-center">{t.academy.noGuides}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuides.map((guide, i) => (
                <motion.div key={guide.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="group bg-zinc-900 border border-zinc-800/60 hover:border-emerald-500/30 rounded-xl p-5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{guide.categoryKey}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${guide.levelKey === "Beginner" ? "bg-blue-500/10 text-blue-400" : guide.levelKey === "Intermediate" ? "bg-amber-500/10 text-amber-400" : "bg-purple-500/10 text-purple-400"}`}>{guide.levelKey}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-emerald-400 transition-colors">{guide.titleKey}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-4">{guide.contentKey}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-zinc-600"><Clock weight="regular" className="w-3 h-3" />{guide.readTimeMin} {t.academy.readTime}</span>
                    <ArrowRight weight="regular" className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "experts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEFAULT_EXPERTS.map((expert, i) => (
            <motion.div key={expert.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
              <div className="flex items-center gap-4 mb-4">
                <img src={expert.avatarUrl} alt={expert.name} className="w-14 h-14 rounded-full object-cover border-2 border-zinc-800" />
                <div><h3 className="text-sm font-bold">{expert.name}</h3><p className="text-xs text-zinc-400">{expert.roleKey}</p></div>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{expert.specialtyKey}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${expert.available ? "bg-emerald-500" : "bg-zinc-600"}`} />
                <span className={`text-xs ${expert.available ? "text-emerald-400" : "text-zinc-500"}`}>{expert.available ? t.academy.available : t.academy.unavailable}</span>
              </div>
              <button disabled={!expert.available} onClick={() => setSelectedExpert(expert.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white">
                <Phone weight="fill" className="w-4 h-4" />{t.academy.consultExpert}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedExpert && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setSelectedExpert(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"><CheckCircle weight="fill" className="w-8 h-8 text-emerald-500" /></div>
                <h2 className="text-lg font-bold mb-2">Consultation Requested</h2>
                <p className="text-sm text-zinc-400 mb-4">The expert will contact you within 24 hours. You can also reach us at hello@farmsmart.ai.</p>
                <button onClick={() => setSelectedExpert(null)} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors">{t.common.close}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
