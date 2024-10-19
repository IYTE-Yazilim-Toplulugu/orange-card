"use client"
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

import OrangeTik from "@/images/turuncu-tik-logo.svg";
import Logo from "@/images/circle.png";
import Image from "next/image";
import LanguageBtn from "../components/LanguageBtn";
import LoginBtn from "../components/LoginBtn";
import { shopData } from "../data";
import ShopCard from "../components/ShopCard";

export default function Home() {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="h-full relative">
      
      <div className="relative w-full h-full">
          <LanguageBtn />
      </div>

      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center">
          <Image className="h-64 pointer-events-none" src={OrangeTik} alt="" />
        </div>
        <div className="flex justify-center items-center">
          <Image className="h-32 w-auto pointer-events-none" src={Logo} alt="" />
        </div>
      </div>

      {/* Content */}
      <div className="text-black px-8 -mt-8">
        <h2 className="font-semibold text-xl ">
          {lang == "tr" ? "Anlaşmalı Mekanlar:" : "Affiliated Venues:"}
        </h2>

        <div className="flex flex-col gap-4 mt-5">
          {
            shopData.map((sd, key) => {
              return (
                <ShopCard key={key} name={lang == "tr" ? sd.name_tr : sd.name_en} advantage={lang == "tr" ? sd.advantage_tr : sd.advantage_en} location={sd.location} />
              )
            })
          }
        </div>

        <p className="my-6 text-black/60 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
        <div className="h-16" />
      </div>

      <LoginBtn />
    </div>
  );
}
