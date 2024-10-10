import { LanguageContext } from '@/context/LanguageContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useContext } from 'react'

const LanguageBtn = () => {
    const { lang, setLang } = useContext(LanguageContext);
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams);

  return (
    <button onClick={() => {
        setLang(lang == "tr" ? "en" : "tr");
        params.set("lg", `${lang == "tr" ? "en" : "tr"}`);
        router.replace(`${pathname}?${params.toString()}`);
    }} className='absolute right-5 top-8 max-w-md underline text-black'>
        {lang == "tr" ? "🇬🇧 eng" : "🇹🇷 tr"}
    </button>
  )
}

export default LanguageBtn