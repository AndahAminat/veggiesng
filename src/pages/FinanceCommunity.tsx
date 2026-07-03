"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  PiggyBank, Wallet, Plus, X, ArrowUp, ArrowDown,
  Users, ChatTeardropDots, ThumbsUp, PaperPlaneTilt,
} from "@phosphor-icons/react";
import { IMAGES } from "@/constants";

interface FinanceCommunityProps { farmState: any; t: Record<string, any>; }

export function FinanceCommunity({ farmState, t }: FinanceCommunityProps) {
  const { financeRecords, communityPosts, addFinanceRecord, addCommunityPost, upvotePost, balance, totalIncome, totalExpenses } = farmState;
  const [activeTab, setActiveTab] = useState<"finance" | "community">("finance");

  // Finance form
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [recordType, setRecordType] = useState<"income" | "expense" | "loan" | "savings">("income");
  const [recordAmount, setRecordAmount] = useState("");
  const [recordLabel, setRecordLabel] = useState("");

  // Community form
  const [showNewPost, setShowNewPost] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handleAddRecord = () => {
    if (!recordAmount || !recordLabel.trim()) { toast.error("Please fill all fields"); return; }
    addFinanceRecord({ type: recordType, amount: parseInt(recordAmount), label: recordLabel.trim() });
    setShowAddRecord(false);
    setRecordAmount(""); setRecordLabel("");
    toast.success(t.finance.recordAdded);
  };

  const handlePost = () => {
    if (!postContent.trim()) return;
    addCommunityPost({ author: "You", avatarUrl: IMAGES.expert2, content: postContent.trim(), tags: [] });
    setShowNewPost(false);
    setPostContent("");
    toast.success(t.community.postSuccess);
  };

  const formatNGN = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.finance.title}</h1>
        <p className="text-zinc-400 text-sm mt-1">{t.finance.subtitle}</p>
      </div>

      <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 w-fit">
        <button onClick={() => setActiveTab("finance")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "finance" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><Wallet weight="fill" className="w-4 h-4" />{t.finance.overview}</button>
        <button onClick={() => setActiveTab("community")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "community" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><Users weight="fill" className="w-4 h-4" />{t.community.title}</button>
      </div>

      {activeTab === "finance" && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: t.finance.totalBalance, value: formatNGN(balance), icon: PiggyBank, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: t.finance.income, value: formatNGN(totalIncome), icon: ArrowUp, color: "text-green-400", bg: "bg-green-500/10" },
              { label: t.finance.expenses, value: formatNGN(totalExpenses), icon: ArrowDown, color: "text-red-400", bg: "bg-red-500/10" },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}><card.icon weight="fill" className={`w-5 h-5 ${card.color}`} /></div>
                <p className="text-2xl font-bold tracking-tight">{card.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{card.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Add Record */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Transactions</h3>
            <button onClick={() => setShowAddRecord(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"><Plus weight="bold" className="w-3.5 h-3.5" />{t.finance.addRecord}</button>
          </div>

          {financeRecords.length === 0 ? (
            <p className="text-zinc-500 text-sm py-8 text-center">{t.finance.noRecords}</p>
          ) : (
            <div className="space-y-2">
              {financeRecords.slice(0, 10).map((r: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/60 rounded-xl p-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${r.type === "income" ? "bg-green-500/10" : r.type === "expense" ? "bg-red-500/10" : r.type === "loan" ? "bg-amber-500/10" : "bg-blue-500/10"}`}>
                    {r.type === "income" ? <ArrowUp weight="fill" className="w-4 h-4 text-green-400" /> : r.type === "expense" ? <ArrowDown weight="fill" className="w-4 h-4 text-red-400" /> : <PiggyBank weight="fill" className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.label}</p>
                    <p className="text-xs text-zinc-500">{r.type} - {new Date(r.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-bold ${r.type === "income" ? "text-green-400" : r.type === "expense" ? "text-red-400" : "text-zinc-400"}`}>{r.type === "income" ? "+" : r.type === "expense" ? "-" : ""}{formatNGN(r.amount)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Loan Eligibility */}
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">{t.finance.loanEligibility}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Based on your farm records and financial history</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-bold ${totalIncome > 100000 ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}>{totalIncome > 100000 ? t.finance.eligible : t.finance.notEligible}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "community" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2"><ChatTeardropDots weight="fill" className="w-4 h-4 text-emerald-500" />{t.community.title}</h3>
            <button onClick={() => setShowNewPost(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"><Plus weight="bold" className="w-3.5 h-3.5" />{t.community.newPost}</button>
          </div>

          {communityPosts.length === 0 ? (
            <p className="text-zinc-500 text-sm py-16 text-center">{t.community.noPosts}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {communityPosts.map((post: any, i: number) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={post.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div><p className="text-sm font-semibold">{post.author}</p><p className="text-xs text-zinc-500">{new Date(post.createdAt).toLocaleDateString()}</p></div>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">{post.content}</p>
                  {post.tags.length > 0 && (
                    <div className="flex gap-1.5 mb-4">
                      {post.tags.map((tag: string, j: number) => (
                        <span key={j} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-500">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
                    <button onClick={() => upvotePost(post.id)} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"><ThumbsUp weight="fill" className="w-3.5 h-3.5" />{post.upvotes}</button>
                    <span className="text-xs text-zinc-600">{post.replies} {t.community.replies}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Finance Record Modal */}
      <AnimatePresence>
        {showAddRecord && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowAddRecord(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{t.finance.addRecord}</h2><button onClick={() => setShowAddRecord(false)} className="p-1 rounded-lg hover:bg-zinc-800"><X weight="regular" className="w-5 h-5" /></button></div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["income", "expense", "loan", "savings"] as const).map((t) => (
                        <button key={t} onClick={() => setRecordType(t)} className={`py-2 rounded-lg text-xs font-medium transition-colors capitalize ${recordType === t ? (t === "income" ? "bg-green-600 text-white" : t === "expense" ? "bg-red-600 text-white" : t === "loan" ? "bg-amber-600 text-white" : "bg-blue-600 text-white") : "bg-zinc-800 text-zinc-400"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Amount (NGN)</label><input type="number" value={recordAmount} onChange={(e) => setRecordAmount(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="50000" /></div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Description</label><input value={recordLabel} onChange={(e) => setRecordLabel(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Tomato harvest sale" /></div>
                  <button onClick={handleAddRecord} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors">{t.common.save}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowNewPost(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{t.community.newPost}</h2><button onClick={() => setShowNewPost(false)} className="p-1 rounded-lg hover:bg-zinc-800"><X weight="regular" className="w-5 h-5" /></button></div>
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder={t.community.postPlaceholder} rows={4} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none" />
                <button onClick={handlePost} disabled={!postContent.trim()} className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"><PaperPlaneTilt weight="fill" className="w-4 h-4" />{t.community.post}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
