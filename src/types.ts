export type Page = "home" | "search" | "profile" | "help";

export interface WantedPerson {
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

export interface Officer {
  uid: string;
  full_name: string;
  rank: string;
  department: string;
  tab_number: string;
  access_level: number;
}

export const MOCK_DATA: WantedPerson[] = [
  { id: "001", fullName: "Семёнов Алексей Петрович", dob: "1985-03-14", age: 39, region: "Москва", status: "active", category: "Без вести пропавший", missingDate: "2024-11-02", caseNumber: "77-2024-18741" },
  { id: "002", fullName: "Карпова Нина Юрьевна", dob: "1998-07-22", age: 26, region: "Санкт-Петербург", status: "active", category: "Скрывающийся от следствия", missingDate: "2024-09-15", caseNumber: "78-2024-09312" },
  { id: "003", fullName: "Громов Дмитрий Сергеевич", dob: "1971-01-05", age: 53, region: "Краснодар", status: "found", category: "Без вести пропавший", missingDate: "2024-07-30", caseNumber: "23-2024-04420" },
  { id: "004", fullName: "Ильина Светлана Фёдоровна", dob: "2002-11-18", age: 22, region: "Екатеринбург", status: "active", category: "Несовершеннолетний", missingDate: "2025-01-09", caseNumber: "66-2025-00118" },
  { id: "005", fullName: "Орлов Виктор Николаевич", dob: "1963-06-28", age: 61, region: "Новосибирск", status: "suspended", category: "Скрывающийся от следствия", missingDate: "2023-12-11", caseNumber: "54-2023-11988" },
  { id: "006", fullName: "Белова Ирина Александровна", dob: "1990-04-03", age: 34, region: "Москва", status: "active", category: "Без вести пропавший", missingDate: "2025-02-17", caseNumber: "77-2025-00892" },
];

export const REGIONS = ["Все регионы", "Москва", "Санкт-Петербург", "Краснодар", "Екатеринбург", "Новосибирск"];

export const STATUS_LABELS: Record<string, string> = {
  active: "В розыске",
  found: "Найден",
  suspended: "Приостановлен",
};

export const STATUS_COLORS: Record<string, string> = {
  active: "bg-red-100 text-red-700 border border-red-200",
  found: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  suspended: "bg-amber-100 text-amber-700 border border-amber-200",
};

export const AUTH_URL = "https://functions.poehali.dev/780e001a-0bd7-429a-b95f-c7cdf46529ec";

export const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "search", label: "Розыск", icon: "Search" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];
