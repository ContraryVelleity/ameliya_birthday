import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type ConfettiShape = 'circle' | 'square';

// ==================== LOADING SCREEN ====================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFFEFB]"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        🎂
      </motion.div>
      <motion.p
        className="font-baloo text-xl text-[#5A8D7A] text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Tungguin aku lagi ngupil bentar~
      </motion.p>
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-[#C1E8CF]"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <motion.p
        className="text-sm text-[#A9D6E5] mt-6 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ✨ preparing something special ✨
      </motion.p>
    </motion.div>
  );
}

// ==================== FLOATING BACKGROUND ====================
function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blobs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#C1E8CF] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob" />
      <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-[#A9D6E5] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-[#D9F0E0] rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[30%] right-[30%] w-64 h-64 bg-[#B9E4F5] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob" style={{ animationDelay: '6s' }} />

      {/* Stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 12 + 8}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute opacity-20"
          style={{ top: `${15 + i * 25}%` }}
          animate={{ x: ['-100%', '100vw'] }}
          transition={{
            duration: 40 + i * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 5,
          }}
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <ellipse cx="60" cy="40" rx="50" ry="20" fill="#E8F5E9" />
            <ellipse cx="40" cy="30" rx="30" ry="20" fill="#E8F5E9" />
            <ellipse cx="80" cy="30" rx="25" ry="18" fill="#E8F5E9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== CONFETTI EFFECT ====================
function ConfettiEffect({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const shapes: ConfettiShape[] = ['circle', 'square'];
      const colors = ['#C1E8CF', '#A9D6E5', '#D9F0E0', '#B9E4F5'];
      
      confetti({
        particleCount: 3,
        spread: 70,
        origin: { x: Math.random(), y: -0.1 },
        colors: colors,
        shapes: shapes,
        ticks: 200,
        gravity: 0.8,
        scalar: 0.8,
      });
    }, 300);

    return () => clearInterval(interval);
  }, [active]);

  return null;
}

// ==================== SPARKLE CURSOR ====================
function SparkleCursor() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        const newSparkle = { id: idRef.current++, x: e.clientX, y: e.clientY };
        setSparkles((prev) => [...prev.slice(-8), newSparkle]);
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute text-lg"
          style={{ left: s.x - 8, top: s.y - 8 }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}

// ==================== HERO SECTION ====================
function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Happy 21st Birthday, Ameliya!';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10">
      {/* Floating stickers */}
      <motion.div
        className="absolute top-[15%] left-[10%] text-4xl md:text-5xl"
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🧸
      </motion.div>
      <motion.div
        className="absolute top-[20%] right-[12%] text-4xl md:text-5xl"
        animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🐰
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] left-[8%] text-3xl md:text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🎀
      </motion.div>
      <motion.div
        className="absolute bottom-[30%] right-[8%] text-3xl md:text-4xl"
        animate={{ y: [0, -12, 0], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
      >
        🌸
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          className="font-pacifico text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#5A8D7A] mb-4 leading-tight"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {typedText}
          <span className="inline-block w-[3px] h-[1em] bg-[#5A8D7A] ml-1 animate-pulse" />
        </motion.h1>

        <motion.div
          className="text-5xl md:text-7xl my-6"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂
        </motion.div>

        <motion.p
          className="font-poppins text-base sm:text-lg md:text-xl text-[#5A8D7A]/80 max-w-lg mx-auto mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Officially not a baby anymore{' '}
          <span className="text-[#A9D6E5]">(but you'll forever be my baby</span>{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            &lt;3
          </motion.span>
          <span className="text-[#A9D6E5]">)</span>
        </motion.p>

        <motion.button
          onClick={onCtaClick}
          className="glass-mint px-8 py-4 rounded-3xl font-baloo text-lg text-[#5A8D7A] shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(193, 232, 207, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Click this!! &gt;&gt; ✨
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-[#5A8D7A]/50 text-sm font-poppins">scroll down~</span>
      </motion.div>
    </section>
  );
}

// ==================== LETTER SECTION ====================
function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const letterContent = `Going to the garden to pick some basil,
Jasmine flowers bloom white and bright.
Happy birthday, my beloved Amel,
Your beautiful face shines like moonlight.

🌙

Halooo sayangkuuu (❁´◡`❁)

Gak kerasa yaa sekarang umur kamu udah 21 tahun?? (⁄ ⁄•⁄ω⁄•⁄ ⁄)
Yaahh udah gak bisa lagi ngeles "aku kan masih bayi", sekarang kamu soalnya udah dewasa beneran, udah jadi mbak mbak gemes (emang selalu gemes heheh) (/ω＼)
Tapi tenang ajaa, buat aku kamu bakal tetep jadi bayi gede aku selamanya (˶ᵔ ᵕ ᵔ˶) ♡

Kamu adalah orang yang bikin semuanya jadi lebih baik cuma karena kamu ada di situ.
I can forget any of my bad thoughts as soon as I see your smile.
And your laugh has always been my favorite music to hear. (´｡• ω •｡`)

Untuk 21 tahun kamu jadi manusia paling hebat dan paling gemesshin,
dan untuk bertahun-tahun ke depan yang bakal aku isi dengan ngisengin kamu terus pake cinta aku yang lebay ini mwehehehe ヾ(≧▽≦*)o

Selamat ulang tahun sayangkuu, manusia favoritku se alam semesta :3 (｡>﹏<｡) ♡;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10">
      <motion.h2
        className="font-baloo text-2xl sm:text-3xl md:text-4xl text-[#5A8D7A] mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        A Little Letter For You 💌
      </motion.h2>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="glass rounded-3xl p-8 md:p-12 shadow-xl text-center max-w-sm mx-auto">
              <motion.div
                className="text-6xl md:text-8xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💌
              </motion.div>
              <p className="font-baloo text-[#5A8D7A] text-lg">
                Tap to open! ✨
              </p>
              <p className="text-sm text-[#5A8D7A]/60 mt-2 font-poppins">
                (i wrote this for you~)
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="max-w-md mx-auto w-full"
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="glass-mint rounded-3xl p-6 md:p-8 shadow-xl">
              <motion.div
                className="text-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl">🌸</span>
              </motion.div>
              <div className="font-poppins text-sm md:text-base text-[#5A8D7A] leading-relaxed whitespace-pre-line">
                {letterContent}
              </div>
              <motion.button
                className="mt-6 mx-auto block glass-blue px-6 py-2 rounded-2xl font-poppins text-sm text-[#5A8D7A] cursor-pointer"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                close ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ==================== 21 REASONS SECTION ====================
function ReasonsSection() {
  const reasons = [
    { icon: '😊', text: 'Your smile lights up my world' },
    { icon: '😊', text: "Your smile lights up my world" },
    { icon: '🤗', text: "Your hugs feel like home" },
    { icon: '😂', text: "You make me laugh until I cry" },
    { icon: '💪', text: "You're stronger than you think" },
    { icon: '🌟', text: "You inspire me daily" },
    { icon: '🎵', text: "Your voice is my favorite melody" },
    { icon: '🧠', text: "You're ridiculously smart" },
    { icon: '🦋', text: "You make boring things fun" },
    { icon: '🌈', text: "You bring color to gray days" },
    { icon: '☕', text: "Coffee dates with you = heaven" },
    { icon: '🎭', text: "Your random faces crack me up" },
    { icon: '💫', text: "You believe in me always" },
    { icon: '🍕', text: "You share your food (mostly)" },
    { icon: '🌙', text: "Late night talks with you hit different" },
    { icon: '🎨', text: "You're creative and unique" },
    { icon: '🐱', text: "You love animals so pure" },
    { icon: '💝', text: "Your heart is the biggest" },
    { icon: '🌺', text: "You're beautiful inside & out" },
    { icon: '🎯', text: "You always know what to say" },
    { icon: '🧸', text: "You make me feel safe" },
    { icon: '♾', text: "You're my forever person" },
  ];

  return (
    <section className="min-h-screen px-4 py-20 relative z-10">
      <motion.h2
        className="font-baloo text-2xl sm:text-3xl md:text-4xl text-[#5A8D7A] mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        21 Reasons Why You're My Favorite 🥰
      </motion.h2>
      <motion.p
        className="text-center text-[#5A8D7A]/70 font-poppins text-sm mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        (hover/tap each card~)
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-4 max-w-6xl mx-auto">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="card-flip h-32 md:h-36"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="card-flip-inner relative w-full h-full">
              {/* Front */}
              <div className="card-front absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-2 shadow-md">
                <span className="text-2xl md:text-3xl mb-1">{reason.icon}</span>
                <span className="font-baloo text-xs md:text-sm text-[#5A8D7A]">#{index + 1}</span>
              </div>
              {/* Back */}
              <div className="card-back absolute inset-0 glass-mint rounded-2xl flex items-center justify-center p-3 shadow-md">
                <p className="font-poppins text-xs md:text-sm text-[#5A8D7A] text-center leading-tight">
                  {reason.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==================== GALLERY SECTION ====================
function GallerySection() {
  const photos = [
    { color: '#C1E8CF', emoji: '📸', caption: 'Our first adventure~' },
    { color: '#A9D6E5', emoji: '🌅', caption: 'That sunset tho' },
    { color: '#D9F0E0', emoji: '🤳', caption: 'Silly faces only' },
    { color: '#B9E4F5', emoji: '🎉', caption: 'Celebration mode!' },
    { color: '#E8F5E9', emoji: '💕', caption: 'Us being us' },
    { color: '#E3F2FD', emoji: '🌸', caption: 'Cherry blossom day' },
  ];

  return (
    <section className="min-h-screen px-4 py-20 relative z-10">
      <motion.h2
        className="font-baloo text-2xl sm:text-3xl md:text-4xl text-[#5A8D7A] mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Memory Lane 📷
      </motion.h2>
      <motion.p
        className="text-center text-[#5A8D7A]/70 font-poppins text-sm mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        (scroll sideways~)
      </motion.p>

      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-8 px-4 max-w-6xl mx-auto snap-x snap-mandatory">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 snap-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="polaroid rounded-2xl w-52 md:w-64"
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-full h-44 md:h-52 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: photo.color }}
              >
                <span className="text-5xl md:text-6xl">{photo.emoji}</span>
              </div>
              <p className="font-poppins text-xs md:text-sm text-[#5A8D7A] text-center mt-3">
                {photo.caption}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==================== CAKE SECTION ====================
function CakeSection() {
  const [wobble, setWobble] = useState(false);

  const handleCakeClick = () => {
    setWobble(true);
    setTimeout(() => setWobble(false), 500);

    // Burst confetti on cake click
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#C1E8CF', '#A9D6E5', '#D9F0E0', '#B9E4F5'],
      shapes: ['circle'],
      scalar: 0.8,
    });
  };

  return (
    <section className="py-16 flex flex-col items-center relative z-10">
      <motion.h2
        className="font-baloo text-xl sm:text-2xl md:text-3xl text-[#5A8D7A] mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Make a wish! 🕯️
      </motion.h2>

      <motion.div
        className="cursor-pointer select-none"
        onClick={handleCakeClick}
        animate={wobble ? { rotate: [-5, 5, -3, 3, 0] } : {}}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Cake SVG */}
        <div className="relative">
          <svg width="180" height="200" viewBox="0 0 180 200" className="drop-shadow-lg">
            {/* Plate */}
            <ellipse cx="90" cy="185" rx="80" ry="12" fill="#E8F5E9" />
            
            {/* Bottom tier */}
            <rect x="25" y="130" width="130" height="55" rx="15" fill="#C1E8CF" />
            <rect x="25" y="130" width="130" height="15" rx="8" fill="#D9F0E0" />
            
            {/* Top tier */}
            <rect x="45" y="80" width="90" height="55" rx="12" fill="#A9D6E5" />
            <rect x="45" y="80" width="90" height="12" rx="6" fill="#B9E4F5" />
            
            {/* Frosting drips */}
            <circle cx="55" cy="130" r="8" fill="#D9F0E0" />
            <circle cx="80" cy="133" r="6" fill="#D9F0E0" />
            <circle cx="110" cy="131" r="7" fill="#D9F0E0" />
            <circle cx="135" cy="129" r="5" fill="#D9F0E0" />
            
            {/* Candles */}
            <rect x="75" y="55" width="6" height="28" rx="3" fill="#FFFEFB" stroke="#C1E8CF" strokeWidth="1" />
            <rect x="100" y="55" width="6" height="28" rx="3" fill="#FFFEFB" stroke="#A9D6E5" strokeWidth="1" />
            
            {/* Flames */}
            <ellipse cx="78" cy="50" rx="5" ry="8" fill="#C1E8CF" opacity="0.8" />
            <ellipse cx="103" cy="50" rx="5" ry="8" fill="#A9D6E5" opacity="0.8" />
            
            {/* Number 21 */}
            <text x="90" y="115" textAnchor="middle" fontFamily="Baloo 2, cursive" fontSize="22" fill="#5A8D7A" fontWeight="bold">21</text>
            
            {/* Decorations */}
            <circle cx="50" cy="155" r="4" fill="#B9E4F5" />
            <circle cx="70" cy="160" r="3" fill="#D9F0E0" />
            <circle cx="110" cy="155" r="4" fill="#B9E4F5" />
            <circle cx="130" cy="160" r="3" fill="#D9F0E0" />
          </svg>

          {/* Sparkles around cake */}
          <motion.span
            className="absolute top-0 left-0 text-lg"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute top-4 right-0 text-lg"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute bottom-8 left-2 text-sm"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ⭐
          </motion.span>
        </div>
      </motion.div>

      <motion.p
        className="text-sm text-[#5A8D7A]/60 font-poppins mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        (tap the cake! 🎂)
      </motion.p>
    </section>
  );
}

// ==================== FOOTER / SURPRISE SECTION ====================
function FooterSection() {
  const [showModal, setShowModal] = useState(false);

  const handleSurprise = () => {
    setShowModal(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#C1E8CF', '#A9D6E5', '#D9F0E0', '#B9E4F5'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  };

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 relative z-10">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-5xl md:text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎁
        </motion.div>

        <h2 className="font-baloo text-xl sm:text-2xl md:text-3xl text-[#5A8D7A] mb-6">
          One more thing...
        </h2>

        <motion.button
          onClick={handleSurprise}
          className="glass-mint px-8 py-5 rounded-3xl font-baloo text-base sm:text-lg text-[#5A8D7A] shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Pencet ini kalau kamu kangen aku :3 💕
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#FFFEFB]/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            
            <motion.div
              className="glass-mint rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl relative z-10"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Hearts explosion */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-2xl"
                    initial={{ 
                      x: '50%', 
                      y: '50%', 
                      opacity: 1,
                      scale: 0 
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`, 
                      opacity: 0,
                      scale: 1.5 
                    }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                  >
                    💕
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💖
              </motion.div>

              <h3 className="font-pacifico text-2xl md:text-3xl text-[#5A8D7A] mb-4">
                ILY 231x!
              </h3>
              <p className="font-baloo text-lg text-[#5A8D7A]/80 mb-2">
                - dari Rama
              </p>
              <p className="font-poppins text-sm text-[#5A8D7A]/60 mb-6">
                Happy 21st birthday, my lovely girl. You're the best thing that ever happened to me. (*/ω＼*)
              </p>

              <motion.button
                onClick={() => setShowModal(false)}
                className="glass-blue px-6 py-3 rounded-2xl font-poppins text-sm text-[#5A8D7A] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                aku juga kangen kamu :3 ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer text */}
      <motion.p
        className="mt-16 text-xs text-[#5A8D7A]/40 font-poppins text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        made with 💕 by Rama • Happy 21st Ameliya Virginnita!
      </motion.p>
    </section>
  );
}

// ==================== MUSIC TOGGLE ====================
function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.button
      className="fixed top-4 right-4 z-[100] glass rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
      onClick={() => setIsPlaying(!isPlaying)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
      transition={isPlaying ? { duration: 1, repeat: Infinity } : {}}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <span className="text-xl">{isPlaying ? '🎵' : '🔇'}</span>
    </motion.button>
  );
}

// ==================== MAIN APP ====================
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    // Start confetti after loading
    const timer = setTimeout(() => {
      setConfettiActive(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToLetter = () => {
    const letterSection = document.getElementById('letter-section');
    if (letterSection) {
      letterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEFB] relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <FloatingBackground />
          <ConfettiEffect active={confettiActive} />
          <SparkleCursor />
          <MusicToggle />

          <main>
            <HeroSection onCtaClick={scrollToLetter} />
            
            <div id="letter-section">
              <LetterSection />
            </div>

            <CakeSection />

            <ReasonsSection />

            <GallerySection />

            <FooterSection />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
