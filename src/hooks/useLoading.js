// src/hooks/useLoading.js
"use client";

import { useState, useCallback } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const withLoading = useCallback(
    async (asyncFunction) => {
      startLoading();
      try {
        const result = await asyncFunction();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    loading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
