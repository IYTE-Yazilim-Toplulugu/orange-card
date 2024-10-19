import { LanguageContext } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const LoginBtn = () => {
    const { lang } = useContext(LanguageContext);
    const router = useRouter();
  return (
    <div className='w-full max-w-md h-16 p-3 bg-gray-700 fixed bottom-0 rounded-t-xl'>
        <button onClick={() => router.push("/card")} className='w-full h-full bg-orange-400 rounded-xl font-bold text-lg text-gray-700'>
            {lang == "tr" ? "Dijital Kartını Göster" : "Show Your Digital Card"}
        </button>
    </div>
  )
}

export default LoginBtn