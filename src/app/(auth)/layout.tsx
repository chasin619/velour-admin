"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import useConfigStore from "@/store/config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setLoading, loading } = useConfigStore();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {loading ? <Loader /> : children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
