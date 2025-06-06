import type React from "react"
import { AppNavbar } from "@/components/app-navbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      {/* Subtle background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Pink blob */}
        <div
          className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-pink-200/20 blur-[100px] animate-pulse"
          style={{ animationDuration: "15s" }}
        ></div>

        {/* Purple blob */}
        <div
          className="absolute bottom-[15%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-purple-300/15 blur-[120px] animate-pulse"
          style={{ animationDuration: "20s" }}
        ></div>

        {/* Gold/blush blob */}
        <div
          className="absolute top-[40%] right-[20%] w-[20vw] h-[20vw] rounded-full bg-amber-200/10 blur-[80px] animate-pulse"
          style={{ animationDuration: "25s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <AppNavbar />
        {children}
      </div>
    </div>
  )
}
// The error might be coming from this file as well, but I don't see any form elements with value props here
// The layout file looks good

