import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-14 bg-card border-b border-cardborder">
      <div className="max-w-xl">
        <p className="text-accent text-xs font-bold tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-4">
          Train with intent. Log every set.
        </h1>
        <p className="text-gray-400 mb-6">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-block bg-accent text-black font-semibold px-5 py-2 rounded"
        >
          Browse Workouts
        </a>
      </div>

      <Image
        src="/assets/banner.png"
        alt="FitLog hero"
        width={320}
        height={320}
        className="w-64 md:w-80"
      />
    </section>
  );
}
