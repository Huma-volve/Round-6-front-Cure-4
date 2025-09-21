import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BackButton from "@/components/ui/BackButton";
interface Hospital {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address?: string;
  tags?: any;
}

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

function FlyToLocation({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 13, { duration: 2 });
    }
  }, [center, map]);

  return null;
}

export default function MapSearchHospitals() {
  const [query, setQuery] = useState<string>("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 30.0131,
    lng: 31.2089,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      );
      const geoJson = await geoRes.json();

      if (!geoJson || geoJson.length === 0) {
        setError("not found");
        setHospitals([]);
        setLoading(false);
        return;
      }

      const lat = parseFloat(geoJson[0].lat);
      const lon = parseFloat(geoJson[0].lon);

      setCenter({ lat, lng: lon });

      const radius = 5000;
      const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:${radius},${lat},${lon});
  node["amenity"="clinic"](around:${radius},${lat},${lon});
  node["healthcare"="clinic"](around:${radius},${lat},${lon});
  node["healthcare"="doctors"](around:${radius},${lat},${lon});
);
out center;`;

      const overpassRes = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
        }
      );
      const overpassJson = await overpassRes.json();
      const elements = overpassJson.elements || [];

      const parsed: Hospital[] = elements
        .map((el: any) => {
          const latEl = el.lat ?? el.center?.lat;
          const lonEl = el.lon ?? el.center?.lon;
          if (!latEl || !lonEl) return null;
          return {
            id: `${el.type}/${el.id}`,
            name: el.tags?.name ?? el.tags?.operator ?? "Unnamed",
            lat: Number(latEl),
            lon: Number(lonEl),
            address:
              el.tags?.["addr:full"] ||
              el.tags?.["addr:street"] ||
              el.tags?.["addr:housename"] ||
              "",
            tags: el.tags,
          } as Hospital;
        })
        .filter(Boolean) as Hospital[];

      setHospitals(parsed);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("something wrong, try again");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="flex h-screen font-sans">
      <div className="hidden md:flex w-1/3 p-5 border-r bg-gray-50 flex-col">
        <form onSubmit={handleSearch} className="mb-5">
          <div className="flex items-center gap-2 mb-5">
            <BackButton />
            <label className="block text-lg font-medium text-gray-700 mt-1">
              Search for a place
            </label>
          </div>

          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              placeholder="Type a city or area (e.g., Giza, Nasr City)"
            />
            <button
              type="submit"
              disabled={loading}
              className="text-sm px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition"
            >
              {loading ? "Searching.." : "Search"}
            </button>
          </div>
        </form>

        <h2 className="text-lg font-bold mb-3 text-gray-800">
          Hospitals & Clinics near{" "}
          <span className="text-blue-600">{query}</span>
        </h2>

        <div className="flex-1 overflow-y-auto space-y-3">
          {hospitals.map((h) => (
            <div
              key={h.id}
              className="p-3 border rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
              onClick={() => setCenter({ lat: h.lat, lng: h.lon })}
            >
              <div className="font-semibold text-gray-800">{h.name}</div>
              {h.address && (
                <div className="text-sm text-gray-600">{h.address}</div>
              )}
              {h.tags?.phone && (
                <div className="text-sm text-gray-700 mt-1">{h.tags.phone}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 right-4 md:hidden z-[1000]">
          <form onSubmit={handleSearch} className="mb-2">
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-2 border rounded-md shadow-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                placeholder="Type a city or area (e.g., Giza, Nasr City)"
              />
              <button
                type="submit"
                disabled={loading}
                className="text-sm px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition shadow-lg"
              >
                {loading ? "Searching.." : "Search"}
              </button>
            </div>
          </form>
        </div>

        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          <FlyToLocation center={center} />

          {hospitals.map((h) => (
            <Marker key={h.id} position={[h.lat, h.lon]} icon={hospitalIcon}>
              <Popup>
                <strong>{h.name}</strong>
                <br />
                {h.address && <div>{h.address}</div>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="absolute top-20 left-4 md:hidden z-[1000]">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
