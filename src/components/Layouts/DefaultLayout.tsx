"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BlogSvg, PortfolioSvg, ReviewSvg } from "@/assets/svgs";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuGroups = [
    {
      name: "MAIN MENU",
      menuItems: [
        {
          label: "Blog",
          route: "/dashboard/blog",
          icon: BlogSvg,
        },
        {
          icon: PortfolioSvg,
          label: "Portfolio",
          route: "/dashboard/portfolio",
        },
        {
          icon: ReviewSvg,
          label: "Review",
          route: "/dashboard/review",
        },
      ],
    },
  ];
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuGroups}
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
