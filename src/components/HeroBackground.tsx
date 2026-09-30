export function HeroBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ zIndex: 0 }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "grayscale(1) contrast(1.1)",
        }}
        src="/hero-wave.mp4"
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Gradient scrim so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
