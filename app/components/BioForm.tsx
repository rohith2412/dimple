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

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const [form, setForm] = useState({
    username: '',
    job: '',
    age: '',
    bio: '',
    gender: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const location = `${country}, ${state}`;

      const res = await fetch('/api/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: session?.user?.email,
          ...form,
          age: Number(form.age),
          location,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');

      setSuccess('Profile updated successfully!');
      router.push('/client/profile');

      setForm({
        username: '',
        job: '',
        age: '',
        bio: '',
        gender: '',
      });
      setCountry('');
      setState('');
    } catch {
      setSuccess('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user?.email) {
    return <p className="text-black text-center mt-10">Please log in to submit your bio.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center  text-black px-6   w-95  max-w-sm mx-auto"
    >

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="w-full  px-4 text-black py-2 bg-transparent    mb-4 focus:outline-none"
      />

      <input
        name="job"
        value={form.job}
        onChange={handleChange}
        placeholder="Job"
        required
        className="w-full px-4   text-black  bg-transparent    mb-4 focus:outline-none"
      />

      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState('');
        }}
        required
        className="w-full px-4 text-black py-2 bg-transparent    mb-4 focus:outline-none ml-4" 
      >
        <option value="">Select Country</option>
        {Object.keys(countryStateMap).map((c) => (
          <option key={c} value={c} className="bg-black text-black">
            {c}
          </option>
        ))}
      </select>


      {country && (
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full px-4 py-2 bg-transparent  text-black   mb-4 focus:outline-none ml-4" 
        >
          <option value="">Select State</option>
          {countryStateMap[country].map((s) => (
            <option key={s} value={s} className="bg-black text-black">
              {s}
            </option>
          ))}
        </select>
      )}


      <input
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        required
        className="w-full px-4  bg-transparent  text-black   mb-4 focus:outline-none"
      />

      <select
        name="gender"
        required
        value={form.gender}
        onChange={handleChange}
        className="w-full px-4 text-black py-2 bg-transparent    mb-4 focus:outline-none ml-4"
      >
        <option value="">Select Gender</option>
        <option value="Male" className="bg-black text-black">Male</option>
        <option value="Female" className="bg-black text-black">Female</option>
      </select>

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Short bio..."
        required
        className="w-full px-4 py-2 bg-transparent    mb-6 resize-none focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="p-2 py-2 bg-black text-white text-xs  rounded-md hover:bg-gray-200 transition"
      >
        {loading ? 'Submitting...' : 'Update Profile'}
      </button>

      {success && <p className="text-green-400 mt-4 text-sm text-center">{success}</p>}
    </form>
  );
}
