import { useEffect, useState, useCallback } from "react";
import { fetchLatestSUVIImages } from "../../services/Solar_activity/suviApi";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const useSUVIImages = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchLatestSUVIImages();
      setData(result);
    } catch (error) {
      console.error("Failed to load SUVI images:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();

    const interval = setInterval(loadImages, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadImages]);

  return {
    images: data,
    isLoading,
    refresh: loadImages,
  };
};

export default useSUVIImages;
