"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import LogoCanvas from '../../components/canvases/Logo';

import EditIcon from '@mui/icons-material/Edit';

import { Modal } from '@mui/material';
import defaultImage from "@/images/default-profile-photo.jpg";

import { Grid } from "react-loader-spinner";

import bg from "@/images/bg-orange.svg";
import Logo from "@/images/turuncu-tik-logo-2.svg";
import Image from 'next/image';

const CardPage = () => {
    const [load, setLoad] = useState<boolean>(true);
    const [name, setName] = useState<string>();
    const [studentNo, setStudentNo] = useState<string>();
    const [image, setImage] = useState<string>();
    const [userId, setUserId] = useState<string>();

    const [openModal, setOpenModal] = useState(false); 
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        setOpenModal(true); // Resme tıklandığında modal açılır
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Modal kapatma
    };

    // Fotoğrafı kare kırpma işlemi
    const cropToSquare = (imgSrc: string, callback: (croppedImage: string) => void) => {
        const img: HTMLImageElement = new window.Image();
        img.src = imgSrc;
        img.onload = () => {
            const minSize = Math.min(img.width, img.height);
            const canvas = document.createElement('canvas');
            canvas.width = minSize;
            canvas.height = minSize;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(
                    img,
                    (img.width - minSize) / 2,
                    (img.height - minSize) / 2,
                    minSize,
                    minSize,
                    0,
                    0,
                    minSize,
                    minSize
                );
                const croppedImage = canvas.toDataURL('image/png');
                callback(croppedImage);
            }
        };
    };

    // Fotoğraf seçme işlemi
    const handleSelectPhoto = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Dosya seçme inputunu aç
        }
    };

    // Dosya seçme işlemi
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const dataUrl = reader.result as string;
                cropToSquare(dataUrl, setImage); 
                await saveImage();
            };
            reader.readAsDataURL(file);
        }
    };

    // Fotoğrafı veritabanına kaydetme
    const saveImage = async () => {
        try {
            await axios.post("../../api/userimage", { user_id: userId, image: image});
        } catch (error) {
            alert(`Image cannot be changed: ${error}`);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post("../../api/token", {token : token});
                if (res.status == 200) {
                    const name : string = res.data.user.fullName;
                    let newName : string = "";
                    name.split(" ").map((n) => {
                        newName += n.toUpperCase() + " ";
                    })

                    setLoad(false);
                    setName(newName);
                    setStudentNo(res.data.user.schoolNumber);
                    setUserId(res.data.user._id);
                    setImage(res.data.image?.image);
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
    className="h-screen p-4 bg-[#f56f00] flex flex-col justify-between items-center ">
        
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
                    <div className='grid grid-cols-2 gap-4 px-4'>
                        <div className='flex justify-center items-center'>
                        <Image
                            src={image || defaultImage} // Profil resmi veya default resim
                            alt="User Image"
                            className='rounded-full cursor-pointer'
                            width={100}
                            height={100}
                            onClick={handleImageClick} // Resme tıklama ile modal açılır
                        />
                        </div>
                        <Image className='pointer-event-none' src={Logo} alt='' />
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
                            <input type="text" name="name" value={`Ekim 2025`} disabled className='inputStyle font-bold italic text-black p-2 text-xl' />
                        </div>
                    </div>

                    <div className='h-4/5 mt-2 relative z-0 '>
                      <LogoCanvas />
                    </div>

                    <div>
                        <p className="text-white/70 text-center text-sm">Copyright 2024 © Yazılım Topluluğu</p>
                    </div>


                    {/* Modal */}
                    <Modal className="flex justify-center items-center" open={openModal} onClose={handleCloseModal}>
                        <div className='flex justify-center items-center w-fit h-fit'>
                            <div className="relative mb-8">
                                <Image className='rounded-full border-2 border-black' src={image || defaultImage} alt="User Image" width={300} height={300} />
                                <button className="absolute right-0 bottom-2 bg-black rounded-full p-4" onClick={handleSelectPhoto}>
                                    <EditIcon />
                                </button>
                            </div>
                            
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange} // Dosya değişikliği
                            />
                        </div>
                    </Modal>
                </>
            )
        }
    </div>
  )
}

export default CardPage