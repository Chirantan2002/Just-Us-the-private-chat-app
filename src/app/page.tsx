"use client";

import DotGrid from "@/components/DotGrid";
import { Monda } from "next/font/google";
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { HiBolt } from "react-icons/hi2";
import { GoAlertFill } from "react-icons/go";
import { Archivo_Black } from "next/font/google";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
});

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
};

export default Page;

function Lobby() {
  const { username } = useUsername();
  const router = useRouter();

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");
  const [showMessage, setShowMessage] = useState(true);

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  useEffect(() => {
    if (wasDestroyed || error) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        router.replace("/"); // optional: clears query params
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [wasDestroyed, error, router]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#000524]"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      {/* dot grid bg  */}
      <DotGrid
        dotSize={10}
        gap={15}
        baseColor="#033270"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        className="opacity-50 blur-[2px]"
      />

      <div className="absolute w-full max-w-md space-y-8 px-4">
        {showMessage && wasDestroyed && (
          <div className="bg-red-950/50 border rounded-lg border-red-900 p-4 text-center transition-opacity duration-500">
            <span className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
              <GoAlertFill /> Room Destroyed...
            </span>
            <p className="text-zinc-100 text-xs mt-1">
              All messages were permanently deleted.
            </p>
          </div>
        )}
        {showMessage && error === "room-not-found" && (
          <div className="bg-red-950/50 border rounded-lg border-red-900 p-4 text-center transition-opacity duration-500">
            <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
              <GoAlertFill /> Room Not Found...
            </p>
            <p className="text-zinc-100 text-xs mt-1">
              This room may have expired or never existed.
            </p>
          </div>
        )}
        {showMessage && error === "room-full" && (
          <div className="bg-red-950/50 border rounded-lg border-red-900 p-4 text-center transition-opacity duration-500">
            <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
              <GoAlertFill /> Room is Full...
            </p>
            <p className="text-zinc-100 text-xs mt-1">
              This room is at maximum capacity.
            </p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-black/10 backdrop-blur border border-[#c6f91f] rounded-full px-2 py-1">
            <span
              className={`${monda.className}  flex items-center justify-center gap-2 font-bold uppercase text-[10px] md:text-sm text-[#c6f91f]`}
            >
              <HiBolt className="animate-pulse rotate-15" />
              welcome
            </span>
          </div>
          <h1
            className={`${archivoBlack.className} text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#c6f91f] m-4 uppercase`}
          >
            it&apos;s just us!
          </h1>
        </div>

        <div className="text-center space-y-2">
          <p className="text-[#c6f91f] text-xs md:text-[15px]">
            Private chat, just for two...
          </p>
        </div>

        <div className="border border-[#c6f91f]/50 rounded-lg bg-white/10 p-6 m-4 backdrop-blur-[5px]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center justify-center text-[#c6f91f]">
                Your Identity...
              </label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-[#8eadc4] font-mono rounded-lg">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-neutral-950 hover:text-[#c6f91f] transition-colors duration-200 mt-2 cursor-pointer disabled:opacity-50 rounded-lg"
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
