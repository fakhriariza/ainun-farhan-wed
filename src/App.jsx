// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingInvitation from "./WeddingInvitation";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route tanpa nama tamu */}
        <Route path="/" element={<WeddingInvitation />} />

        {/* Route dengan nama tamu dari slug */}
        {/* Contoh: /bakwan-ferizan-ginting */}
        <Route path="/:slug" element={<WeddingInvitation />} />
      </Routes>
    </Router>
  );
}

export default App;

// ==========================================
// CARA GENERATE LINK UNDANGAN
// ==========================================

/*
Fungsi untuk generate slug dari nama:
*/
export const generateInvitationLink = (
  guestName,
  baseUrl = "https://ainun-farhan-wed.vercel.app"
) => {
  // "Bakwan Ferizan Ginting" -> "bakwan-ferizan-ginting"
  const slug = guestName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spasi jadi dash
    .replace(/[^a-z0-9-]/g, ""); // hapus karakter special

  return `${baseUrl}/${slug}`;
};

/*
Contoh penggunaan:

const guests = [
  "Bakwan Ferizan Ginting",
  "Dr. Ahmad Sudirman",
  "Budi Santoso",
  "Keluarga Besar Pak RT",
];

guests.forEach(name => {
  console.log(`${name}: ${generateInvitationLink(name)}`);
});

Output:
Bakwan Ferizan Ginting: https://ainunfarhan.com/bakwan-ferizan-ginting
Dr. Ahmad Sudirman: https://ainunfarhan.com/dr-ahmad-sudirman
Budi Santoso: https://ainunfarhan.com/budi-santoso
Keluarga Besar Pak RT: https://ainunfarhan.com/keluarga-besar-pak-rt
*/
