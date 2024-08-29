import Meteors from "@/components/magicui/meteors"

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Persona Builder
      </span>
    </div>
  );
}
