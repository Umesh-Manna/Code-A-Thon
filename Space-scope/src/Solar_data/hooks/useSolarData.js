// src/Solar_data/hooks/useSolarData.js

import { useEffect, useState } from "react";
import api from "../services/api";

export default function useSolarData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    api.get(endpoint)
      .then((res) => {
        if (active) setData(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
