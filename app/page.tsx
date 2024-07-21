import Ripple from "@/components/magicui/Ripple";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          height={100}
          width={100}
          alt="OA_Logo"
          src={"/oa_logo.svg"}
        />
        <p className="z-10 whitespace-pre-wrap text-center text-lg italic tracking-tighter text-black/20 mt-2">
          Coming Soon
        </p>
        <Ripple />
      </div>
    </main>
  );
}
