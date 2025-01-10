"use client";

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import useConfigStore from "@/store/config";
import AdminLayout from "@/components/Layouts/AdminLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, setLoading } = useConfigStore();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AdminLayout>{loading ? <Loader /> : children}</AdminLayout>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}