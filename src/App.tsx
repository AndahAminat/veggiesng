"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plant, ChatTeardropDots, GraduationCap, Storefront, PiggyBank,
  House, Globe, X, List, CaretDown,
} from "@phosphor-icons/react";
import { useT } from "@/hooks/useT";
import { useFarmState } from "@/hooks/useFarmState";
import { BRAND_NAME } from "@/constants";
import type { Locale } from "@/constants";
import { Dashboard } from "@/pages/Dashboard";
import { AIAssistant } from "@/pages/AIAssistant";
import { Learning } from "@/pages/Learning";
import { Marketplace } from "@/pages/Marketplace";
import { FinanceCommunity } from "@/pages/FinanceCommunity";

type Tab = "dashboard" | "ai" | "academy" | "marketplace" | "finance";

const TABS: { key: Tab; icon: typeof House; labelKey: "dashboard" | "aiAdvisor" | "academy" | "marketplace" | "finance" }[] = [
  { key: "dashboard", icon: House, labelKey: "dashboard" },
  { key: "ai", icon: ChatTeardropDots, labelKey: "aiAdvisor" },
  { key: "academy", icon: GraduationCap, labelKey: "academy" },
  { key: "marketplace", icon: Storefront, labelKey: "marketplace" },
  { key: "finance", icon: PiggyBank, labelKey: "finance" },
];

const LOCALE_FLAGS: Record<Locale, string> = { en: "EN", yo: "YO", ha: "HA", ig: "IG" };

export default function App() {
  const { t, locale, setLocale } = useT();
  const farmState = useFarmState();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);

  const navLabels = t.nav as Record<string, string>;

  const page = useMemo(() => {
    switch (activeTab) {
      case "dashboard": return <Dashboard farmState={farmState} t={t} />;
      case "ai": return <AIAssistant farmState={farmState} t={t} />;
      case "academy": return <Learning t={t} />;
      case "marketplace": return <Marketplace farmState={farmState} t={t} />;
      case "finance": return <FinanceCommunity farmState={farmState} t={t} />;
    }
  }, [activeTab, farmState, t]);

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Plant weight="fill" className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-base tracking-tight">{BRAND_NAME}</span>
              <span className="text-[10px] text-zinc-500 block leading-none tracking-wide">{t.tagline}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-0.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon weight={isActive ? "fill" : "regular"} className="w-4 h-4" />
                  <span>{navLabels[tab.labelKey]}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLocaleDropdownOpen(!localeDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              >
                <Globe weight="regular" className="w-3.5 h-3.5" />
                {LOCALE_FLAGS[locale]}
                <CaretDown weight="regular" className="w-3 h-3" />
              </button>
              {localeDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLocaleDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-1 z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[100px]"
                  >
                    {(Object.keys(LOCALE_FLAGS) as Locale[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l); setLocaleDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${locale === l ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"}`}
                      >
                        {LOCALE_FLAGS[l]}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-zinc-800/60"
            >
              <div className="px-4 py-3 flex flex-col gap-0.5">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => { setActiveTab(tab.key); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Icon weight={isActive ? "fill" : "regular"} className="w-5 h-5" />
                      {navLabels[tab.labelKey]}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Plant weight="fill" className="w-4 h-4 text-emerald-600" />
            <span>{BRAND_NAME}</span>
            <span className="text-zinc-700">|</span>
            <span>{t.tagline}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <span>&copy; {new Date().getFullYear()} {BRAND_NAME}</span>
            <span>hello@farmsmart.ai</span>
          </div>
        </div>
      </footer>

      <nav className="md:hidden sticky bottom-0 z-50 border-t border-zinc-800/60 bg-zinc-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg min-w-[52px] transition-colors ${isActive ? "text-emerald-400" : "text-zinc-500"}`}
              >
                <Icon weight={isActive ? "fill" : "regular"} className="w-5 h-5" />
                <span className="text-[10px] font-medium leading-none">{navLabels[tab.labelKey]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
