"use client"  
import Meteors from "@/components/magicui/meteors"
import Input from "@/components/ui/input"
import Search from "@/components/Search"

const Home = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-8">
        Persona Builder
      </span>
      {/* <Input
        type="text"
        placeholder="Enter persona details..."
        className="w-64"
      /> */}
      <Search />
    </div>
  );
}

export default Home