import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-5 border-t border-cardborder mt-16">
      <div className="flex items-center gap-2">
        <Image src="/assets/logo.png" alt="FitLog logo" width={18} height={18} />
        <span className="font-bold text-sm">FITLOG</span>
      </div>
      <p className="text-xs text-gray-400">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}
