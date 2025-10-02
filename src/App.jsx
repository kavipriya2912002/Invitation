import { useState, useEffect } from "react";
import photo1 from "./photos/photo1.png";
import love4 from "./photos/loveback4.jpg";
import song from "./photos/song.mpeg";
import love1 from "./photos/love1.jpg";
import love2 from "./photos/love2.jpg";
import love3 from "./photos/love3.jpg";

// ⏳ Countdown hook
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = new Date(targetDate) - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(timer);
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function App() {
  const weddingDate = "2025-10-24T06:00:00";
  const timeLeft = useCountdown(weddingDate);

  // 🎵 Music state (initially ON)
  const [musicOn, setMusicOn] = useState(false);
  const [rsvp, setRsvp] = useState(null);

  const handleRsvp = (choice) => setRsvp(choice);

  const heroBg = photo1;
  const back4 = love4;

  // Play/pause music whenever musicOn changes
  useEffect(() => {
    const audio = document.getElementById("weddingAudio");
    if (musicOn) {
      audio.play().catch(() => {
        console.log("Autoplay blocked; click button to play");
      });
    } else {
      audio.pause();
    }
  }, [musicOn]);

  return (
    <div className="font-sans scroll-smooth text-gray-800">
      {/* 🔊 Background Audio */}
      <audio id="weddingAudio" src={song} loop />

      {/* 1️⃣ Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative z-10">
          <h1 className="lovers-quarrel-regular text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-bounce text-white">
            We Are Getting Married💍!
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold text-white">
            Hari ❤️ Kavi
          </h2>
          <p className="cutive-mono-regular text-lg sm:text-xl md:text-2xl animate-pulse text-white">
            24th October 2025
          </p>
          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="emilys-candy-regular mt-8 bg-white px-6 py-3 rounded-full shadow-md text-base sm:text-lg hover:bg-pink-100 transition"
          >
            Come let's Celebrate 🎉
          </button>
        </div>

        <button
          onClick={() => setMusicOn(!musicOn)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white px-4 py-2 rounded-full shadow text-sm sm:text-base"
        >
          {musicOn ? "🔊 Music On" : "🔇 Music Off"}
        </button>
      </section>

      {/* 2️⃣ Countdown */}
      <section
        className="py-16 text-center px-4 relative"
        style={{
          backgroundImage: `url(${love1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative z-10">
          <h2 className="saira-300 text-3xl sm:text-4xl font-extrabold mb-10 text-white">
            Happily Ever After Starts In…
          </h2>

          {timeLeft ? (
            <div className="flex justify-center gap-3 flex-wrap">
              {Object.entries(timeLeft).map(([unit, value]) => {
                const labels = {
                  days: "Days",
                  hours: "Hours",
                  minutes: "Mins",
                  seconds: "Secs",
                };
                return (
                  <div
                    key={unit}
                    className="flex flex-col items-center bg-pink-100 rounded-xl shadow-md px-4 py-2 border border-pink-200"
                  >
                    <span className="text-2xl sm:text-3xl font-bold ">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-xs sm:text-sm text-pink-500">
                      {labels[unit]}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-2xl sm:text-3xl text-pink-600 animate-bounce mt-4">
              🎉 It’s Wedding Time! 💖✨
            </p>
          )}
        </div>
      </section>

      {/* 3️⃣ Wedding Location */}
      <section
        className="py-16 text-center px-4 relative bg-blue-200"
        style={{
          backgroundImage: `url(${love2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-xl mx-auto text-white">
          <h2 className="cutive-mono-regular text-3xl sm:text-4xl font-bold mb-4">
            📍 Wedding Location
          </h2>
          <p className="cutive-mono-regular text-lg sm:text-xl mb-4">
            Groom's Home
          </p>
          <a
            href="https://maps.app.goo.gl/wpFyu6A1NfqNB5L67?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition text-white font-semibold"
          >
            View on Google Maps
          </a>
        </div>
      </section>

      {/* 7️⃣ RSVP */}
      <section
        className="py-16 px-4 relative"
        style={{
          backgroundImage: `url(${love3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="saira-300 text-3xl sm:text-4xl font-bold mb-8 text-white">
            Will You Join Our Celebration?
          </h2>

          {rsvp ? (
            <div className="inline-block px-6 py-3 text-black text-xl sm:text-2xl font-semibold bg-amber-300 rounded-full shadow-md">
              {rsvp === "yes"
                ? "🎉 Thank you! We can't wait to celebrate with you! 💖"
                : "💌 Thank you for sending your love! We'll miss you at the event 😇"}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => handleRsvp("yes")}
                className="cutive-mono-regular px-6 py-3 rounded-full bg-green-300 text-black shadow hover:bg-green-400 transition"
              >
                Yes, I’ll be there!
              </button>
              <button
                onClick={() => handleRsvp("love")}
                className="cutive-mono-regular px-6 py-3 rounded-full bg-blue-300 text-black font-extrabold shadow hover:bg-blue-400 transition"
              >
                ❤️ Warm wishes across the miles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 9️⃣ Footer */}
      <footer className="py-6 text-center relative bg-blue-300">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white">
          <p className="cutive-mono-regular text-base sm:text-lg font-semibold">
            With love, Kavi & Hari 💕
          </p>
          <p className="emilys-candy-regular text-xs sm:text-sm">
            #KaviWedsHari
          </p>
        </div>
      </footer>
    </div>
  );
}
