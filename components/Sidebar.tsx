"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bot } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-background p-4 flex flex-col">
      <Link href={"/"}><Image src="/Logo.webp" alt="TransformiX CRM Logo" width={250} height={250} /></Link>
      <nav className="flex flex-col gap-2 flex-grow">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground"
          )}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/ai-assistant"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
            pathname === "/ai-assistant" ? "bg-muted text-primary" : "text-muted-foreground"
          )}
        >
          <Bot className="h-4 w-4" />
          AI Assistant
        </Link>
      </nav>
    </aside>
  );
}
