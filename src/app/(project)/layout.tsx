"use client"
import { LanguageContext } from "@/context/LanguageContext";
import { ModalContext } from "@/context/ModalContext";
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
            if (!searchParams.get("token")) {
                router.push(`${currentPath}?lg=${language}`);
            }
            else {
                router.push(`${currentPath}?lg=${language}&token=${searchParams.get("token")}`);
            }
            setLang(language);
        }
        else {
            setLang(searchParams.get('lg'));
        }
    }, []);

    // Modal Context
    const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isNotOrange, setIsNotOrange] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [isEmailNotSent, setIsEmailNotSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [token, setToken] = useState<string | null>("");
    const [isPasswordCanChanged, setIsPasswordCanChanged] = useState<boolean>(false);
    const [isPasswordCannotChanged, setIsPasswordCannotChanged] = useState<boolean>(false);

    return (
        <ModalContext.Provider value={{
            isErrorOpen, setIsErrorOpen,
            isSuccess, setIsSuccess,
            isNotOrange, setIsNotOrange,
            isLoading, setIsLoading,
            isEmailSent, setIsEmailSent,
            isEmailNotSent, setIsEmailNotSent,
            email, setEmail,
            token, setToken,
            isPasswordCanChanged, setIsPasswordCanChanged,
            isPasswordCannotChanged, setIsPasswordCannotChanged
        }}>
        <main className="min-h-screen">
            <LanguageContext.Provider value={{ lang, setLang }}>
                {children}
            </LanguageContext.Provider>
        </main>
        </ModalContext.Provider>
    )
  }