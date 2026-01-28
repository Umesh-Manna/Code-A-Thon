const BASE_URL = "http://127.0.0.1:8000";

export const fetchMoonNow = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/moon/now?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Failed to fetch moon data");
  return res.json();
};

export const fetchLunarEclipse = async () => {
  const res = await fetch(`${BASE_URL}/moon/eclipse`);
  if (!res.ok) throw new Error("Failed to fetch eclipse data");
  return res.json();
};
