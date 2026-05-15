"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  BookOpen,
  MapPinned,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  LogOut,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [activeMenu, setActiveMenu] = useState("budaya");

  const [budaya, setBudaya] = useState([]);
  const [landmark, setLandmark] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");

  const [selectedData, setSelectedData] = useState(null);

  const [showView, setShowView] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const [form, setForm] = useState({
    title: "",
    category: "",
    province: "",
    description: "",
    image: "",
  });

  // FETCH BUDAYA
  const fetchBudaya = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/all/data");

      const data = await res.json();

      setBudaya(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH LANDMARK
  const fetchLandmark = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/landmarks");

      const data = await res.json();

      setLandmark(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // LOGIN CHECK
  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = localStorage.getItem("isAdmin");

      if (!isAdmin) {
        router.replace("/login");

        return;
      }

      await fetchBudaya();

      await fetchLandmark();

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
        <h1 className="text-4xl font-black text-[#0A1E4A]">Loading...</h1>
      </div>
    );
  }

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");

    router.push("/login");
  };

  // INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isBudaya = activeMenu === "budaya";

      const baseUrl = isBudaya
        ? "http://localhost:5000/api"
        : "http://localhost:5000/api/landmarks";

      const url = editId ? `${baseUrl}/${editId}` : baseUrl;

      const method = editId ? "PUT" : "POST";

      const payload =
        activeMenu === "budaya"
          ? form
          : {
              name: form.title,
              province: form.province,
              image: form.image,
            };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setShowForm(false);

        setEditId(null);

        setForm({
          title: "",
          category: "",
          province: "",
          description: "",
          image: "",
        });

        fetchBudaya();

        fetchLandmark();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      const isBudaya = activeMenu === "budaya";

      const baseUrl = isBudaya
        ? "http://localhost:5000/api"
        : "http://localhost:5000/api/landmarks";

      await fetch(`${baseUrl}/${selectedData._id}`, {
        method: "DELETE",
      });

      setShowDelete(false);

      fetchBudaya();

      fetchLandmark();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      title: item.title || item.name,
      category: item.category || "",
      province: item.province || "",
      description: item.description || "",
      image: item.image || "",
    });

    setShowForm(true);
  };

  // FILTER
  const currentData = activeMenu === "budaya" ? budaya : landmark;

  const filteredData = currentData.filter((item) => {
    const title = item.title || item.name;

    const matchSearch = title.toLowerCase().includes(search.toLowerCase());

    const matchCategory = !categoryFilter || item.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <main className="flex min-h-screen bg-[#f5f6fa]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0A1E4A] text-white p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-black mb-14">CultureFun</h1>

          <div className="space-y-4">
            <button
              onClick={() => {
                setActiveMenu("budaya");
                setCurrentPage(1);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all ${
                activeMenu === "budaya"
                  ? "bg-[#FF7A1A]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <BookOpen />
              Budaya
            </button>

            <button
              onClick={() => {
                setActiveMenu("landmark");
                setCurrentPage(1);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all ${
                activeMenu === "landmark"
                  ? "bg-[#FF7A1A]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <MapPinned />
              Landmark
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowLogout(true)}
          className="bg-red-500 hover:bg-red-600 transition-all p-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer"
        >
          <LogOut />
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-10 overflow-x-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-black text-[#0A1E4A]">
              {activeMenu === "budaya" ? "Budaya" : "Landmark"}
            </h1>

            <p className="text-gray-500 mt-2">Kelola data CultureFun</p>
          </div>

          <button
            onClick={() => {
              setShowForm(true);

              setEditId(null);

              setForm({
                title: "",
                category: "",
                province: "",
                description: "",
                image: "",
              });
            }}
            className="bg-[#FF7A1A] hover:scale-105 transition-all text-white px-6 py-4 rounded-2xl flex items-center gap-3 font-bold cursor-pointer"
          >
            <Plus />
            Tambah Data
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-5 mb-8">
          <div className="flex items-center bg-white rounded-2xl px-5 py-4 flex-1 shadow-lg">
            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-3 w-full"
            />
          </div>

          {activeMenu === "budaya" && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white px-5 py-4 rounded-2xl shadow-lg outline-none cursor-pointer"
            >
              <option value="">Semua Kategori</option>

              <option value="makanan">Makanan</option>

              <option value="rumah">Rumah</option>

              <option value="pakaian">Pakaian</option>

              <option value="kesenian">Kesenian</option>
            </select>
          )}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A1E4A] text-white">
              <tr>
                <th className="p-5 text-left">Nama</th>

                <th className="p-5 text-left">Kategori</th>

                <th className="p-5 text-left">Provinsi</th>

                <th className="p-5 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="p-5 font-semibold">
                    {item.title || item.name}
                  </td>

                  <td className="p-5">{item.category || "-"}</td>

                  <td className="p-5">{item.province}</td>

                  <td className="p-5 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedData(item);

                        setShowView(true);
                      }}
                      className="bg-blue-500 hover:scale-110 transition-all text-white p-3 rounded-xl cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:scale-110 transition-all text-white p-3 rounded-xl cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedData(item);

                        setShowDelete(true);
                      }}
                      className="bg-red-500 hover:scale-110 transition-all text-white p-3 rounded-xl cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-3 mt-10 flex-wrap pb-10">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-11 h-11 rounded-full font-bold transition-all duration-300 cursor-pointer
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#0A1E4A] text-white hover:bg-[#102b66]"
      }`}
            >
              {"<"}
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1),
              )
              .map((page, index, arr) => (
                <div key={page} className="flex items-center gap-3">
                  {index > 0 && arr[index - 1] !== page - 1 && (
                    <span className="font-bold text-xl">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 rounded-full font-bold transition-all duration-300 cursor-pointer
            ${
              currentPage === page
                ? "bg-[#FF7A1A] text-white"
                : "bg-white border border-gray-200 hover:bg-[#FF7A1A] hover:text-white"
            }`}
                  >
                    {page}
                  </button>
                </div>
              ))}

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`w-11 h-11 rounded-full font-bold transition-all duration-300 cursor-pointer
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#0A1E4A] text-white hover:bg-[#102b66]"
      }`}
            >
              {">"}
            </button>
          </div>
        </div>
      </section>

      {/* VIEW MODAL */}
      {showView && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
            {/* CLOSE */}
            <button
              onClick={() => setShowView(false)}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-red-500 hover:text-white transition-all p-3 rounded-full cursor-pointer"
            >
              <X />
            </button>

            <Image
              src={selectedData.image}
              alt="image"
              width={1000}
              height={500}
              className="w-full h-80 object-cover rounded-3xl mb-8"
            />

            <h2 className="text-5xl font-black text-[#0A1E4A]">
              {selectedData.title || selectedData.name}
            </h2>

            <p className="text-[#FF7A1A] text-xl mt-3">
              {selectedData.category}
            </p>

            <p className="text-gray-700 mt-8 leading-relaxed text-lg">
              {selectedData.description}
            </p>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[40px] p-10 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-red-500 hover:text-white transition-all p-3 rounded-full cursor-pointer"
            >
              <X />
            </button>

            <h2 className="text-5xl font-black mb-10 text-[#0A1E4A]">
              {editId ? "Edit Data" : "Tambah Data"}
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="title"
                placeholder="Nama"
                value={form.title}
                onChange={handleChange}
                className="border p-5 rounded-2xl outline-none"
              />

              {activeMenu === "budaya" && (
                <input
                  type="text"
                  name="category"
                  placeholder="Kategori"
                  value={form.category}
                  onChange={handleChange}
                  className="border p-5 rounded-2xl outline-none"
                />
              )}

              <input
                type="text"
                name="province"
                placeholder="Provinsi"
                value={form.province}
                onChange={handleChange}
                className="border p-5 rounded-2xl outline-none"
              />

              <input
                type="text"
                name="image"
                placeholder="URL gambar"
                value={form.image}
                onChange={handleChange}
                className="border p-5 rounded-2xl outline-none"
              />
            </div>

            {activeMenu === "budaya" && (
              <textarea
                name="description"
                placeholder="Deskripsi"
                value={form.description}
                onChange={handleChange}
                className="border p-5 rounded-2xl w-full mt-5 h-44 outline-none"
              />
            )}

            <button
              type="submit"
              className="bg-[#FF7A1A] hover:scale-[1.02] transition-all text-white w-full py-5 rounded-2xl mt-8 font-bold cursor-pointer"
            >
              {editId ? "Update Data" : "Tambah Data"}
            </button>
          </form>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md text-center relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowDelete(false)}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-red-500 hover:text-white transition-all p-3 rounded-full cursor-pointer"
            >
              <X />
            </button>

            <Trash2 size={80} className="mx-auto text-red-500" />

            <h2 className="text-4xl font-black mt-5 text-[#0A1E4A]">
              Hapus Data?
            </h2>

            <p className="text-gray-500 mt-4">Data tidak bisa dikembalikan</p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 transition-all text-white flex-1 py-4 rounded-2xl font-bold cursor-pointer"
              >
                Hapus
              </button>

              <button
                onClick={() => setShowDelete(false)}
                className="bg-gray-200 hover:bg-gray-300 transition-all flex-1 py-4 rounded-2xl font-bold cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md text-center relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowLogout(false)}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-red-500 hover:text-white transition-all p-3 rounded-full cursor-pointer"
            >
              <X />
            </button>

            <LogOut size={80} className="mx-auto text-red-500" />

            <h2 className="text-4xl font-black mt-5 text-[#0A1E4A]">Logout?</h2>

            <p className="text-gray-500 mt-4">
              Yakin ingin keluar dari dashboard admin?
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition-all text-white flex-1 py-4 rounded-2xl font-bold cursor-pointer"
              >
                Logout
              </button>

              <button
                onClick={() => setShowLogout(false)}
                className="bg-gray-200 hover:bg-gray-300 transition-all flex-1 py-4 rounded-2xl font-bold cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
