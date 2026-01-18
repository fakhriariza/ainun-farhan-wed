import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  HelpCircle,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const WeddingRSVPDashboard = () => {
  const [rsvpData, setRsvpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const rsvpCollection = collection(db, "rsvp");
    const q = query(rsvpCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            id: doc.id,
            name: docData.name || "Unknown",
            attendance: docData.attendance || "Ragu-ragu",
            guests: docData.guests || 1,
            message: docData.message || "",
            createdAt: docData.createdAt?.toDate
              ? docData.createdAt.toDate().toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Baru saja",
          });
        });

        setRsvpData(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching RSVP data:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const stats = {
    hadir: rsvpData.filter((r) => r.attendance === "Hadir"),
    tidakHadir: rsvpData.filter((r) => r.attendance === "Tidak Hadir"),
    ragu: rsvpData.filter((r) => r.attendance === "Masih Ragu"),
  };

  const totalGuests = {
    hadir: stats.hadir.reduce((sum, r) => sum + r.guests, 0),
    tidakHadir: stats.tidakHadir.reduce((sum, r) => sum + r.guests, 0),
    ragu: stats.ragu.reduce((sum, r) => sum + r.guests, 0),
  };

  const StatCard = ({
    title,
    count,
    guestCount,
    icon: Icon,
    color,
    onClick,
    active,
  }) => (
    <button
      onClick={onClick}
      className={`p-4 sm:p-6 rounded-xl transition-all duration-200 text-left w-full ${
        active
          ? `${color} shadow-lg scale-105`
          : "bg-white hover:shadow-md hover:scale-102"
      }`}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <Icon
          className={`w-6 h-6 sm:w-8 sm:h-8 ${
            active ? "text-white" : "text-gray-600"
          }`}
        />
        <span
          className={`text-2xl sm:text-3xl font-bold ${
            active ? "text-white" : "text-gray-800"
          }`}
        >
          {count}
        </span>
      </div>
      <h3
        className={`text-xs sm:text-sm font-medium mb-1 ${
          active ? "text-white" : "text-gray-600"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-base sm:text-lg font-semibold ${
          active ? "text-white" : "text-gray-700"
        }`}
      >
        {guestCount} Tamu
      </p>
    </button>
  );

  const filteredData =
    activeTab === "all"
      ? rsvpData
      : activeTab === "hadir"
        ? stats.hadir
        : activeTab === "tidak-hadir"
          ? stats.tidakHadir
          : stats.ragu;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Memuat data RSVP...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserX className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Error
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Dashboard RSVP
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Ainun & Farhan Wedding
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Real-time Updates
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            title="Total"
            count={rsvpData.length}
            guestCount={
              totalGuests.hadir + totalGuests.tidakHadir + totalGuests.ragu
            }
            icon={Users}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={() => setActiveTab("all")}
            active={activeTab === "all"}
          />
          <StatCard
            title="Hadir"
            count={stats.hadir.length}
            guestCount={totalGuests.hadir}
            icon={UserCheck}
            color="bg-gradient-to-br from-green-500 to-green-600"
            onClick={() => setActiveTab("hadir")}
            active={activeTab === "hadir"}
          />
          <StatCard
            title="Tidak Hadir"
            count={stats.tidakHadir.length}
            guestCount={totalGuests.tidakHadir}
            icon={UserX}
            color="bg-gradient-to-br from-red-500 to-red-600"
            onClick={() => setActiveTab("tidak-hadir")}
            active={activeTab === "tidak-hadir"}
          />
          <StatCard
            title="Ragu-ragu"
            count={stats.ragu.length}
            guestCount={totalGuests.ragu}
            icon={HelpCircle}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            onClick={() => setActiveTab("ragu")}
            active={activeTab === "ragu"}
          />
        </div>

        {/* Guest List - Mobile Friendly Cards */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {activeTab === "all"
                ? "Semua Konfirmasi"
                : activeTab === "hadir"
                  ? "Daftar Hadir"
                  : activeTab === "tidak-hadir"
                    ? "Daftar Tidak Hadir"
                    : "Daftar Ragu-ragu"}
            </h2>
            <p className="text-pink-100 mt-1 text-sm sm:text-base">
              {filteredData.length} konfirmasi
            </p>
          </div>

          {filteredData.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-gray-500">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-base sm:text-lg">Belum ada data RSVP</p>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="block lg:hidden">
                {filteredData.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {rsvp.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {rsvp.name}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              rsvp.attendance === "Hadir"
                                ? "bg-green-100 text-green-800"
                                : rsvp.attendance === "Tidak Hadir"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {rsvp.attendance}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {rsvp.guests} tamu
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      {rsvp.createdAt}
                    </div>
                    {rsvp.message && (
                      <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                        <MessageSquare className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600">{rsvp.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Jumlah Tamu
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Pesan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((rsvp) => (
                      <tr
                        key={rsvp.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {rsvp.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {rsvp.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              rsvp.attendance === "Hadir"
                                ? "bg-green-100 text-green-800"
                                : rsvp.attendance === "Tidak Hadir"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {rsvp.attendance}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            {rsvp.guests}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {rsvp.createdAt}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start text-sm text-gray-600 max-w-xs">
                            <MessageSquare className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span className="line-clamp-2">{rsvp.message}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingRSVPDashboard;
