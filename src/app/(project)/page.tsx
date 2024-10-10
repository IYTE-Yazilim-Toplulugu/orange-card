"use client"
import Image from "next/image";
import bg from "@/images/uyelik-karti-tr.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [lang, setLang] = useState<string | null>("tr");
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const browserLang = navigator.language;
        const language = browserLang.startsWith('tr') ? 'tr' : 'en';
        if (!searchParams.get('lg')) {
            const currentPath = window.location.pathname;
            router.push(`${currentPath}?lg=${language}`);
            setLang(language);
        }
        else {
            setLang(searchParams.get('lg'));
        }
    }, []);

  return (
    <div className="">
      
    </div>
  );
}
