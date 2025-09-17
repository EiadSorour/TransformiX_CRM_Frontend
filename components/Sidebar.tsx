"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bot, LayoutDashboard, ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? '80px' : '256px'
    );
  }, [isCollapsed]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 border-r bg-background p-4 flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Link href={"/"}>
        <Image
          src="/Logo.webp"
          alt="TransformiX CRM Logo"
          width={isCollapsed ? 40 : 250}
          height={isCollapsed ? 40 : 250}
          className={isCollapsed ? "mx-auto mb-4" : "mb-4"}
        />
      </Link>
      <nav className="flex flex-col gap-2 flex-grow">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Home className="h-4 w-4" />
          {!isCollapsed && "Home"}
        </Link>
        <Link
          href="/ai-assistant"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/ai-assistant" ? "bg-muted text-primary" : "text-muted-foreground",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Bot className="h-4 w-4" />
          {!isCollapsed && "AI Assistant"}
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          {!isCollapsed && "Dashboard"}
        </Link>
        <Link
          href="/pattern-analysis"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/pattern-analysis" ? "bg-muted text-primary" : "text-muted-foreground",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <ChartNoAxesCombined className="h-4 w-4" />
          {!isCollapsed && "Pattern Analysis"}
        </Link>
      </nav>
    </aside>
  );
}
