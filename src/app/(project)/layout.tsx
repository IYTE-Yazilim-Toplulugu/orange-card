"use client"
import { LanguageContext } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    // Language Context
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
        <main className="min-h-screen">
            <LanguageContext.Provider value={{ lang, setLang }}>
                {children}
            </LanguageContext.Provider>
        </main>
    )
  }