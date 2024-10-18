"use client"
import React, { FormEvent, useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import axios from 'axios';
import { ModalContext } from '@/context/ModalContext';


const ForgotPassForm = () => {
    const { lang } = useContext(LanguageContext);
    const { setIsEmailSent, setIsLoading, setIsEmailNotSent, setEmail, setToken: setFeedText } = useContext(ModalContext);  

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data = {
            email: formData.get("email")!.toString(),
        }

        try {
            setIsLoading(true);
            setEmail(data.email);
            const res = await axios.post("../api/email", data);
            setIsLoading(false);

            if (res.status == 200) {
                setIsEmailSent(true);
            }
            else {
                setIsEmailNotSent(true);
                setFeedText(res.data.message);
            }
        } catch {
            setIsLoading(false);
            setFeedText("Error");
            setIsEmailNotSent(true);
        }

    }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 -mt-16'>

        <input required type="email" name="email" placeholder={lang == "tr" ? "Emailizi Giriniz" : "Email"} className='inputStyle ' />

        <div className='flex justify-between items-center mt-4'>
            <h2 className='text-4xl font-bold'>
                {lang == "tr" ? "Mail Gönder" : "Send Mail"}
            </h2>
            <button type="submit" className='p-5 bg-orange-600 rounded-full'><ArrowForwardIcon sx={{ color: "white" }} /></button>
        </div>
    </form>
  )
}

export default ForgotPassForm