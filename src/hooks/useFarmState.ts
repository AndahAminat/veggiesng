import { useState, useCallback, useEffect } from "react";
import type {
  Farm,
  FarmCrop,
  MarketListing,
  FinancialRecord,
  CommunityPost,
  PestDiagnosis,
} from "@/constants";
import {
  LS_KEYS,
  DEFAULT_LISTINGS,
  DEFAULT_POSTS,
} from "@/constants";

// ── Generic LocalStorage Loader ──────────────────────────
function loadFromLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* corrupted data - use fallback */ }
  return fallback;
}

function saveToLS<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded - silent */ }
}

// ── Main Hook ────────────────────────────────────────────
export function useFarmState() {
  // Farms
  const [farms, setFarms] = useState<Farm[]>(() => loadFromLS<Farm[]>(LS_KEYS.farms, []));

  // Market
  const [marketListings, setMarketListings] = useState<MarketListing[]>(
    () => loadFromLS<MarketListing[]>(LS_KEYS.marketListings, DEFAULT_LISTINGS)
  );

  // Finance
  const [financeRecords, setFinanceRecords] = useState<FinancialRecord[]>(
    () => loadFromLS<FinancialRecord[]>(LS_KEYS.financeRecords, [])
  );

  // Community
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(
    () => loadFromLS<CommunityPost[]>(LS_KEYS.communityPosts, DEFAULT_POSTS)
  );

  // Diagnostics
  const [diagnostics, setDiagnostics] = useState<PestDiagnosis[]>(
    () => loadFromLS<PestDiagnosis[]>(LS_KEYS.diagnostics, [])
  );

  // Persist on change
  useEffect(() => { saveToLS(LS_KEYS.farms, farms); }, [farms]);
  useEffect(() => { saveToLS(LS_KEYS.marketListings, marketListings); }, [marketListings]);
  useEffect(() => { saveToLS(LS_KEYS.financeRecords, financeRecords); }, [financeRecords]);
  useEffect(() => { saveToLS(LS_KEYS.communityPosts, communityPosts); }, [communityPosts]);
  useEffect(() => { saveToLS(LS_KEYS.diagnostics, diagnostics); }, [diagnostics]);

  // ── Farm Actions ─────────────────────────────────────
  const addFarm = useCallback((farm: Omit<Farm, "id" | "createdAt">) => {
    const newFarm: Farm = {
      ...farm,
      id: `farm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setFarms((prev) => [...prev, newFarm]);
    return newFarm;
  }, []);

  const addCropToFarm = useCallback((farmId: string, crop: FarmCrop) => {
    setFarms((prev) =>
      prev.map((f) =>
        f.id === farmId ? { ...f, crops: [...f.crops, crop] } : f
      )
    );
  }, []);

  const logWatering = useCallback((farmId: string, cropId: string) => {
    const date = new Date().toISOString();
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id !== farmId) return f;
        return {
          ...f,
          crops: f.crops.map((c) =>
            c.cropId === cropId
              ? { ...c, waterLog: [...c.waterLog, date] }
              : c
          ),
        };
      })
    );
  }, []);

  const logFertilizer = useCallback((farmId: string, cropId: string) => {
    const date = new Date().toISOString();
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id !== farmId) return f;
        return {
          ...f,
          crops: f.crops.map((c) =>
            c.cropId === cropId
              ? { ...c, fertilizerLog: [...c.fertilizerLog, date] }
              : c
          ),
        };
      })
    );
  }, []);

  const deleteFarm = useCallback((farmId: string) => {
    setFarms((prev) => prev.filter((f) => f.id !== farmId));
  }, []);

  // ── Market Actions ───────────────────────────────────
  const addListing = useCallback((listing: Omit<MarketListing, "id" | "postedAt">) => {
    const newListing: MarketListing = {
      ...listing,
      id: `list-${Date.now()}`,
      postedAt: new Date().toISOString(),
    };
    setMarketListings((prev) => [newListing, ...prev]);
    return newListing;
  }, []);

  // ── Finance Actions ──────────────────────────────────
  const addFinanceRecord = useCallback((record: Omit<FinancialRecord, "id" | "date">) => {
    const newRecord: FinancialRecord = {
      ...record,
      id: `fin-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setFinanceRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  }, []);

  // ── Community Actions ────────────────────────────────
  const addCommunityPost = useCallback((post: Omit<CommunityPost, "id" | "upvotes" | "replies" | "createdAt">) => {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      upvotes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  const upvotePost = useCallback((postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  }, []);

  // ── Diagnostics ──────────────────────────────────────
  const addDiagnosis = useCallback((diagnosis: PestDiagnosis) => {
    setDiagnostics((prev) => [diagnosis, ...prev]);
  }, []);

  // ── Computed ─────────────────────────────────────────
  const totalIncome = financeRecords
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = financeRecords
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpenses;

  return {
    farms,
    marketListings,
    financeRecords,
    communityPosts,
    diagnostics,
    balance,
    totalIncome,
    totalExpenses,
    addFarm,
    addCropToFarm,
    logWatering,
    logFertilizer,
    deleteFarm,
    addListing,
    addFinanceRecord,
    addCommunityPost,
    upvotePost,
    addDiagnosis,
  };
}
