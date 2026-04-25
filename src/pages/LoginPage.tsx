import { useState } from "react";
import Icon from "@/components/ui/icon";
import { AUTH_URL } from "@/types";
import type { Officer } from "@/types";

export default function LoginPage({ onLogin }: { onLogin: (officer: Officer) => void }) {
  const [tabNum, setTabNum] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tab_number: tabNum, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onLogin(data.officer);
      } else {
        setError(data.error || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, hsl(220 45% 10%) 0%, hsl(218 55% 18%) 60%, hsl(215 50% 22%) 100%)" }}>
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(210 80% 50%), hsl(200 80% 60%))" }} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-4xl mb-4 shadow-lg">
            🦅
          </div>
          <div className="text-center">
            <div className="text-xs text-white/50 font-mono-data uppercase tracking-[0.3em] mb-1">Министерство внутренних дел</div>
            <div className="text-2xl font-bold text-white tracking-wide">АИС «РОЗЫСК»</div>
            <div className="text-xs text-white/40 font-mono-data mt-1 tracking-wider">Автоматизированная информационная система</div>
          </div>
        </div>

        <div className="w-full max-w-sm animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm shadow-2xl">
            <div className="text-xs text-white/50 uppercase tracking-widest font-mono-data text-center mb-6">
              Идентификация сотрудника
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/60 uppercase tracking-wide font-mono-data block mb-1.5">
                  Табельный номер
                </label>
                <input
                  value={tabNum}
                  onChange={e => { setTabNum(e.target.value); setError(""); }}
                  placeholder="МСК-77-4421"
                  autoComplete="username"
                  className="w-full px-3 py-2.5 rounded bg-white/8 border border-white/15 text-white placeholder-white/25 text-sm font-mono-data focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 uppercase tracking-wide font-mono-data block mb-1.5">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-3 py-2.5 pr-10 rounded bg-white/8 border border-white/15 text-white placeholder-white/25 text-sm font-mono-data focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono-data animate-fade-in">
                  <Icon name="AlertCircle" size={13} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !tabNum || !password}
                className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Проверка...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={15} />
                    Войти в систему
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="text-xs text-white/30 font-mono-data text-center leading-relaxed">
                Демо-доступ: <span className="text-white/50">МСК-77-4421</span> / <span className="text-white/50">1234</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-white/25 font-mono-data">
              Несанкционированный доступ запрещён · ФЗ №149-ФЗ
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 w-full opacity-30" style={{ background: "linear-gradient(90deg, hsl(210 80% 50%), hsl(200 80% 60%))" }} />
    </div>
  );
}
