import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Pages1to4, Pages5to12 } from "./WeddingContent";
import { addWish, addRSVP, subscribeToWishes } from "./firebase";

// Assets
import brides from "./assets/brides.jpeg";
import grooms from "./assets/groom.jpg";
import doa from "./assets/doa.jpeg";
import cover from "./assets/cover.jpeg";
import bgVideo from "./assets/bg_video.mp4";
import story from "./assets/story.jpg";
import coverDesktop from "./assets/cover-desktop.jpg";
import weddingMusic from "./assets/wedding-music.mp3"; // Import musik

//galery
import gal1 from "./galery/gal1.jpg";
import gal2 from "./galery/gal2.jpg";
import gal3 from "./galery/gal3.jpeg";
import gal4 from "./galery/gal4.jpg";
import gal5 from "./galery/gal5.jpg";
import gal6 from "./galery/gal6.jpg";
import gal7 from "./galery/gal7.jpg";
import gal8 from "./galery/gal8.jpg";
import gal9 from "./galery/gal9.jpg";
import gal10 from "./galery/gal10.jpg";
import gal11 from "./galery/gal11.jpg";

const WeddingInvitation = () => {
  // ==========================================
  // GET GUEST NAME FROM URL SLUG
  // ==========================================
  const { slug } = useParams();

  // Convert slug to guest name
  // "bakwan-ferizan-ginting" -> "Bakwan Ferizan Ginting"
  const getGuestName = (slug) => {
    if (!slug) return null;
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const guestName = getGuestName(slug);

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
    name: guestName || "",
    attendance: "",
    guests: 1,
    message: "",
  });
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copied, setCopied] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // State untuk musik

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
      gal1,
      gal2,
      gal3,
      gal4,
      gal5,
      gal6,
      gal7,
      gal8,
      gal9,
      gal10,
      gal11,
    ],
    coverDesktop,
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

  // Update wishData.name when guestName changes
  useEffect(() => {
    if (guestName) {
      setWishData((prev) => ({ ...prev, name: guestName }));
    }
  }, [guestName]);

  // Firebase: Subscribe to wishes
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToWishes((wishesData) => {
      setWishes(wishesData);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  // ==========================================
  // MUSIC HANDLERS
  // ==========================================
  const handleOpen = () => {
    setIsOpen(true);
    // Auto play musik saat buka undangan
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Set volume 50%
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay prevented:", err);
            setIsPlaying(false);
          });
      }
    }, 100);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Play error:", err));
      }
    }
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

  // Submit wish & RSVP
  const submitWish = async () => {
    if (!wishData.name || !wishData.message) {
      alert("Mohon isi nama dan ucapan!");
      return;
    }

    setIsSubmitting(true);

    try {
      const rsvpResult = await addRSVP({
        name: wishData.name,
        attendance: wishData.attendance,
        guests: wishData.guests,
        message: wishData.message,
      });

      const wishResult = await addWish({
        name: wishData.name.toUpperCase(),
        message: wishData.message,
      });

      if (rsvpResult.success && wishResult.success) {
        setWishData({
          name: guestName || "",
          attendance: "",
          guests: 1,
          message: "",
        });
        setWishStep(1);
        scrollToPage(9);
        alert("Terima kasih atas ucapan dan konfirmasi kehadiran Anda! 🎉");
      } else {
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
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
    isLoading,
    isSubmitting,
    showGiftModal,
    setShowGiftModal,
    copied,
    copyToClipboard,
    galleryIndex,
    setGalleryIndex,
    guestName,
  };

  // Background image untuk desktop (di belakang invitation)
  const desktopBgStyle = {
    backgroundImage: `url(${images.coverDesktop})`,
    backgroundSize: "contain",
    backgroundPosition: "center right",
  };

  // ==========================================
  // OPENING COVER - dengan Guest Name
  // ==========================================
  if (!isOpen) {
    return (
      <div className="min-h-screen w-200 flex bg-black relative">
        {/* Desktop Background - Hidden on mobile */}
        <div
          className="hidden md:block fixed inset-0 z-0"
          style={desktopBgStyle}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Invitation Container */}
        <div className="h-screen w-full max-w-md relative overflow-hidden z-10">
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
            <p className="text-xs tracking-wider mb-12 opacity-80">
              MINGGU, 1 FEBRUARI 2026
            </p>

            {/* ====== GUEST NAME SECTION ====== */}
            <div className="mb-8">
              <p className="text-sm italic mb-2 opacity-70" style={fontSerif}>
                Kepada Yth.
              </p>
              {guestName ? (
                <>
                  <p className="text-2xl font-medium mb-1" style={fontSerif}>
                    {guestName}
                  </p>
                  <p className="text-xs opacity-60">di Tempat</p>
                </>
              ) : (
                <p className="text-lg opacity-80" style={fontSerif}>
                  Bapak/Ibu/Saudara/i
                </p>
              )}
            </div>
            {/* ================================ */}

            <button
              onClick={handleOpen}
              className="border border-white/60 px-8 py-3 text-xs tracking-widest hover:bg-white/10 transition-all"
            >
              Buka Undangan
            </button>
          </div>
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-black relative">
      {/* Desktop Background - Hidden on mobile */}
      <div className="hidden md:block fixed inset-0 z-0" style={desktopBgStyle}>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Invitation Container */}
      <div className="h-screen w-full max-w-md relative overflow-hidden bg-black z-10">
        {/* Audio Element */}
        <audio ref={audioRef} loop preload="auto">
          <source src={weddingMusic} type="audio/mpeg" />
        </audio>

        {/* Music Control Button */}
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            // Pause Icon dengan animasi
            <div className="relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              {/* Music wave animation */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          ) : (
            // Play Icon
            <svg
              className="w-5 h-5 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

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
    </div>
  );
};

export default WeddingInvitation;
