import { useState } from "react";
import Icon from "@/components/ui/icon";
import LoginPage from "@/pages/LoginPage";
import { HomePage, SearchPage, ProfilePage, HelpPage } from "@/pages/AppPages";
import { NAV_ITEMS } from "@/types";
import type { Page, Officer } from "@/types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [officer, setOfficer] = useState<Officer | null>(null);

  if (!officer) {
    return <LoginPage onLogin={setOfficer} />;
  }

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} />;
      case "search": return <SearchPage />;
      case "profile": return <ProfilePage />;
      case "help": return <HelpPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="header-official sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 text-lg">🦅</div>
            <div>
              <div className="text-xs text-white/60 leading-none font-mono-data uppercase tracking-wider">АИС</div>
              <div className="text-sm font-bold text-white leading-tight tracking-wide">РОЗЫСК</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                  page === item.id
                    ? "bg-white/15 text-white"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs font-mono-data">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              {officer.uid}
            </div>
            <button onClick={() => setOfficer(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors" title="Выйти">
              <Icon name="LogOut" size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <div className="mb-4 text-xs text-muted-foreground font-mono-data flex items-center gap-2">
          <Icon name="ChevronRight" size={12} />
          {NAV_ITEMS.find(n => n.id === page)?.label}
        </div>
        {renderPage()}
      </main>

      <nav className="md:hidden sticky bottom-0 border-t border-border bg-white/95 backdrop-blur-sm z-40">
        <div className="flex">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                page === item.id ? "text-blue-700" : "text-muted-foreground"
              }`}
            >
              <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
