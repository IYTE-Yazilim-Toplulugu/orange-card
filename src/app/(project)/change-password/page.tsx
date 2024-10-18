"use client"
import LanguageBtn from '@/app/components/LanguageBtn'
import { LanguageContext } from '@/context/LanguageContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react';

import bgTR from "@/images/sifreni-degistir.svg";
import bgEn from "@/images/reset-pass.svg";
import ResetPasswordForm from '@/app/components/ResetPasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ModalContext } from '@/context/ModalContext';
import PasswordNotChangedModal from '@/app/components/modals/PasswordNotChangedModal';
import LoadingModal from '@/app/components/modals/LoadingModal';
import PasswordChangedModal from '@/app/components/modals/PasswordChangedModal';

const ChangePassword = () => {
  const { lang } = useContext(LanguageContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setToken } = useContext(ModalContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (searchParams.get("token")) {
          const res = await axios.post("../../api/token", { token: searchParams.get("token") })
  
          if (res.status == 200) {
            setToken(searchParams.get("token"));
          }
          else {
            router.push("/forgot-password");
          }
        }
        else {
          router.push("/forgot-password");
        }
      } catch {
        router.push("/forgot-password");
      }
    }

    checkToken();
  }, [])
  return (
    <div className='h-full'>

      {/* Modals */}
      <LoadingModal />
      <PasswordChangedModal />
      <PasswordNotChangedModal />

      <div className="relative w-full h-full">
            <LanguageBtn />
        </div>
        <Image src={lang == "tr" ? bgTR : bgEn} className='w-full pointer-events-none' alt="image" />

        <div className="flex flex-col px-8 text-black justify-between h-full">
            <ResetPasswordForm />

            <p className="my-6 text-black/60 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
        </div>
    </div>
  )
}

export default ChangePassword