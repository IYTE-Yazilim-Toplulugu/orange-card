"use client"
import axios from 'axios';
import { Date } from 'mongoose';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LogoCanvas from '../../components/canvases/Logo';

import { Grid } from "react-loader-spinner";

import bg from "@/images/bg-card.svg";

const CardPage = () => {
    const [load, setLoad] = useState<boolean>(true);
    const [name, setName] = useState<string>();
    const [studentNo, setStudentNo] = useState<string>();
    const [date, setDate] = useState<Date>();

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post("../../api/token", {token : token});
                if (res.status == 200) {
                    setLoad(false);
                    setName(res.data.user.fullName);
                    setStudentNo(res.data.user.schoolNumber);
                    setDate(res.data.user.createdAt);
                }
                else {
                    router.replace("/login");
                }
            } catch {
                router.replace("/login");
            }
        }

        checkUser();
    }, [])
  return (
    <div
    style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
    className="min-w-full min-h-screen p-4 bg-[#f56f00] flex flex-col justify-between items-center ">
        
        {
            load ? (
                <div className='h-full flex flex-col justify-center items-center'>
                    <Grid
                        height="90"
                        width="90"
                        color="#FEA236"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='circles-with-bar-loading'
                    />
                </div>
            ) : (
                <>
                    <div className='h-4/5 mt-2 relative z-0 '>
                      <LogoCanvas />
                    </div>


                    <div className='flex flex-col gap-4 w-full p-8 '>
                        <div className=''>
                            <label>Ad Soyad:</label>
                            <input type="text" name="name" value={name} disabled className='inputStyle font-bold italic text-black p-2 text-xl' />
                        </div>
                        <div>
                            <label>Okul Numarası:</label>
                            <input type="text" name="name" value={studentNo} disabled className='inputStyle font-bold italic text-black p-2 text-xl' />
                        </div>
                        <div>
                            <label>Geçerlilik Tarihi:</label>
                            <input type="text" name="name" value={`Eylül 2025 - (${date!.toString().split("T")[0]})`} disabled className='inputStyle font-bold italic text-black p-2 text-xl' />
                        </div>
                    </div>

                    <div></div>

                    <div>
                        <p className="text-white/70 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
                    </div>
                </>
            )
        }
    </div>
  )
}

export default CardPage