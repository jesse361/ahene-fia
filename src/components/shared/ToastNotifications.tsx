"use client";

import { Toaster } from "sonner";

export function ToastNotifications() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#10151B",
          color: "#F7F3EA",
          border: "1px solid rgba(214, 173, 96, 0.45)",
          fontFamily: "inherit",
        },
      }}
    />
  );
}
