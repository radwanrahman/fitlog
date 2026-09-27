import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-4xl font-extrabold mb-3">404</h1>
      <p className="text-gray-400 mb-6">This page doesn&apos;t exist.</p>
      <Link href="/" className="bg-accent text-black px-4 py-2 rounded font-semibold">
        Go back home
      </Link>
    </main>
  );
}
