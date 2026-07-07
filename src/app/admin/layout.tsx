"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, ClipboardList, BotMessageSquare, Bell, UserCircle } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Menu Management", href: "/admin/menu", icon: UtensilsCrossed },
  { name: "Orders Logs", href: "/admin/orders", icon: ClipboardList },
  { name: "AI Chatbot Settings", href: "/admin/chatbot", icon: BotMessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="font-serif font-bold text-xl text-primary flex items-center gap-2">
            Dapoer <span className="text-secondary">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          <div className="text-sm text-foreground/60 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-foreground/60 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
              <UserCircle className="w-8 h-8 text-primary" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">Admin User</p>
                <p className="text-xs text-foreground/60">Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
