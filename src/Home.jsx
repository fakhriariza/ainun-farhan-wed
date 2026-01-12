import React, { useState, useEffect, useRef } from "react";
import brides from "./assets/brides.jpeg";
import grooms from "./assets/groom.jpg";
import doa from "./assets/doa.jpeg";
import cover from "./assets/cover.jpeg";
import bgVideo from "./assets/bg_video.mp4";
import story from "./assets/story.jpg";

const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [wishStep, setWishStep] = useState(1);
  const [wishData, setWishData] = useState({
    name: "",
    attendance: "",
    guests: 1,
    message: "",
  });
  const [wishes, setWishes] = useState([
    {
      name: "IHSAN MAHENDRA",
      message:
        "Happy wedding! Semoga menjadi keluarga sakinah mawaddah warahmah ya...",
      date: "30 Sep 2025",
    },
    {
      name: "ASMI KUSWORO",
      message:
        "Happy wedding! May you both have a happy and blessed life <3 <3",
      date: "30 Sep 2025",
    },
    {
      name: "INTANIA",
      message:
        "Selamaaattt! Semoga menjadi keluarga yang sakinah mawaddah warahmaahh 👏👏👏",
      date: "22 Sep 2025",
    },
    {
      name: "PIKET",
      message: "Selamat menempuh hidup baru ya cantik! 😊",
      date: "20 Sep 2025",
    },
  ]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copied, setCopied] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const sectionRefs = useRef([]);
  const totalPages = 12;

  const weddingDate = new Date("2025-09-30T07:00:00");

  // Dummy images using picsum
  const dummyImages = {
    cover: cover,
    video: bgVideo,
    quote: doa,
    groom: grooms,
    bride: brides,
    journey: story,
    venue: "https://picsum.photos/seed/venue/800/1200",
    countdown: "https://picsum.photos/seed/countdown/800/1200",
    rsvp: "https://picsum.photos/seed/rsvp/800/1200",
    wishes: "https://picsum.photos/seed/wishes/800/1200",
    gift: "https://picsum.photos/seed/gift/800/1200",
    gallery: [
      "https://picsum.photos/seed/gallery1/800/1200",
      "https://picsum.photos/seed/gallery2/800/1200",
      "https://picsum.photos/seed/gallery3/800/1200",
      "https://picsum.photos/seed/gallery4/800/1200",
      "https://picsum.photos/seed/gallery5/800/1200",
    ],
    closing: "https://picsum.photos/seed/closing/800/1200",
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll observer to track current page
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentPage(index + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const scrollToPage = (page) => {
    const section = sectionRefs.current[page - 1];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      scrollToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      scrollToPage(currentPage - 1);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const menuItems = [
    { page: 1, label: "Home" },
    { page: 2, label: "Ayat" },
    { page: 3, label: "Mempelai Pria" },
    { page: 4, label: "Mempelai Wanita" },
    { page: 5, label: "Our Journey" },
    { page: 6, label: "Waktu & Lokasi" },
    { page: 7, label: "Save The Date" },
    { page: 8, label: "RSVP" },
    { page: 9, label: "Wishes" },
    { page: 10, label: "Wedding Gift" },
    { page: 11, label: "Gallery" },
    { page: 12, label: "Closing" },
  ];

  // Opening Cover
  if (!isOpen) {
    return (
      <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dummyImages.cover})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8">
          <p className="text-xs tracking-widest mb-4 opacity-80">
            THE WEDDING OF
          </p>

          <h1
            className="font-serif text-4xl md:text-5xl mb-3"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            AINUN & FARHAN
          </h1>

          <p className="text-xs tracking-wider mb-16 opacity-80">
            MINGGU, 1 FEBRUARI 2025
          </p>

          <p
            className="text-sm italic mb-4 opacity-90"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Kepada
          </p>

          <button
            onClick={handleOpen}
            className="border border-white/60 px-8 py-3 text-xs tracking-widest hover:bg-white/10 transition-all duration-300"
          >
            Buka Undangan
          </button>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        `}</style>
      </div>
    );
  }

  // Section wrapper component
  const Section = React.forwardRef(
    ({ children, bgImage, className = "" }, ref) => (
      <section
        ref={ref}
        className={`h-screen w-full relative flex-shrink-0 snap-start snap-always ${className}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full">{children}</div>
      </section>
    )
  );

  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-black">
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 text-white"
      >
        <div className="space-y-1.5">
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 flex items-center justify-center transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="text-center space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => scrollToPage(item.page)}
              className={`block w-full text-lg transition-colors ${
                currentPage === item.page
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Indicator */}
      <div className="fixed bottom-6 left-6 z-30 text-white/60 text-xs">
        {currentPage}/{totalPages}
      </div>

      {/* Progress Bar (right side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30">
        <div className="h-32 w-0.5 bg-white/20 relative">
          <div
            className="absolute top-0 left-0 w-full bg-white/60 transition-all duration-500 ease-out"
            style={{ height: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Page 1: Home/Video */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute w-full h-full object-cover"
              poster={dummyImages.video}
            >
              {/* Ganti src dengan path video MP4 kamu */}
              <source src={bgVideo} type="video/mp4" />
              {/* Fallback ke image jika video tidak load */}
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8 pb-52">
            {/* <div className="w-16 h-16 mb-6 opacity-60">
              <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
              </svg>
            </div> */}

            <p className="text-xs tracking-widest mb-4 opacity-80">
              THE WEDDING OF
            </p>

            <h1
              className="font-serif text-4xl md:text-5xl mb-3"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              AINUN & FARHAN
            </h1>

            {/* <p className="text-xs tracking-wider mb-12 opacity-80">
              MINGGU, 1 FEBRUARI 2025
            </p> */}

            <button
              onClick={goToNextPage}
              className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center animate-bounce hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-2 h-2"
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
            style={{ backgroundImage: `url(${dummyImages.quote})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
            <h2
              className="font-serif text-2xl mb-6"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Q.S. AR-RUM : 21
            </h2>

            <p className="text-sm leading-relaxed opacity-90 mb-56">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
              benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang
              berpikir."
            </p>

            <p
              className="font-serif text-lg italic"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
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
            style={{ backgroundImage: `url(${dummyImages.groom})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
            <p className="text-xs tracking-widest mb-3 opacity-70">THE GROOM</p>

            <h2
              className="font-serif text-3xl md:text-4xl mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Farhan Taufiqul Hafidz
            </h2>

            <div className="flex items-center gap-4 mb-3">
              <p className="text-sm italic opacity-80">Putra ke 1 dari 2</p>
              <span className="w-16 h-px bg-white/40" />
            </div>

            <p className="text-sm opacity-70">
              Bapak Yudi Wahyudi dan Ibu Melly Mismawati
            </p>
          </div>
        </section>

        {/* Page 4: The Bride */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.bride})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-24">
            <p className="text-xs tracking-widest mb-3 opacity-70">THE BRIDE</p>

            <h2
              className="font-serif text-3xl md:text-4xl mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Ainun Sekar Arcturiani Putri
            </h2>

            <div className="flex items-center gap-4 mb-3">
              <p className="text-sm italic opacity-80">
                Putri pertama dari dua bersaudara
              </p>
              <span className="w-16 h-px bg-white/40" />
            </div>

            <p className="text-sm opacity-70">
              Bpk. Arcturus Arijanto & Ibu Erny Nandya Sukawati, S.Ars
            </p>
          </div>
        </section>

        {/* Page 5: Our Journey */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.journey})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 h-full flex flex-col text-white px-8 py-16 overflow-y-auto">
            <h2
              className="font-serif text-3xl text-center mb-8 flex-shrink-0"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              OUR JOURNEY
            </h2>

            <div className="space-y-6 text-sm flex-1 overflow-y-auto">
              <div>
                <p className="font-medium text-white/60 mb-2">2011 – 2023</p>
                <p className="leading-relaxed opacity-90">
                  Pertama kali berjumpa di bangku MTs, kami hanyalah dua teman
                  biasa. Takdir mempertemukan kami kembali di SMA yang sama,
                  lalu berlanjut ke perguruan tinggi, bahkan bekerja di instansi
                  yang sama. Namun status kami tak berubah—hanya teman, seperti
                  takdir sedang menunggu waktu yang tepat.
                </p>
              </div>

              <div>
                <p className="font-medium text-white/60 mb-2">November 2023</p>
                <p className="leading-relaxed opacity-90">
                  Tanpa diduga, langkah kami mulai berpadu dalam irama yang
                  sama. Komunikasi menjadi lebih hangat, kebersamaan terasa
                  lebih dekat. Dari sekadar teman, perlahan tumbuh rasa, dan
                  kami pun memulai sebuah hubungan.
                </p>
              </div>

              <div>
                <p className="font-medium text-white/60 mb-2">November 2024</p>
                <p className="leading-relaxed opacity-90">
                  Satu tahun berlalu dengan penuh cerita dan komitmen. Pada
                  tanggal 30 November 2024, ia menyatakan niat suci—melamarku
                  untuk menjadi pendamping hidupnya.
                </p>
              </div>

              <div>
                <p className="font-medium text-white/60 mb-2">Februari 2025</p>
                <p className="leading-relaxed opacity-90">
                  Langkah kami semakin mantap. Pertemuan dua keluarga menjadi
                  saksi niat baik dan restu yang kami harapkan. Lamaran pun
                  resmi disampaikan, mempertemukan dua hati dalam ikatan
                  keluarga.
                </p>
              </div>

              <div>
                <p className="font-medium text-white/60 mb-2">September 2025</p>
                <p className="leading-relaxed opacity-90">
                  Kini, kami bersiap untuk menapaki babak baru sebagai suami
                  istri. Perjalanan ini telah menjadi anugerah yang penuh makna.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Page 6: Venue */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.venue})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center text-white px-8">
            <h2
              className="font-serif text-3xl mb-8"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              MINGGU,
              <br />1 FEBRUARI 2026
            </h2>

            <div className="border-t border-white/20 pt-6 mb-8">
              <h3 className="text-sm tracking-wider mb-2">AKAD NIKAH</h3>
              <p className="text-lg font-light mb-1">08.00 - 10.00 WIB</p>
              <p className="text-lg font-light mb-4">Griya Ardhya Garini</p>
              <p className="text-xs opacity-70 leading-relaxed mb-4">
                Jl. Cisadane Jl. Riam Kiri No.Gang, RT.01/RW.03, Bendo, Kec.
                Kepanjenkidul, Kota Blitar, Jawa Timur
              </p>
              <button className="border border-white/40 px-6 py-2 text-xs tracking-wider hover:bg-white/10 transition-colors">
                LIHAT LOKASI
              </button>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-sm tracking-wider mb-2">
                RESEPSI PERNIKAHAN
              </h3>
              <p className="text-lg font-light mb-1">11.00 - 13.00 WIB</p>
              <p className="text-lg font-light mb-4">Griya Ardhya Garini</p>
              <p className="text-xs opacity-70 leading-relaxed mb-4">
                Jl. Cisadane Jl. Riam Kiri No.Gang, RT.01/RW.03, Bendo, Kec.
                Kepanjenkidul, Kota Blitar, Jawa Timur
              </p>
              <button className="border border-white/40 px-6 py-2 text-xs tracking-wider hover:bg-white/10 transition-colors">
                LIHAT LOKASI
              </button>
            </div>
          </div>
        </section>

        {/* Page 7: Countdown */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.countdown})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
            <div className="w-32 h-32 mb-6 border-2 border-white/30 overflow-hidden">
              <img
                src={dummyImages.gallery[0]}
                alt="couple"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs tracking-widest mb-2 opacity-70">
              THE WEDDING OF
            </p>
            <h2
              className="font-serif text-2xl mb-8"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              ISMI & ULIN
            </h2>

            <div className="flex gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl font-light">
                  {String(countdown.days).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-60 mt-1">Hari</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light">
                  {String(countdown.hours).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-60 mt-1">Jam</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light">
                  {String(countdown.minutes).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-60 mt-1">Menit</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light">
                  {String(countdown.seconds).padStart(2, "0")}
                </p>
                <p className="text-xs opacity-60 mt-1">Detik</p>
              </div>
            </div>

            <button className="border border-white/40 px-8 py-3 text-xs tracking-wider flex items-center gap-2 hover:bg-white/10 transition-colors">
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
            </button>
          </div>
        </section>

        {/* Page 8: RSVP */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.rsvp})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 h-full flex flex-col text-white px-8 py-16">
            <h2
              className="font-serif text-3xl italic mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Ucapan dan Doa
            </h2>

            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga
              apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a
              restu kepada kedua mempelai. Atas kehadiran dan doa restu, kami
              ucapkan terima kasih.
            </p>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
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
                <div className="transition-all duration-300">
                  <label className="text-xs tracking-wider opacity-70 block mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={wishData.name}
                    onChange={(e) =>
                      setWishData({ ...wishData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/40 py-3 text-white outline-none focus:border-white transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
              )}

              {wishStep === 2 && (
                <div className="transition-all duration-300">
                  <label className="text-xs tracking-wider opacity-70 block mb-4">
                    KONFIRMASI KEHADIRAN
                  </label>
                  <div className="space-y-3">
                    {["Hadir", "Tidak Hadir", "Masih Ragu"].map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setWishData({ ...wishData, attendance: option })
                        }
                        className={`w-full py-3 border text-sm transition-all duration-300 ${
                          wishData.attendance === option
                            ? "border-white bg-white/10"
                            : "border-white/40 hover:border-white/60"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wishStep === 3 && (
                <div className="transition-all duration-300">
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
                      className="w-12 h-12 border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors text-xl"
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
                      className="w-12 h-12 border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {wishStep === 4 && (
                <div className="transition-all duration-300">
                  <label className="text-xs tracking-wider opacity-70 block mb-2">
                    UCAPAN & DOA
                  </label>
                  <textarea
                    value={wishData.message}
                    onChange={(e) =>
                      setWishData({ ...wishData, message: e.target.value })
                    }
                    className="w-full bg-transparent border border-white/40 p-3 text-white outline-none focus:border-white transition-colors h-28 resize-none"
                    placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {wishStep > 1 && (
                <button
                  onClick={() => setWishStep(wishStep - 1)}
                  className="flex-1 border border-white/40 py-4 text-xs tracking-wider hover:bg-white/10 transition-colors"
                >
                  BACK
                </button>
              )}
              <button
                onClick={() => {
                  if (wishStep < 4) {
                    setWishStep(wishStep + 1);
                  } else {
                    if (wishData.name && wishData.message) {
                      setWishes([
                        {
                          name: wishData.name.toUpperCase(),
                          message: wishData.message,
                          date: new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }),
                        },
                        ...wishes,
                      ]);
                      setWishData({
                        name: "",
                        attendance: "",
                        guests: 1,
                        message: "",
                      });
                      setWishStep(1);
                      scrollToPage(9);
                    }
                  }
                }}
                className={`flex-1 bg-white/90 text-black py-4 text-xs tracking-wider hover:bg-white transition-colors ${
                  wishStep === 1 ? "w-full" : ""
                }`}
              >
                {wishStep < 4 ? "NEXT" : "KIRIM"}
              </button>
            </div>
          </div>
        </section>

        {/* Page 9: Wishes */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.wishes})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 h-full flex flex-col text-white px-8 py-16">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-serif text-3xl italic"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                Wishes
              </h2>
              <button
                onClick={() => scrollToPage(8)}
                className="text-xs tracking-wider flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                ADD
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

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {wishes.map((wish, index) => (
                <div
                  key={index}
                  className={`${index % 2 === 0 ? "text-left" : "text-right"}`}
                >
                  <h3
                    className="font-serif text-lg italic mb-1"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    {wish.name}
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed mb-1">
                    {wish.message}
                  </p>
                  <p className="text-xs opacity-50">{wish.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Page 10: Wedding Gift */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.gift})` }}
          >
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
              fitur di bawah ini :
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
                    <p className="text-xs text-white/60 mb-1">Bank BCA</p>
                    <p className="text-white mb-1">a.n. Moh. Ulin Nuha</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-white">1234567890</p>
                      <button
                        onClick={() => copyToClipboard("1234567890", "bca")}
                        className="text-xs text-white/60 hover:text-white transition-colors"
                      >
                        {copied === "bca" ? "✓ Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="border border-white/20 p-4">
                    <p className="text-xs text-white/60 mb-1">Bank Mandiri</p>
                    <p className="text-white mb-1">a.n. Ismi Dewi Astutik</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-white">0987654321</p>
                      <button
                        onClick={() => copyToClipboard("0987654321", "mandiri")}
                        className="text-xs text-white/60 hover:text-white transition-colors"
                      >
                        {copied === "mandiri" ? "✓ Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="border border-white/20 p-4">
                    <p className="text-xs text-white/60 mb-2">Kirim Kado</p>
                    <p className="text-sm text-white/80">
                      Jl. Cisadane Jl. Riam Kiri No.Gang, RT.01/RW.03, Bendo,
                      Kec. Kepanjenkidul, Kota Blitar, Jawa Timur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Page 11: Gallery */}
        <section
          ref={(el) => (sectionRefs.current[10] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url(${dummyImages.gallery[galleryIndex]})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end text-white px-8 pb-16">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setGalleryIndex(
                    galleryIndex > 0
                      ? galleryIndex - 1
                      : dummyImages.gallery.length - 1
                  )
                }
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="text-center">
                <h2
                  className="font-serif text-2xl"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  OUR GALLERY
                </h2>
                <p
                  className="font-serif text-lg italic opacity-70"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Ismi & Ulin
                </p>
              </div>

              <button
                onClick={() =>
                  setGalleryIndex(
                    galleryIndex < dummyImages.gallery.length - 1
                      ? galleryIndex + 1
                      : 0
                  )
                }
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {dummyImages.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === galleryIndex ? "bg-white w-4" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Page 12: Closing */}
        <section
          ref={(el) => (sectionRefs.current[11] = el)}
          className="h-screen w-full relative snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dummyImages.closing})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8">
            <div className="w-16 h-16 mb-6 opacity-60">
              <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
              </svg>
            </div>

            <p className="text-sm opacity-80 leading-relaxed mb-8 max-w-xs">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>

            <p className="text-xs tracking-wider mb-4 opacity-60">
              TERIMA KASIH
            </p>

            <h2
              className="font-serif text-3xl mb-2"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              ISMI & ULIN
            </h2>

            <p className="text-xs tracking-wider opacity-60">#ISMIUNLIN2025</p>
          </div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        .snap-y {
          scroll-snap-type: y mandatory;
        }
        
        .snap-start {
          scroll-snap-align: start;
        }
        
        .snap-always {
          scroll-snap-stop: always;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Hide scrollbar but keep functionality */
        .overflow-y-auto::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
        
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;
