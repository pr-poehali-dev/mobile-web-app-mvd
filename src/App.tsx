import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Типы ───────────────────────────────────────────────────────────────────

type Page = "home" | "search" | "profile" | "help";

interface WantedPerson {
  id: string;
  fullName: string;
  dob: string;
  age: number;
  region: string;
  status: "active" | "found" | "suspended";
  category: string;
  missingDate: string;
  caseNumber: string;
}

// ─── Данные-заглушки ────────────────────────────────────────────────────────

const MOCK_DATA: WantedPerson[] = [
  { id: "001", fullName: "Семёнов Алексей Петрович", dob: "1985-03-14", age: 39, region: "Москва", status: "active", category: "Без вести пропавший", missingDate: "2024-11-02", caseNumber: "77-2024-18741" },
  { id: "002", fullName: "Карпова Нина Юрьевна", dob: "1998-07-22", age: 26, region: "Санкт-Петербург", status: "active", category: "Скрывающийся от следствия", missingDate: "2024-09-15", caseNumber: "78-2024-09312" },
  { id: "003", fullName: "Громов Дмитрий Сергеевич", dob: "1971-01-05", age: 53, region: "Краснодар", status: "found", category: "Без вести пропавший", missingDate: "2024-07-30", caseNumber: "23-2024-04420" },
  { id: "004", fullName: "Ильина Светлана Фёдоровна", dob: "2002-11-18", age: 22, region: "Екатеринбург", status: "active", category: "Несовершеннолетний", missingDate: "2025-01-09", caseNumber: "66-2025-00118" },
  { id: "005", fullName: "Орлов Виктор Николаевич", dob: "1963-06-28", age: 61, region: "Новосибирск", status: "suspended", category: "Скрывающийся от следствия", missingDate: "2023-12-11", caseNumber: "54-2023-11988" },
  { id: "006", fullName: "Белова Ирина Александровна", dob: "1990-04-03", age: 34, region: "Москва", status: "active", category: "Без вести пропавший", missingDate: "2025-02-17", caseNumber: "77-2025-00892" },
];

const REGIONS = ["Все регионы", "Москва", "Санкт-Петербург", "Краснодар", "Екатеринбург", "Новосибирск"];
const STATUS_LABELS: Record<string, string> = { active: "В розыске", found: "Найден", suspended: "Приостановлен" };
const STATUS_COLORS: Record<string, string> = {
  active: "bg-red-100 text-red-700 border border-red-200",
  found: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  suspended: "bg-amber-100 text-amber-700 border border-amber-200",
};

// ─── Компоненты ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: WantedPerson["status"] }) {
  return (
    <span className={`status-badge ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`card-official p-5 flex items-start gap-4 animate-slide-up ${accent ? "border-l-4 border-l-red-500" : "border-l-4 border-l-blue-600"}`}>
      <div className={`w-10 h-10 rounded flex items-center justify-center text-xl ${accent ? "bg-red-50" : "bg-blue-50"}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold font-mono-data text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

// ─── Страница: Главная ───────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const active = MOCK_DATA.filter(p => p.status === "active").length;
  const found = MOCK_DATA.filter(p => p.status === "found").length;
  const total = MOCK_DATA.length;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="card-official p-6 border-l-4 border-l-blue-700 grid-pattern">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-mono-data">
              Ведомственная АИС · Версия 1.0
            </div>
            <h1 className="text-2xl font-bold text-foreground">Автоматизированная информационная<br />система розыска</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Единая база данных разыскиваемых лиц. Поиск, фильтрация и мониторинг дел по регионам и категориям.
            </p>
          </div>
          <div className="hidden sm:block text-6xl opacity-10">🦅</div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onNavigate("search")}
            className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded transition-colors flex items-center gap-2"
          >
            <Icon name="Search" size={15} />
            Перейти к розыску
          </button>
          <button className="px-5 py-2 border border-border text-sm font-medium rounded hover:bg-secondary transition-colors text-foreground flex items-center gap-2">
            <Icon name="Download" size={15} />
            Скачать отчёт
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🔴" label="Активный розыск" value={active} accent />
        <StatCard icon="✅" label="Найдено (2025)" value={found} />
        <StatCard icon="📂" label="Всего дел" value={total} />
        <StatCard icon="🗺️" label="Регионов охвачено" value={REGIONS.length - 1} />
      </div>

      <div className="card-official">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="Clock" size={15} className="text-blue-600" />
            Последние поступления
          </span>
          <button onClick={() => onNavigate("search")} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            Все записи →
          </button>
        </div>
        <div className="divide-y divide-border">
          {MOCK_DATA.slice(0, 4).map((p) => (
            <div key={p.id} className="table-row-hover px-5 py-3 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold font-mono-data text-blue-700">
                {p.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{p.fullName}</div>
                <div className="text-xs text-muted-foreground font-mono-data">{p.caseNumber} · {p.region}</div>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Розыск ────────────────────────────────────────────────────────

function SearchPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("Все регионы");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [selected, setSelected] = useState<WantedPerson | null>(null);

  const filtered = MOCK_DATA.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q || p.fullName.toLowerCase().includes(q) || p.caseNumber.includes(q) || p.region.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || p.status === statusFilter;
    const matchR = regionFilter === "Все регионы" || p.region === regionFilter;
    const matchA = (!ageMin || p.age >= +ageMin) && (!ageMax || p.age <= +ageMax);
    return matchQ && matchS && matchR && matchA;
  });

  return (
    <div className="animate-fade-in space-y-4">
      <div className="card-official p-4 space-y-3">
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ФИО, номер дела, регион..."
            className="w-full pl-9 pr-4 py-2.5 border border-input rounded text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1 block">Статус</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600">
              <option value="all">Все статусы</option>
              <option value="active">В розыске</option>
              <option value="found">Найден</option>
              <option value="suspended">Приостановлен</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1 block">Регион</label>
            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600">
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1 block">Возраст от</label>
            <input type="number" value={ageMin} onChange={e => setAgeMin(e.target.value)} placeholder="18"
              className="w-full px-3 py-2 border border-input rounded text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-1 block">Возраст до</label>
            <input type="number" value={ageMax} onChange={e => setAgeMax(e.target.value)} placeholder="70"
              className="w-full px-3 py-2 border border-input rounded text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600" />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono-data">Найдено записей: <span className="font-semibold text-foreground">{filtered.length}</span></span>
          <button onClick={() => { setQuery(""); setStatusFilter("all"); setRegionFilter("Все регионы"); setAgeMin(""); setAgeMax(""); }}
            className="text-blue-600 hover:text-blue-800">Сбросить фильтры</button>
        </div>
      </div>

      <div className="card-official overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">№ дела</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">ФИО</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Возраст</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Регион</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Категория</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    <Icon name="SearchX" size={28} className="mx-auto mb-2 opacity-30" />
                    <div className="text-sm">Записи не найдены</div>
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="table-row-hover" onClick={() => setSelected(p)}>
                  <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">{p.caseNumber}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.fullName}</td>
                  <td className="px-4 py-3 font-mono-data text-center">{p.age}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.region}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.category}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="card-official w-full max-w-md p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-mono-data text-muted-foreground mb-1">{selected.caseNumber}</div>
                <h2 className="text-lg font-bold text-foreground">{selected.fullName}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              {([
                ["Дата рождения", selected.dob],
                ["Возраст", `${selected.age} лет`],
                ["Регион", selected.region],
                ["Категория", selected.category],
                ["Дата пропажи", selected.missingDate],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground text-xs uppercase tracking-wide">{label}</span>
                  <span className="font-medium font-mono-data text-xs">{value}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between items-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Статус</span>
                <StatusBadge status={selected.status} />
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded transition-colors">
                Открыть дело
              </button>
              <button className="px-4 py-2 border border-border text-sm rounded hover:bg-secondary transition-colors text-foreground">
                <Icon name="Printer" size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Страница: Профиль ───────────────────────────────────────────────────────

function ProfilePage() {
  return (
    <div className="animate-fade-in space-y-5">
      <div className="card-official p-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold text-white">
            АП
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Петров Андрей Владимирович</h2>
            <div className="text-sm text-muted-foreground">Старший оперуполномоченный</div>
            <div className="text-xs font-mono-data text-muted-foreground mt-1">УИД: 77-OPD-00412 · Доступ: Уровень 2</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-official p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="User" size={15} className="text-blue-600" /> Сведения
          </h3>
          {([
            ["Подразделение", "ОРО УВД по Москве"],
            ["Должность", "Ст. оперуполномоченный"],
            ["Звание", "Майор полиции"],
            ["Табельный №", "МСК-77-4421"],
            ["Дата авторизации", "25.04.2026 09:14"],
          ] as [string, string][]).map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-1.5 border-b border-border last:border-0 text-sm">
              <span className="text-muted-foreground text-xs">{k}</span>
              <span className="font-mono-data text-xs text-foreground">{v}</span>
            </div>
          ))}
        </div>

        <div className="card-official p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="BarChart2" size={15} className="text-blue-600" /> Статистика
          </h3>
          {([
            ["Дел в работе", "12"],
            ["Закрыто (2025)", "7"],
            ["Запросов сегодня", "34"],
            ["Последний вход", "Сегодня, 09:14"],
            ["Сессий за месяц", "21"],
          ] as [string, string][]).map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-1.5 border-b border-border last:border-0 text-sm">
              <span className="text-muted-foreground text-xs">{k}</span>
              <span className="font-mono-data text-xs font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-official p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Shield" size={15} className="text-blue-600" /> Права доступа
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Просмотр баз", "Поиск по ФИО", "Экспорт отчётов", "Изменение статуса", "Запросы в ИЦ"].map(p => (
            <span key={p} className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">✓ {p}</span>
          ))}
          {["Удаление записей", "Администрирование"].map(p => (
            <span key={p} className="px-2.5 py-1 rounded bg-secondary text-muted-foreground text-xs border border-border line-through">✗ {p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Справка ───────────────────────────────────────────────────────

function HelpPage() {
  const items = [
    { icon: "Search", title: "Поиск и фильтрация", text: "Используйте строку поиска по ФИО или номеру дела. Фильтры сужают выборку по статусу, региону и возрасту." },
    { icon: "FileText", title: "Статусы дел", text: "«В розыске» — активное дело. «Найден» — обнаружен. «Приостановлен» — приостановлен по решению следствия." },
    { icon: "MapPin", title: "Региональная фильтрация", text: "Выберите регион из списка, чтобы отобразить дела конкретного субъекта РФ." },
    { icon: "AlertTriangle", title: "Конфиденциальность", text: "Данные системы — служебная информация ограниченного распространения. Передача третьим лицам запрещена." },
    { icon: "Phone", title: "Техническая поддержка", text: "При неисправностях — ИТ-отдел: +7 (495) 000-00-00, вн. 1234, ежедневно 08:00–20:00." },
    { icon: "Lock", title: "Безопасность входа", text: "Сессия завершается через 30 мин. неактивности. Не оставляйте рабочее место без блокировки экрана." },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      <div className="card-official p-5 border-l-4 border-l-blue-600">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Icon name="BookOpen" size={16} className="text-blue-600" />
          Руководство пользователя АИС «Розыск»
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Инструкция по работе с системой. Версия 1.0 · Апрель 2026</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="card-official p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={16} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-official p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Внимание:</span> Система работает в тестовом режиме. Данные являются демонстрационными и не содержат реальных сведений.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Навигация ───────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Page; label: string; icon: Parameters<typeof Icon>[0]["name"] }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "search", label: "Розыск", icon: "Search" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];

// ─── Корневой компонент ──────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

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
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs font-mono-data">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              77-OPD-00412
            </div>
            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors">
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
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
