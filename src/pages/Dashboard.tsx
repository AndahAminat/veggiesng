"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Plant, Plus, X, Drop, Flask, Calendar, MapPin,
  ThermometerSimple, Tray, Trash, Leaf, PottedPlant, Sun,
} from "@phosphor-icons/react";
import { CROP_DATABASE, IMAGES } from "@/constants";
import type { FarmCrop } from "@/constants";

interface DashboardProps {
  farmState: any;
  t: Record<string, any>;
}

export function Dashboard({ farmState, t }: DashboardProps) {
  const { farms, addFarm, addCropToFarm, logWatering, logFertilizer, deleteFarm } = farmState;
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState<string | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<string | null>(farms[0]?.id ?? null);

  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [selectedCropId, setSelectedCropId] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [cropNotes, setCropNotes] = useState("");

  const activeFarm = useMemo(() => farms.find((f: any) => f.id === selectedFarm) ?? null, [farms, selectedFarm]);

  const gridCells = useMemo(() => Array.from({ length: 36 }, () => Math.random() > 0.55), []);

  const handleAddFarm = () => {
    if (!farmName.trim() || !farmLocation.trim()) return;
    const newFarm = addFarm({ name: farmName.trim(), location: farmLocation.trim(), sizeHectares: parseFloat(farmSize) || 1, crops: [] });
    setSelectedFarm(newFarm.id);
    setFarmName(""); setFarmLocation(""); setFarmSize("");
    setShowAddFarm(false);
    toast.success("Farm added successfully");
  };

  const handleAddCrop = (farmId: string) => {
    if (!selectedCropId) return;
    const newCrop: FarmCrop = { cropId: selectedCropId, plantedAt: new Date().toISOString(), quantity: parseInt(cropQuantity) || 50, notes: cropNotes.trim(), waterLog: [], fertilizerLog: [] };
    addCropToFarm(farmId, newCrop);
    setSelectedCropId(""); setCropQuantity(""); setCropNotes("");
    setShowAddCrop(null);
    toast.success(t.dashboard.cropRegistered);
  };

  const getCrop = (cropId: string) => CROP_DATABASE.find((c) => c.id === cropId);

  const daysSince = (dateStr: string) => Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);

  const metrics = [
    { icon: ThermometerSimple, label: t.dashboard.temperature, value: "29", unit: "deg C", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Drop, label: t.dashboard.soilMoisture, value: "64", unit: "%", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Sun, label: t.dashboard.humidity, value: "72", unit: "%", color: "text-orange-400", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.dashboard.title}</h1>
          <p className="text-zinc-400 text-sm mt-1">{t.dashboard.subtitle}</p>
        </div>
        <button onClick={() => setShowAddFarm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus weight="bold" className="w-4 h-4" />{t.dashboard.addFarm}
        </button>
      </div>

      {farms.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
            <Plant weight="fill" className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-zinc-400 text-sm max-w-sm">{t.dashboard.noFarms}</p>
        </motion.div>
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {farms.map((farm: any) => (
              <button key={farm.id} onClick={() => setSelectedFarm(farm.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFarm === farm.id ? "bg-emerald-600 text-white" : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"}`}>
                <PottedPlant weight="fill" className="w-4 h-4" />{farm.name}
              </button>
            ))}
          </div>

          {activeFarm && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-4">
                      <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
                        <m.icon weight="fill" className={`w-4 h-4 ${m.color}`} />
                      </div>
                      <p className="text-2xl font-bold tracking-tight">{m.value}<span className="text-base text-zinc-500 ml-0.5">{m.unit}</span></p>
                      <p className="text-xs text-zinc-500 mt-1">{m.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin weight="fill" className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-semibold">{t.dashboard.fieldMap}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{t.dashboard.tapToMark}</p>
                  <div className="grid grid-cols-6 gap-1.5 max-w-xs mx-auto">
                    {gridCells.map((active, i) => (
                      <div key={i} className={`aspect-square rounded-sm transition-colors cursor-pointer ${active ? "bg-emerald-600/60" : "bg-zinc-800"} hover:bg-emerald-500/40`} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                    <span>{activeFarm.location}</span><span>{activeFarm.sizeHectares} ha</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2"><Leaf weight="fill" className="w-4 h-4 text-emerald-500" />{t.dashboard.crops}</h3>
                    <button onClick={() => setShowAddCrop(activeFarm.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors">
                      <Plus weight="bold" className="w-3 h-3" />Add Crop
                    </button>
                  </div>
                  {activeFarm.crops.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-4 text-center">No crops registered for this farm yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeFarm.crops.map((crop: any, i: number) => {
                        const cd = getCrop(crop.cropId);
                        const daysOld = daysSince(crop.plantedAt);
                        const growDays = cd?.growDays ?? 70;
                        const daysRemaining = growDays - daysOld;
                        const progress = Math.min(100, Math.max(0, (daysOld / growDays) * 100));
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div><p className="text-sm font-semibold">{cd?.nameKey ?? crop.cropId}</p><p className="text-xs text-zinc-500">{crop.quantity} plants</p></div>
                              <Tray weight="fill" className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-2 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full bg-emerald-500 rounded-full" />
                            </div>
                            <div className="flex items-center justify-between text-xs text-zinc-500">
                              <span>{daysRemaining > 0 ? `${daysRemaining} days to harvest` : "Ready for harvest"}</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="flex gap-2 mt-3 pt-3 border-t border-zinc-800">
                              <button onClick={() => { logWatering(activeFarm.id, crop.cropId); toast.success(t.dashboard.wateringLogged); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors">
                                <Drop weight="fill" className="w-3 h-3" />{t.dashboard.logWatering}
                              </button>
                              <button onClick={() => { logFertilizer(activeFarm.id, crop.cropId); toast.success(t.dashboard.fertilizerLogged); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors">
                                <Flask weight="fill" className="w-3 h-3" />{t.dashboard.logFertilizer}
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.farmBanner})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3"><p className="text-sm font-bold">{activeFarm.name}</p><p className="text-xs text-zinc-300">{activeFarm.location}</p></div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-semibold flex items-center gap-2"><Calendar weight="fill" className="w-4 h-4 text-emerald-500" />Farm Details</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      [t.dashboard.location, activeFarm.location],
                      [t.dashboard.size, `${activeFarm.sizeHectares} ha`],
                      ["Crops", activeFarm.crops.length],
                      ["Registered", new Date(activeFarm.createdAt).toLocaleDateString()],
                    ].map(([label, val], i) => (
                      <div key={i} className="flex justify-between"><span className="text-zinc-500">{label}</span><span className="text-zinc-300">{val}</span></div>
                    ))}
                  </div>
                  <button onClick={() => { deleteFarm(activeFarm.id); setSelectedFarm(farms.find((f: any) => f.id !== activeFarm.id)?.id ?? null); toast.success("Farm removed"); }} className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                    <Trash weight="regular" className="w-3.5 h-3.5" />Remove Farm
                  </button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
                  {activeFarm.crops.flatMap((c: any) => [
                    ...c.waterLog.map((d: string) => ({ type: "water", crop: c.cropId, date: d })),
                    ...c.fertilizerLog.map((d: string) => ({ type: "fertilizer", crop: c.cropId, date: d })),
                  ]).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).length === 0 ? (
                    <p className="text-xs text-zinc-500 py-2">No activity yet.</p>
                  ) : (
                    activeFarm.crops.flatMap((c: any) => [
                      ...c.waterLog.map((d: string) => ({ type: "water", crop: c.cropId, date: d })),
                      ...c.fertilizerLog.map((d: string) => ({ type: "fertilizer", crop: c.cropId, date: d })),
                    ]).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((a: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 text-xs">
                        {a.type === "water" ? <Drop weight="fill" className="w-3 h-3 text-blue-400" /> : <Flask weight="fill" className="w-3 h-3 text-amber-400" />}
                        <span className="text-zinc-400">{a.type === "water" ? "Watered" : "Fertilized"} {getCrop(a.crop)?.nameKey ?? a.crop}</span>
                        <span className="text-zinc-600 ml-auto">{new Date(a.date).toLocaleDateString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showAddFarm && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowAddFarm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{t.dashboard.addFarm}</h2><button onClick={() => setShowAddFarm(false)} className="p-1 rounded-lg hover:bg-zinc-800"><X weight="regular" className="w-5 h-5" /></button></div>
                <div className="space-y-4">
                  {[
                    [t.dashboard.farmName, farmName, setFarmName, "e.g. Ogun River Tomato Field", "text"],
                    [t.dashboard.location, farmLocation, setFarmLocation, "e.g. Abeokuta, Ogun", "text"],
                  ].map(([label, val, setter, placeholder], i) => (
                    <div key={i}><label className="text-xs font-medium text-zinc-400 block mb-1.5">{label as string}</label><input value={val as string} onChange={(e) => (setter as any)(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder={placeholder as string} /></div>
                  ))}
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.dashboard.size}</label><input type="number" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="1.5" step="0.1" /></div>
                  <button onClick={handleAddFarm} disabled={!farmName.trim() || !farmLocation.trim()} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl transition-colors">{t.common.save}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddCrop && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowAddCrop(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">Add Crop</h2><button onClick={() => setShowAddCrop(null)} className="p-1 rounded-lg hover:bg-zinc-800"><X weight="regular" className="w-5 h-5" /></button></div>
                <div className="space-y-4">
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Crop Type</label><select value={selectedCropId} onChange={(e) => setSelectedCropId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"><option value="">Select a crop...</option>{CROP_DATABASE.map((c) => (<option key={c.id} value={c.id}>{c.nameKey} ({c.growDays} days)</option>))}</select></div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Quantity (plants)</label><input type="number" value={cropQuantity} onChange={(e) => setCropQuantity(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="100" /></div>
                  <div><label className="text-xs font-medium text-zinc-400 block mb-1.5">Notes</label><input value={cropNotes} onChange={(e) => setCropNotes(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Roma VF variety, north field" /></div>
                  <button onClick={() => handleAddCrop(showAddCrop)} disabled={!selectedCropId} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl transition-colors">{t.common.save}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
