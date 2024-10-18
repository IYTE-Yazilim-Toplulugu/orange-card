"use client"
import React, { FormEvent, useContext, useState } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import axios from 'axios';
import { ModalContext } from '@/context/ModalContext';

const ResetPasswordForm = () => {
    const { lang } = useContext(LanguageContext);
    const { token } = useContext(ModalContext);  

    const [visiblePass, setVisiblePass] = useState<boolean>(false);
    const { setIsLoading, setIsPasswordCanChanged, setIsPasswordCannotChanged } = useContext(ModalContext);


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setIsLoading(true);

        const password = formData.get("password");
        const re_password = formData.get("re-password");

        if (password != re_password) {
            console.log("Not Equal");
            setIsLoading(false)
            alert(lang == "tr" ? "Şifreleriniz aynı değil, lütfen şifrenizi kontrol ediniz." : "Your passwords are not the same, please check your password.");
            return;
        }

        console.log("Equal");
        try {
            const res = await axios.post("../api/password", {token: token, password: password });
            setIsLoading(false);
            if (res.status == 200) {
                console.log("Success");
                setIsPasswordCanChanged(true);
    
            }
            else {
                setIsPasswordCannotChanged(true);
            }
        } catch {
            setIsLoading(false);
            setIsPasswordCannotChanged(true);
        }


        // const data = {
        //     email: formData.get("email")!.toString(),
        //     password: formData.get("password")!.toString(),
        // }

        // try {
        //     setIsLoading(true);
        //     const res = await axios.post("../api/login", data);

        //     setIsLoading(false);
        //     switch (res.status) {
        //         case 200:
        //             localStorage.setItem("token", res.data.user.token);
        //             router.push("/card")
        //             break;
        //         case 201:
        //             setIsNotOrange(true);
        //             break;
        //         default:
        //             setIsErrorOpen(true);
        //             break;
        //     }
        // } catch {
        //     setIsErrorOpen(true);
        //     setIsLoading(false);
        // }

    }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 -mt-16'>

        <div className='relative flex items-center'>
            <input required minLength={6} type={visiblePass ? "text" : "password"} name="password" placeholder={lang == "tr" ? "Yeni Şifrenizi Giriniz" : "Enter Your New Password"} className='inputStyle ' />
            <button type='button' onClick={() => setVisiblePass(!visiblePass)} className='absolute right-5'>
                {
                    visiblePass ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />
                }
            </button>
        </div>

        <div className='relative flex items-center'>
            <input required type={visiblePass ? "text" : "password"} name="re-password" placeholder={lang == "tr" ? "Şifrenizi Yeniden Giriniz" : "Re-enter Your Password"} className='inputStyle ' />
            <button type='button' onClick={() => setVisiblePass(!visiblePass)} className='absolute right-5'>
                {
                    visiblePass ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />
                }
            </button>
        </div>

        <div className='flex justify-between items-center mt-4'>
            <h2 className='text-4xl font-bold'>
                {lang == "tr" ? "Şifreni Yenile" : "Update Password"}
            </h2>
            <button type="submit" className='p-5 bg-orange-600 rounded-full'><ArrowForwardIcon sx={{ color: "white" }} /></button>
        </div>
    </form>
  )
}

export default ResetPasswordForm