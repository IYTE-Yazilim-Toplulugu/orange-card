"use client"
import Image from 'next/image';
import React, { useContext } from 'react';
import bgTR from "@/images/uyelik-karti-tr.svg";
import bgEn from "@/images/membership-card.svg";
import LanguageBtn from '@/app/components/LanguageBtn';
import { LanguageContext } from '@/context/LanguageContext';
import Form from '@/app/components/Form';
import UserCannotFound from '@/app/components/modals/UserCannotFound';
import NotOrangeMember from '@/app/components/modals/NotOrangeMember';
import LoadingModal from '@/app/components/modals/LoadingModal';

const LoginPage = () => {
    const { lang } = useContext(LanguageContext);
    
  return (
        <div className='h-full'>

            {/* Modals */}
            <UserCannotFound />
            <NotOrangeMember />
            <LoadingModal />

            <div className="relative w-full h-full">
                <LanguageBtn />
            </div>
            <Image src={lang == "tr" ? bgTR : bgEn} className='w-full pointer-events-none' alt="image" />

            <div className="flex flex-col px-8 text-black justify-between h-full">
                <Form />
                <p className="my-6 text-black/60 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
            </div>
        </div>
  )
}

export default LoginPage