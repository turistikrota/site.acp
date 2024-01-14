import { useEffect, useState } from "react";
import { httpClient } from "~/http/client";

export const useQuery = (url, opts = { cache: false, withSSR: undefined, headers: undefined }) => {
  const [data, setData] = useState(opts.withSSR || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = (url, skipCache = false) => {
    let cached = false;
    setIsLoading(true);
    if (!skipCache && typeof window !== "undefined") {
      const cacheData = localStorage.getItem(url);
      if (cacheData) {
        const cacheEntity = JSON.parse(cacheData);
        if (cacheEntity.expiresAt > Date.now()) {
          cached = true;
          setData(cacheEntity.data);
          setIsLoading(false);
          return;
        }
      }
    }
    if (cached) return;
    let promise;
    if (opts && opts.method === "POST") {
      promise = httpClient.post(url, opts.params, opts.headers ? { headers: opts.headers } : undefined);
    } else {
      promise = httpClient.get(url, opts.headers ? { headers: opts.headers } : undefined);
    }
    promise
      .then((res) => {
        setData(res.data);
        if (opts.cache && typeof window !== "undefined") {
          const cacheEntity = {
            data: res.data,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24,
          };
          localStorage.setItem(url, JSON.stringify(cacheEntity));
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setError(err.response.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (opts.withSSR) return;
    fetcher(url, opts.cache);
  }, [url]);

  return {
    data,
    isLoading,
    error,
    refetch: () => fetcher(url, true),
  };
};
