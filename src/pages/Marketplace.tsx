"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Plus, MagnifyingGlass, MapPin, X, Phone, Storefront } from "@phosphor-icons/react";
import { IMAGES } from "@/constants";

interface MarketplaceProps { farmState: any; t: Record<string, any>; }

export function Marketplace({ farmState, t }: MarketplaceProps) {
  const { marketListings, addListing } = farmState;
  const [filter, setFilter] = useState<"all" | "sell" | "buy">("all");
  const [search, setSearch] = useState("");
  const [showPostListing, setShowPostListing] = useState(false);
  const [postCropName, setPostCropName] = useState("");
  const [postQuantity, setPostQuantity] = useState("");
  const [postUnit, setPostUnit] = useState("kg");
  const [postPrice, setPostPrice] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postSellerName, setPostSellerName] = useState("");
  const [postType, setPostType] = useState<"sell" | "buy">("sell");

  const filteredListings = useMemo(() => {
    let listings = marketListings;
    if (filter !== "all") listings = listings.filter((l: any) => l.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      listings = listings.filter((l: any) => l.cropName.toLowerCase().includes(q) || l.location.toLowerCase().includes(q) || l.sellerName.toLowerCase().includes(q));
    }
    return listings;
  }, [marketListings, filter, search]);

  const handlePostListing = () => {
    if (!postCropName.trim() || !postQuantity || !postPrice || !postLocation.trim() || !postSellerName.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    addListing({ cropName: postCropName.trim(), quantity: parseInt(postQuantity), unit: postUnit, price: parseInt(postPrice), currency: "NGN", location: postLocation.trim(), sellerName: postSellerName.trim(), imageUrl: IMAGES.marketplace, type: postType });
    setShowPostListing(false);
    setPostCropName(""); setPostQuantity(""); setPostPrice(""); setPostLocation(""); setPostSellerName("");
    toast.success(t.marketplace.listingPosted);
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.marketplace.title}</h1><p className="text-zinc-400 text-sm mt-1">{t.marketplace.subtitle}</p></div>
        <button onClick={() => setShowPostListing(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"><Plus weight="bold" className="w-4 h-4" />{t.marketplace.postListing}</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass weight="regular" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.marketplace.searchPlaceholder} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {[
            { key: "all", label: t.common.all },
            { key: "sell", label: t.marketplace.sell },
            { key: "buy", label: t.marketplace.buy },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key as any)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${filter === f.key ? "bg-emerald-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>{f.label}</button>
          ))}
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <p className="text-zinc-500 text-sm py-16 text-center">{t.marketplace.noListings}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredListings.map((listing: any, i: number) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.4 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={listing.imageUrl} alt={listing.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${listing.type === "sell" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"}`}>{listing.type === "sell" ? t.marketplace.sell : t.marketplace.buy}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2"><h3 className="text-sm font-bold">{listing.cropName}</h3><span className="text-base font-bold text-emerald-400">{formatPrice(listing.price)}</span></div>
                <p className="text-xs text-zinc-500">{listing.quantity} {listing.unit} {t.marketplace.perUnit} {formatPrice(Math.round(listing.price / listing.quantity))}/{listing.unit}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><MapPin weight="regular" className="w-3 h-3" />{listing.location}</span>
                  <span className="flex items-center gap-1"><Storefront weight="regular" className="w-3 h-3" />{listing.sellerName}</span>
                </div>
                <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"><Phone weight="fill" className="w-4 h-4" />{t.marketplace.contact}</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showPostListing && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowPostListing(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{t.marketplace.postListing}</h2><button onClick={() => setShowPostListing(false)} className="p-1 rounded-lg hover:bg-zinc-800"><X weight="regular" className="w-5 h-5" /></button></div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button onClick={() => setPostType("sell")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${postType === "sell" ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-400"}`}>{t.marketplace.sell}</button>
                    <button onClick={() => setPostType("buy")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${postType === "buy" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400"}`}>{t.marketplace.buy}</button>
                  </div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.marketplace.cropName}</label><input value={postCropName} onChange={(e) => setPostCropName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Roma Tomatoes" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.marketplace.quantity}</label><input type="number" value={postQuantity} onChange={(e) => setPostQuantity(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="100" /></div>
                    <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Unit</label><select value={postUnit} onChange={(e) => setPostUnit(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"><option>kg</option><option>bundles</option><option>packets</option><option>bags</option><option>tons</option></select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.marketplace.price} (NGN)</label><input type="number" value={postPrice} onChange={(e) => setPostPrice(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="35000" /></div>
                    <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.marketplace.location}</label><input value={postLocation} onChange={(e) => setPostLocation(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Abeokuta, Ogun" /></div>
                  </div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.marketplace.seller}</label><input value={postSellerName} onChange={(e) => setPostSellerName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Ogun Fresh Farms" /></div>
                  <button onClick={handlePostListing} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors">{t.marketplace.postListing}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
