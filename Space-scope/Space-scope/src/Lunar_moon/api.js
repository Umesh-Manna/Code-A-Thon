const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// const BASE_URL = "http://localhost:8000";

export async function fetchMoonNow(lat, lon) {
  const res = await fetch(`${BASE_URL}/moon/now?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Moon fetch failed");
  return res.json();
}

export async function fetchLunarEclipse() {
  const res = await fetch(`${BASE_URL}/moon/eclipse`);
  if (!res.ok) throw new Error("Eclipse fetch failed");
  return res.json();
}
  