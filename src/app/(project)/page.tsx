"use client"
import { LanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import Logo from "@/images/circle.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2 text-black">
      <Image className="w-1/2 pointer-events-none" src={Logo} alt="" />
      <button onClick={() => router.push("/login")} type="button" >
        {lang == "tr" ? "Giriş Yap" : "Login"}
      </button>
    </div>
  );
}
