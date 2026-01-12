import React, { useState, useEffect, useRef } from "react";
import { Pages1to4, Pages5to12 } from "./WeddingContent";

// Assets
import brides from "./assets/brides.jpeg";
import grooms from "./assets/groom.jpg";
import doa from "./assets/doa.jpeg";
import cover from "./assets/cover.jpeg";
import bgVideo from "./assets/bg_video.mp4";
import story from "./assets/story.jpg";
//sip

const WeddingInvitation = () => {
  // States
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

  // Refs
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const sectionRefs = useRef([]);

  // Constants
  const totalPages = 12;
  const weddingDate = new Date("2026-02-01T08:00:00");
  const fontSerif = { fontFamily: "Playfair Display, Georgia, serif" };

  // Assets
  const images = {
    cover,
    bgVideo,
    doa,
    grooms,
    brides,
    story,
    gallery: [
      "https://picsum.photos/seed/gallery1/800/1200",
      "https://picsum.photos/seed/gallery2/800/1200",
      "https://picsum.photos/seed/gallery3/800/1200",
      "https://picsum.photos/seed/gallery4/800/1200",
      "https://picsum.photos/seed/gallery5/800/1200",
    ],
  };

  // Menu items
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

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = weddingDate - new Date();
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

  // Scroll observer
  useEffect(() => {
    if (!isOpen) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) setCurrentPage(index + 1);
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

  // Handlers
  const handleOpen = () => {
    setIsOpen(true);
    audioRef.current?.play().catch(() => {});
  };

  const scrollToPage = (page) => {
    sectionRefs.current[page - 1]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const goToNextPage = () =>
    currentPage < totalPages && scrollToPage(currentPage + 1);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const submitWish = () => {
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
      setWishData({ name: "", attendance: "", guests: 1, message: "" });
      setWishStep(1);
      scrollToPage(9);
    }
  };

  // Props untuk pages
  const pageProps = {
    sectionRefs,
    images,
    fontSerif,
    bgVideo,
    goToNextPage,
    scrollToPage,
    countdown,
    wishStep,
    setWishStep,
    wishData,
    setWishData,
    wishes,
    submitWish,
    showGiftModal,
    setShowGiftModal,
    copied,
    copyToClipboard,
    galleryIndex,
    setGalleryIndex,
  };

  // Opening Cover
  if (!isOpen) {
    return (
      <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.cover})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8">
          <p className="text-xs tracking-widest mb-4 opacity-80">
            THE WEDDING OF
          </p>
          <h1 className="text-4xl md:text-5xl mb-3" style={fontSerif}>
            AINUN & FARHAN
          </h1>
          <p className="text-xs tracking-wider mb-16 opacity-80">
            MINGGU, 1 FEBRUARI 2026
          </p>
          <p className="text-sm italic mb-4 opacity-90" style={fontSerif}>
            Kepada
          </p>
          <button
            onClick={handleOpen}
            className="border border-white/60 px-8 py-3 text-xs tracking-widest hover:bg-white/10 transition-all"
          >
            Buka Undangan
          </button>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');`}</style>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-black">
      <audio ref={audioRef} loop>
        <source src="/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 text-white"
      >
        <div className="space-y-1.5">
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
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
              style={fontSerif}
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

      {/* Progress Bar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30">
        <div className="h-32 w-0.5 bg-white/20 relative">
          <div
            className="absolute top-0 left-0 w-full bg-white/60 transition-all duration-500"
            style={{ height: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <Pages1to4 {...pageProps} />
        <Pages5to12 {...pageProps} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .scroll-smooth { scroll-behavior: smooth; }
        .snap-y { scroll-snap-type: y mandatory; }
        .snap-start { scroll-snap-align: start; }
        .snap-always { scroll-snap-stop: always; }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .overflow-y-auto::-webkit-scrollbar { width: 0; background: transparent; }
        .overflow-y-auto { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;
