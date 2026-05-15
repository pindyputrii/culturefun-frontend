"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import L from "leaflet";

const categoryTitle = {
  makanan: "Makanan Tradisional",
  rumah: "Rumah Adat",
  pakaian: "Pakaian Adat",
  kesenian: "Kesenian",
};

export default function IndonesiaMap() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const mapDivRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(null);

  const [landmarks, setLandmarks] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinceData, setProvinceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        if (!API_URL) {
          console.error("NEXT_PUBLIC_API_URL belum terbaca");
          return;
        }

        const res = await fetch(`${API_URL}/api/landmarks`);

        if (!res.ok) {
          throw new Error(`Gagal mengambil landmark: ${res.status}`);
        }

        const result = await res.json();
        setLandmarks(result.data || []);
      } catch (error) {
        console.error("Gagal mengambil landmark:", error);
      }
    };

    fetchLandmarks();
  }, [API_URL]);

  const handleProvinceClick = useCallback(
    async (province) => {
      setSelectedProvince(province);
      setShowModal(true);
      setLoading(true);

      try {
        if (!API_URL) {
          console.error("NEXT_PUBLIC_API_URL belum terbaca");
          setProvinceData([]);
          return;
        }

        const res = await fetch(
          `${API_URL}/api/province/${encodeURIComponent(province)}`,
        );

        if (!res.ok) {
          throw new Error(`Gagal mengambil data provinsi: ${res.status}`);
        }

        const result = await res.json();
        setProvinceData(result.data || []);
      } catch (error) {
        console.error("Error fetching province data:", error);
        setProvinceData([]);
      } finally {
        setLoading(false);
      }
    },
    [API_URL],
  );

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;

    const map = L.map(mapDivRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    landmarks.forEach((landmark) => {
      if (!landmark.coordinates?.lat || !landmark.coordinates?.lng) return;

      const icon = L.icon({
        iconUrl: landmark.image,
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -36],
      });

      const popupContent = document.createElement("div");
      popupContent.className = "text-center";

      const title = document.createElement("p");
      title.textContent = landmark.province;
      title.style.fontWeight = "700";
      title.style.marginBottom = "8px";

      const button = document.createElement("button");
      button.innerText = "Lihat Budaya";
      button.className =
        "bg-orange text-white px-3 py-1 rounded-full font-semibold cursor-pointer";

      button.addEventListener("click", () => {
        handleProvinceClick(landmark.province);
      });

      popupContent.appendChild(title);
      popupContent.appendChild(button);

      L.marker([landmark.coordinates.lat, landmark.coordinates.lng], { icon })
        .addTo(markerLayerRef.current)
        .bindPopup(popupContent);
    });
  }, [landmarks, handleProvinceClick]);

  const groupedData = {
    makanan: provinceData.filter((item) => item.category === "makanan"),
    rumah: provinceData.filter((item) => item.category === "rumah"),
    pakaian: provinceData.filter((item) => item.category === "pakaian"),
    kesenian: provinceData.filter((item) => item.category === "kesenian"),
  };

  return (
    <>
      <div
        ref={mapDivRef}
        className="w-full h-[470px] sm:h-[550px] md:h-[620px] -mt-10 rounded-3xl overflow-hidden shadow-xl z-0"
      />

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-biru">
                  Budaya dari {selectedProvince}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Jelajahi makanan, rumah adat, pakaian, dan kesenian
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="bg-orange text-white px-4 py-2 rounded-full font-semibold hover:bg-biru transition cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              {loading ? (
                <p className="text-center text-lg text-gray-600">
                  Memuat budaya dari {selectedProvince}...
                </p>
              ) : provinceData.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Belum ada data budaya untuk provinsi ini.
                </p>
              ) : (
                <div className="space-y-10">
                  {Object.entries(groupedData).map(([key, items]) =>
                    items.length > 0 ? (
                      <div key={key}>
                        <h3 className="text-xl sm:text-2xl font-bold text-biru mb-4">
                          {categoryTitle[key]}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {items.map((item) => (
                            <Link
                              key={item._id}
                              href={`/jelajahi/${item.category}/${item._id}`}
                              className="block bg-orange rounded-3xl p-5 shadow-lg hover:bg-biru transition-colors"
                              onClick={() => setShowModal(false)}
                            >
                              <h4 className="text-white text-lg font-bold mb-2">
                                {item.title}
                              </h4>
                              <p className="text-white/90 text-sm line-clamp-2">
                                {item.description?.substring(0, 90) ||
                                  "Tidak ada deskripsi"}
                                {item.description &&
                                  item.description.length > 90 &&
                                  "..."}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
