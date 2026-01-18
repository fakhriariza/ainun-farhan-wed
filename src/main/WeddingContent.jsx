import React, { useState, useEffect } from "react";

// ==========================================
// PAGES 1-4 (Masing-masing punya background sendiri)
// ==========================================

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
];

export const Pages1to4 = ({
  sectionRefs,
  images,
  fontSerif,
  bgVideo,
  goToNextPage,
}) => (
  <>
    {/* Page 1: Home/Video */}
    <section
      ref={(el) => (sectionRefs.current[0] = el)}
      className="h-screen w-full relative snap-start snap-always"
    >
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6 sm:px-8">
        <p className="text-[10px] sm:text-xs tracking-[0.25em] mb-3 sm:mb-4 opacity-80">
          THE WEDDING OF
        </p>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5"
          style={fontSerif}
        >
          AINUN & FARHAN
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl tracking-widest leading-relaxed sm:leading-loose mb-8 sm:mb-10 opacity-80"
          style={fontSerif}
        >
          TWO SOULS. <br />
          ONE FEBRUARY. <br />A LIFETIME OF LOVE.
        </p>

        <button
          onClick={goToNextPage}
          className="w-7 h-7 sm:w-8 sm:h-8 border border-white/40 rounded-full flex items-center justify-center animate-bounce hover:bg-white/10"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>

    {/* Page 2: Ayat */}
    <section
      ref={(el) => (sectionRefs.current[1] = el)}
      className="h-screen w-full relative snap-start snap-always"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.doa})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
        <h2 className="text-2xl mb-6" style={fontSerif}>
          Q.S. AR-RUM : 21
        </h2>
        <p className="text-sm leading-relaxed opacity-90 mb-8">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
          dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
          kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat
          tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <p className="text-lg italic" style={fontSerif}>
          Ainun & Farhan
        </p>
      </div>
    </section>

    {/* Page 3: The Groom */}
    <section
      ref={(el) => (sectionRefs.current[2] = el)}
      className="h-screen w-full relative snap-start snap-always"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.grooms})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
        <p className="text-xs tracking-widest mb-3 opacity-70">THE GROOM</p>
        <h2 className="text-3xl md:text-4xl mb-4" style={fontSerif}>
          Farhan Taufiqul Hafidz, S.H.
        </h2>
        <div className="flex items-center gap-4 mb-3">
          <p className="text-sm italic opacity-80">
            Putra kedua dari dua bersaudara
          </p>
          <span className="w-16 h-px bg-white/40" />
        </div>
        <p className="text-sm opacity-70 mb-4">
          Bapak Yudi Wahyudi dan Ibu Melly Miswati
        </p>
        <a
          href="https://www.instagram.com/taufiqulfarhan?igsh=dTR3ejNtZmVzc21v"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="text-sm">@taufiqulfarhan</span>
        </a>
      </div>
    </section>

    {/* Page 4: The Bride */}
    <section
      ref={(el) => (sectionRefs.current[3] = el)}
      className="h-screen w-full relative snap-start snap-always"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.brides})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
        <p className="text-xs tracking-widest mb-3 opacity-70">THE BRIDE</p>
        <h2 className="text-3xl md:text-4xl mb-4" style={fontSerif}>
          Ainun Sekar Arcturiani Putri, S.H.
        </h2>
        <div className="flex items-center gap-4 mb-3">
          <p className="text-sm italic opacity-80">
            Putri pertama dari dua bersaudara
          </p>
          <span className="w-16 h-px bg-white/40" />
        </div>
        <p className="text-sm opacity-70 mb-4">
          Bapak Arcturus Arijanto dan Ibu Erny Nandya Sukawati
        </p>
        <a
          href="https://www.instagram.com/ainunskr?igsh=bG0xd3JhdG90Nmx1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="text-sm">@ainunskr</span>
        </a>
      </div>
    </section>
  </>
);

// ==========================================
// PAGES 5-12 (Satu video background kontinyu)
// ==========================================
export const Pages5to12 = ({
  sectionRefs,
  images,
  fontSerif,
  bgVideo,
  scrollToPage,
  countdown,
  wishStep,
  setWishStep,
  wishData,
  setWishData,
  wishes,
  submitWish,
  isLoading,
  isSubmitting,
  showGiftModal,
  setShowGiftModal,
  copied,
  copyToClipboard,
  galleryIndex,
  setGalleryIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFirst, setShowFirst] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.gallery && images.gallery.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.gallery.length);
      }, 300); // Ganti kecepatan di sini (ms)

      return () => clearInterval(interval);
    }
  }, [images.gallery]);

  return (
    <div className="relative">
      {/* VIDEO BACKGROUND KONTINYU - Full Screen */}
      <div className="absolute inset-0 w-full" style={{ height: "1200vh" }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Page 5: Our Journey */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col text-white px-8 py-16 overflow-y-auto">
          <h2 className="text-3xl text-center mb-4 mt-10" style={fontSerif}>
            OUR JOURNEY
          </h2>
          <div className="space-y-6 text-sm flex-1 overflow-y-auto">
            {[
              {
                year: "First Meet",
                text: "Pada tahun 2018, kami bertemu di Fakultas Hukum UPN Veteran Jakarta pada organisasi Unit Peradilan Semu sebagai Kakak Tingkat dan Adik Tingkat. Seiring berjalannya waktu karena adanya kecocokan kami memutuskan untuk memulai hubungan",
              },
              {
                year: "Conflict",
                text: "Pada tahun 2022 kami memutuskan untuk berpisah karena masalah komunikasi serta faktor LDR. Namun pada awal 2023 kami mencoba menjalani kembali hubungan.",
              },
              {
                year: "Engagement",
                text: "Pada tanggal 13 Juli 2025, kami bertunangan setelah 7 tahun menjalin asmara. Tunangan ini menjadi simbol komitmen kami dalam membangun masa depan bersama.",
              },
              {
                year: "Marriage",
                text: "Pada tanggal 1 Februari 2026 kami memutuskan untuk menikah. Proses hubungan asmara kami yang selama 7 tahun, membentuk pribadi kami menjadi lebih dewasa.",
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-medium text-white/60 mb-1">{item.year}</p>
                <p className="leading-relaxed opacity-90">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[5] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
          <div className="w-64 h-64 mb-6 border-2 border-white/30 overflow-hidden">
            <img
              key={currentImageIndex}
              src={images.gallery?.[currentImageIndex] || images.gallery[0]}
              alt="couple"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <p className="text-xs tracking-widest mb-2 opacity-70">
            THE WEDDING OF
          </p>
          <h2 className="text-2xl mb-8" style={fontSerif}>
            AINUN & FARHAN
          </h2>
          <div className="flex gap-6 mb-8">
            {[
              { v: countdown.days, l: "Hari" },
              { v: countdown.hours, l: "Jam" },
              { v: countdown.minutes, l: "Menit" },
              { v: countdown.seconds, l: "Detik" },
            ].map((c, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-light">
                  {String(c.v).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-60 mt-1">{c.l}</p>
              </div>
            ))}
          </div>
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Ainun+%26+Farhan&dates=20260201T010000Z/20260201T060000Z&details=Akad+Nikah%3A+08.00+-+10.00+WIB%0AResepsi%3A+11.00+-+13.00+WIB%0A%0AUndangan+pernikahan+Ainun+Sekar+Arcturiani+Putri+dan+Farhan+Taufiqul+Hafidz&location=Griya+Ardhya+Garini%2C+Jl.+Halim+Perdanakusuma%2C+RT.1%2FRW.4%2C+Kec.+Makasar%2C+Jakarta+Timur&sf=true&output=xml`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/40 px-8 py-3 text-xs tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all text-white"
          >
            SAVE THE DATE
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Page 6: Venue */}
      <section
        ref={(el) => (sectionRefs.current[6] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-center text-white px-8">
          <h2 className="text-3xl mb-8" style={fontSerif}>
            MINGGU,
            <br />1 FEBRUARI 2026
          </h2>
          {[
            { title: "AKAD NIKAH", time: "08.00 - 10.00 WIB" },
            { title: "RESEPSI PERNIKAHAN", time: "11.00 - 13.00 WIB" },
          ].map((event, i) => (
            <div
              key={i}
              className={`border-t border-white/20 pt-6 ${
                i === 0 ? "mb-8" : ""
              }`}
            >
              <h3 className="text-sm tracking-wider mb-2">{event.title}</h3>
              <p className="text-lg font-light mb-3">{event.time}</p>
              <p className="text-2xl font-light mb-2" style={fontSerif}>
                Griya Ardhya Garini
              </p>
              <p className="text-xs opacity-70 leading-relaxed mb-4">
                Jl. Halim Perdanakusuma, RT.1/RW.4, Kec. Makasar, Jakarta Timur
              </p>
              <a
                href="https://maps.app.goo.gl/9wWAjRiJxRzLj25w8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border border-white/40 px-6 py-2 text-xs tracking-wider hover:bg-white/10">
                  LIHAT LOKASI
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Page 8: RSVP - FORM INPUT */}
      <section
        ref={(el) => (sectionRefs.current[7] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col text-white px-8 py-16">
          <h2 className="text-3xl italic mb-4" style={fontSerif}>
            Ucapan dan Doa
          </h2>
          <p className="text-sm opacity-80 leading-relaxed mb-6">
            Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir untuk memberikan do'a restu.
          </p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    wishStep >= step
                      ? "bg-white/90 text-black"
                      : "border border-white/40"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <span className="w-6 h-px bg-white/30" />}
              </React.Fragment>
            ))}
          </div>

          {/* Form Steps */}
          <div className="flex-1 flex flex-col justify-center">
            {wishStep === 1 && (
              <div>
                <label className="text-xs tracking-wider opacity-70 block mb-2">
                  NAMA
                </label>
                <input
                  type="text"
                  value={wishData.name}
                  onChange={(e) =>
                    setWishData({ ...wishData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/40 py-3 text-white outline-none focus:border-white"
                  placeholder="Masukkan nama Anda"
                />
              </div>
            )}

            {wishStep === 2 && (
              <div>
                <label className="text-xs tracking-wider opacity-70 block mb-4">
                  KONFIRMASI KEHADIRAN
                </label>
                <div className="space-y-3">
                  {["Hadir", "Tidak Hadir", "Masih Ragu"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setWishData({ ...wishData, attendance: opt })
                      }
                      className={`w-full py-3 border text-sm transition-all ${
                        wishData.attendance === opt
                          ? "border-white bg-white/10"
                          : "border-white/40 hover:border-white/60"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wishStep === 3 && (
              <div>
                <label className="text-xs tracking-wider opacity-70 block mb-4">
                  JUMLAH TAMU
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() =>
                      setWishData({
                        ...wishData,
                        guests: Math.max(1, wishData.guests - 1),
                      })
                    }
                    className="w-12 h-12 border border-white/40 flex items-center justify-center text-xl hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="text-4xl font-light w-16 text-center">
                    {wishData.guests}
                  </span>
                  <button
                    onClick={() =>
                      setWishData({
                        ...wishData,
                        guests: Math.min(5, wishData.guests + 1),
                      })
                    }
                    className="w-12 h-12 border border-white/40 flex items-center justify-center text-xl hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {wishStep === 4 && (
              <div>
                <label className="text-xs tracking-wider opacity-70 block mb-2">
                  UCAPAN & DOA
                </label>
                <textarea
                  value={wishData.message}
                  onChange={(e) =>
                    setWishData({ ...wishData, message: e.target.value })
                  }
                  className="w-full bg-transparent border border-white/40 p-3 text-white outline-none h-28 resize-none focus:border-white"
                  placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {wishStep > 1 && (
              <button
                onClick={() => setWishStep(wishStep - 1)}
                disabled={isSubmitting}
                className="flex-1 border border-white/40 py-4 text-xs tracking-wider hover:bg-white/10 disabled:opacity-50"
              >
                KEMBALI
              </button>
            )}
            <button
              onClick={() =>
                wishStep < 4 ? setWishStep(wishStep + 1) : submitWish()
              }
              disabled={isSubmitting || (wishStep === 1 && !wishData.name)}
              className={`flex-1 bg-white/90 text-black py-4 text-xs tracking-wider hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                wishStep === 1 ? "w-full" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  MENGIRIM...
                </span>
              ) : wishStep < 4 ? (
                "LANJUT"
              ) : (
                "KIRIM"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Page 9: Wishes - DISPLAY DATA */}
      <section
        ref={(el) => (sectionRefs.current[8] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col text-white px-8 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl italic" style={fontSerif}>
              Wishes
            </h2>
            <button
              onClick={() => scrollToPage(8)}
              className="text-xs tracking-wider flex items-center gap-2 opacity-70 hover:opacity-100"
            >
              TAMBAH
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="animate-spin w-8 h-8 mx-auto mb-4 text-white/60"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-sm opacity-60">Memuat ucapan...</p>
              </div>
            </div>
          ) : wishes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg opacity-60 mb-2">Belum ada ucapan</p>
                <p className="text-sm opacity-40">
                  Jadilah yang pertama memberikan ucapan!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {wishes.map((wish, i) => (
                <div
                  key={wish.id || i}
                  className={`${
                    i % 2 === 0 ? "text-left" : "text-right"
                  } animate-fade-in`}
                >
                  <h3 className="text-lg italic mb-1" style={fontSerif}>
                    {wish.name}
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed mb-1">
                    {wish.message}
                  </p>
                  <p className="text-xs opacity-50">{wish.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Wishes Count */}
          {!isLoading && wishes.length > 0 && (
            <div className="text-center pt-4 border-t border-white/10 mt-4">
              <p className="text-xs opacity-50">{wishes.length} ucapan</p>
            </div>
          )}
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[9] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center text-white px-8">
          <h2
            className="font-serif text-3xl italic mb-6"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            WEDDING GIFT
          </h2>

          <p className="text-sm opacity-80 leading-relaxed mb-8">
            Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui
            fitur di bawah ini:
          </p>

          <button
            onClick={() => setShowGiftModal(true)}
            className="border border-white/40 px-8 py-3 text-xs tracking-wider hover:bg-white/10 transition-colors w-fit"
          >
            KLIK DISINI
          </button>
        </div>

        {/* Gift Modal */}
        {showGiftModal && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
            <div className="bg-zinc-900 w-full max-w-sm p-6 relative animate-fade-in">
              <button
                onClick={() => setShowGiftModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3
                className="font-serif text-xl text-white mb-6"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                Wedding Gift
              </h3>

              <div className="space-y-4">
                <div className="border border-white/20 p-4">
                  <p className="text-lg text-white/60 mb-1">Bank Jago</p>
                  <p className="text-white mb-1">
                    a.n. Ainun Sekar Arcturiani Putri
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-white">105947123579</p>
                    <button
                      onClick={() => copyToClipboard("105947123579", "jago")}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {copied === "bca" ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="border border-white/20 p-4">
                  <p className="text-lg text-white/60 mb-1">
                    Bank Negara Indonesia
                  </p>
                  <p className="text-white mb-1">a.n. Farhan Taufiqul Hafidz</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-white">0452819195</p>
                    <button
                      onClick={() => copyToClipboard("0452819195", "bni")}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {copied === "bni" ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="border border-white/20 p-4">
                  <p className="text-lg text-white/60 mb-1">Bank Mandiri</p>
                  <p className="text-white mb-1">a.n. Farhan Taufiqul Hafi</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-white">1110019546668</p>
                    <button
                      onClick={() =>
                        copyToClipboard("1110019546668", "mandiri")
                      }
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {copied === "mandiri" ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="border border-white/20 p-4">
                  <p className="text-2xl text-white/60 mb-1">Send Gift</p>
                  <p className="text-white mb-1">Wedding Gift Registry</p>
                  <a
                    href="https://www.myregistry.com/giftlist/ainunfarhanwedding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full text-center py-2 border border-white/40 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm"
                  >
                    View Gift Registry →
                  </a>
                </div>

                {/* <div className="border border-white/20 p-4">
                  <p className="text-xs text-white/60 mb-2">Kirim Kado</p>
                  <p className="text-sm text-white/80">
                    Jl. Cisadane Jl. Riam Kiri No.Gang, RT.01/RW.03, Bendo, Kec.
                    Kepanjenkidul, Kota Blitar, Jawa Timur
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Page 10: Wedding Gift */}
      <section
        ref={(el) => (sectionRefs.current[10] = el)}
        className="min-h-screen w-full relative snap-start snap-always py-16 px-6"
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 text-white">
            <h2 className="text-4xl mb-2" style={fontSerif}>
              OUR GALLERY
            </h2>
            <p className="text-lg italic opacity-70" style={fontSerif}>
              Ainun & Farhan
            </p>
          </div>

          {/* Masonry-style Grid - Lebih Rapi */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {images.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
                />

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                  {/* <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Page 12: Closing */}
      <section
        ref={(el) => (sectionRefs.current[11] = el)}
        className="h-screen w-full relative snap-start snap-always"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col text-white text-center px-8 py-12">
          {/* Main Content - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-sm opacity-80 leading-relaxed mb-8 max-w-xs">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            <p className="text-xs tracking-wider mb-4 opacity-60">
              TERIMA KASIH
            </p>
            <h2 className="text-3xl mb-2" style={fontSerif}>
              AINUN & FARHAN
            </h2>
            <p className="text-xs tracking-wider opacity-60">
              {" "}
              #FAInallyfoundyou
            </p>
          </div>

          {/* Footer Credit - Bottom */}
          <div className="pt-4">
            <p className="text-[10px] tracking-wide opacity-40 text-white">
              Made with ♥ <br />
              exclusive for Ainun & Farhan by{" "}
              <a
                href="https://instagram.com/doa.selamanya"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-white opacity-100 hover:underline"
              >
                @doa.selamanya
              </a>
            </p>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            onClick={(e) => e.stopPropagation()}
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain animate-scaleIn"
          />
        </div>
      )}
    </div>
  );
};
