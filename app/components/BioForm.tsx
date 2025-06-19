'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BioForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const countryStateMap: Record<string, string[]> = {
    India: [
      "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
      "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
      "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],
  US: [
      "Alabama", "Alaska", "Arizona", "California", "Colorado", "Florida", "Georgia", "Illinois",
      "New York", "North Carolina", "Ohio", "Pennsylvania", "Texas", "Washington", "Wisconsin"
  ],
  Canada: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
      "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
  ],
  UK: [
      "England", "Scotland", "Wales", "Northern Ireland"
  ],
  Australia: [
      "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
      "South Australia", "Tasmania", "Victoria", "Western Australia"
  ],
  Germany: [
      "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg",
      "Hesse", "Lower Saxony", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saxony",
      "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
  ],
  France: [
      "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica",
      "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie",
      "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
  ],
  China: [
      "Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou",
      "Hainan", "Hebei", "Heilongjiang", "Henan", "Hong Kong", "Hubei", "Hunan", "Inner Mongolia",
      "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Macau", "Ningxia", "Qinghai", "Shaanxi", "Shandong",
      "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"
  ],
  Brazil: [
      "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
      "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba",
      "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul",
      "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ],
  Japan: [
      "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma",
      "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima",
      "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki",
      "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane",
      "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata",
      "Yamaguchi", "Yamanashi"
  ]
  };

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const [form, setForm] = useState({
    username: "",
    job: "",
    age: "",
    bio: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const location = `${country}, ${state}`;

      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session?.user?.email,
          ...form,
          age: Number(form.age),
          location,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setSuccess("Profile updated successfully!");
      if (res.ok) {
        router.push("/client/profile");
      }

      setForm({
        username: "",
        job: "",
        age: "",
        bio: "",
        gender: ""
      });
      setCountry("");
      setState("");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user?.email) {
    return <p className="text-white">Please log in to submit your bio.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid justify-evenly gap-3 text-white pt-10">
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="w-60 focus:outline-none focus:ring-0 border-0" /><hr />

      <input name="job" value={form.job} onChange={handleChange} placeholder="Job" required className="w-60 focus:outline-none focus:ring-0" /><hr />

      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
        }}
        required
        className="rounded focus:outline-none focus:ring-0 text-white"
      >
        <option value="">Location</option>
        {Object.keys(countryStateMap).map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {country && (
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className=" rounded focus:outline-none focus:ring-0 text-white"
        >
          <option value="">Select State</option>
          {countryStateMap[country].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}
      <hr />

      <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required className="w-60 focus:outline-none focus:ring-0 border-0" /><hr />

      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio..." required className="w-60 focus:outline-none focus:ring-0 border-0" /><hr />

      <div className="flex justify-center">
        <button type="submit" disabled={loading} className="bg-white text-black rounded p-[6px] text-xs">
          {loading ? "Submitting..." : "Update profile"}
        </button>
      </div>

      {success && <p className="text-green-400 mt-2">{success}</p>}
    </form>
  );
}
