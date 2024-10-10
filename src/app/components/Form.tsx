"use client"
import React, { FormEvent, useContext, useState } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import axios from 'axios';
import { ModalContext } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';


const Form = () => {
    const { lang } = useContext(LanguageContext);
    const {setIsErrorOpen, setIsNotOrange, setIsLoading} = useContext(ModalContext);  

    const [visiblePass, setVisiblePass] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data = {
            email: formData.get("email")!.toString(),
            password: formData.get("password")!.toString(),
        }

        try {
            setIsLoading(true);
            const res = await axios.post("../api/login", data);

            setIsLoading(false);
            switch (res.status) {
                case 200:
                    localStorage.setItem("token", res.data.user.token);
                    router.push("/card")
                    break;
                case 201:
                    setIsNotOrange(true);
                    break;
                default:
                    setIsErrorOpen(true);
                    break;
            }
        } catch {
            setIsErrorOpen(true);
            setIsLoading(false);
        }

    }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 -mt-16'>

        <input required type="email" name="email" placeholder={lang == "tr" ? "Emailizi Giriniz" : "Email"} className='inputStyle ' />

        <div className='relative flex items-center'>
            <input required type={visiblePass ? "text" : "password"} name="password" placeholder={lang == "tr" ? "Şifrenizi Giriniz" : "Password"} className='inputStyle ' />
            <button type='button' onClick={() => setVisiblePass(!visiblePass)} className='absolute right-5'>
                {
                    visiblePass ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />
                }
            </button>
        </div>


        <div className='flex justify-between items-center mt-4'>
            <h2 className='text-4xl font-bold'>
                {lang == "tr" ? "Giriş Yap" : "Login"}
            </h2>
            <button type="submit" className='p-5 bg-orange-600 rounded-full'><ArrowForwardIcon sx={{ color: "white" }} /></button>
        </div>
    </form>
  )
}

export default Form