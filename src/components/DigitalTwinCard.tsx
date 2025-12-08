"use client";

import { useEffect, useState } from "react";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type StatusKey =
  | "local"
  | "searching"
  | "geolocUnavailable"
  | "realtime"
  | "offline"
  | "denied";

type TwinData = {
  temperature: number;
  humidity: number;
  ph: number;
  ec: number;
  statusKey: StatusKey;
};

const FALLBACK: TwinData = {
  temperature: 22.8,
  humidity: 68,
  ph: 6.1,
  ec: 2.0,
  statusKey: "local",
};

const cardCopy: Record<
  SupportedLanguage,
  {
    status: Record<StatusKey, string>;
    stats: {
      temperature: string;
      humidity: string;
      ph: string;
      ec: string;
    };
    locationLabel: string;
    footer: string;
  }
> = {
  fr: {
    status: {
      local: "Lecture locale",
      searching: "Recherche de votre m\u00e9t\u00e9o...",
      geolocUnavailable: "G\u00e9olocalisation indisponible",
      realtime: "Mise \u00e0 jour en temps r\u00e9el",
      offline: "Utilisation des donn\u00e9es internes (hors ligne)",
      denied: "Localisation refus\u00e9e - donn\u00e9es internes",
    },
    stats: {
      temperature: "Temp\u00e9rature",
      humidity: "Humidit\u00e9",
      ph: "pH nutriments",
      ec: "EC solution",
    },
    locationLabel: "Localisation",
    footer: "Edge AI & Alerting",
  },
  en: {
    status: {
      local: "Local reading",
      searching: "Fetching your local weather...",
      geolocUnavailable: "Geolocation unavailable",
      realtime: "Realtime update",
      offline: "Using internal data (offline)",
      denied: "Location denied - internal data",
    },
    stats: {
      temperature: "Temperature",
      humidity: "Humidity",
      ph: "Nutrient pH",
      ec: "Solution EC",
    },
    locationLabel: "Location",
    footer: "Edge AI & Alerting",
  },
};

export function DigitalTwinCard() {
  const { language } = useLanguage();
  const [data, setData] = useState<TwinData>(FALLBACK);
  const [location, setLocation] = useState<{ city: string; country: string }>({
    city: "Serre locale",
    country: "NA",
  });

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setData((prev) => ({ ...prev, statusKey: "geolocUnavailable" }));
      return;
    }

    setData((prev) => ({ ...prev, statusKey: "searching" }));

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("weather-api-error");
          const json = await res.json();
          const temperature =
            json.current?.temperature_2m ?? FALLBACK.temperature;
          const humidity =
            json.current?.relative_humidity_2m ?? FALLBACK.humidity;
          const roundedTemp = Math.round(temperature * 10) / 10;
          const derivedPh = Math.round((6 + (humidity - 50) / 50) * 10) / 10;
          const derivedEc = Math.max(
            1.5,
            Math.min(2.5, 2 + (roundedTemp - 22) / 10),
          );

          try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coords.latitude}&longitude=${coords.longitude}&language=${language === "fr" ? "fr" : "en"}&count=1`;
            const geoRes = await fetch(geoUrl);
            if (geoRes.ok) {
              const geoJson = await geoRes.json();
              const place = geoJson.results?.[0];
              if (place) {
                setLocation({
                  city: place.name ?? "Local",
                  country: place.country ?? place.country_code ?? "NA",
                });
              }
            }
          } catch {
            setLocation({ city: "Local", country: "NA" });
          }

          setData({
            temperature: roundedTemp,
            humidity: Math.round(humidity),
            ph: derivedPh,
            ec: Math.round(derivedEc * 10) / 10,
            statusKey: "realtime",
          });
        } catch {
          setData((prev) => ({
            ...prev,
            statusKey: "offline",
          }));
        }
      },
      () =>
        setData((prev) => ({
          ...prev,
          statusKey: "denied",
        })),
      { enableHighAccuracy: true },
    );
  }, []);

  const text = cardCopy[language];

  const stats = [
    {
      label: text.stats.temperature,
      value: `${data.temperature.toFixed(1)}${String.fromCharCode(176)}C`,
    },
    {
      label: text.stats.humidity,
      value: `${data.humidity}%`,
    },
    {
      label: text.stats.ph,
      value: data.ph.toFixed(1),
    },
    {
      label: text.stats.ec,
      value: `${data.ec.toFixed(1)} mS/cm`,
    },
  ];

  return (
    <div className="relative w-full min-h-[18rem] max-w-md sm:h-80">
      <div className="absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 opacity-50 blur-3xl" />
      <div className="relative flex h-full w-full flex-col items-stretch rounded-[2.75rem]">
        <div className="flex-1 rounded-[2.75rem] border border-white/10 bg-slate-950/85 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6">
          <div className="flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-white/10 via-slate-950/20 to-slate-950/60 px-4 py-6">
            <p className="text-[0.55rem] uppercase tracking-[0.5em] text-pink-300 sm:text-[0.6rem]">
              {text.status[data.statusKey]}
            </p>
            <p className="mt-1 text-[0.5rem] uppercase tracking-[0.3em] text-slate-400 sm:text-[0.55rem]">
              {text.locationLabel}: {location.city}, {location.country}
            </p>
            <div className="mt-6 space-y-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-full bg-slate-900/90 px-5 py-3 shadow-inner shadow-black/50"
                >
                  <span className="text-[0.55rem] uppercase tracking-[0.4em] text-slate-400 sm:text-[0.6rem]">
                    {stat.label}
                  </span>
                  <span className="text-xl font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-full border border-white/10 bg-slate-900/60 px-6 py-2 text-center text-[0.6rem] uppercase tracking-[0.6em] text-slate-300">
          {text.footer}
        </div>
      </div>
    </div>
  );
}
