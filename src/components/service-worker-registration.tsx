"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/service-worker.js").catch((error) => {
      console.error("Falha ao registrar service worker", error);
    });
  }, []);

  return null;
}
