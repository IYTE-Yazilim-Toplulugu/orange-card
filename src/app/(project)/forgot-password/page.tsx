"use client"
import LanguageBtn from '@/app/components/LanguageBtn'
import { LanguageContext } from '@/context/LanguageContext'
import Image from 'next/image'
import bgTR from "@/images/sifremi-unuttum.svg";
import bgEn from "@/images/forgot-password.svg";
import React, { useContext } from 'react'
import ForgotPassForm from '@/app/components/ForgotPasswordForm'
import EmailSentModal from '@/app/components/modals/EmailSentModal';
import LoadingModal from '@/app/components/modals/LoadingModal';
import EmailCannotSentModal from '@/app/components/modals/EmailCannotSentModal';

const ForgotPassword = () => {
    const { lang } = useContext(LanguageContext);
  return (
    <div className='h-full'>

        {/* Modals */}
        <LoadingModal />
        <EmailSentModal />
        <EmailCannotSentModal />

        <div className="relative w-full h-full">
            <LanguageBtn />
        </div>
        <Image src={lang == "tr" ? bgTR : bgEn} className='w-full pointer-events-none' alt="image" />

        <div className="flex flex-col px-8 text-black justify-between h-full">
            <ForgotPassForm />

            <div className='mt-10'>
                <h2 className='font-semibold my-2'>{lang == "tr" ? "Şifremi Nasıl Değiştireceğim?" : "How Can I Change My Password?"}</h2>
                <ul className='list-decimal ml-5 flex flex-col gap-2'>
                    <li>{lang == "tr" ? "Topluluğa kaydolurken kullandığınız mail adresini doğru bir şekilde giriniz ve Mail Gönder butonuna basınız." : "Enter the email address you used to register with the community correctly and press the Send Email button."}</li>
                    <li>{lang == "tr" ? "Mail iletildi yazısını gördükten sonra mail kutunuzu kontrol ediniz. Gelen mail adresindeki linke tıklayınız." : "After seeing the Mail Sent message, check your inbox. Click the link in the email."}</li>
                    <li>{lang == "tr" ? "Açılan ekranda yeni şifrenizi giriniz ve şifre değişikliğini onaylayınız." : "Enter your new password on the screen that opens and confirm the password change."}</li>
                </ul>
            </div>


            <p className="my-6 text-black/60 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
        </div>
    </div>
  )
}

export default ForgotPassword