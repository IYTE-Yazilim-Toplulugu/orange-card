import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from "@/app/components/modals/modalStyle";
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';

const UserCannotFound = () => {
    const { isErrorOpen, setIsErrorOpen } = useContext(ModalContext); 
    const {lang} = useContext(LanguageContext);
  return (
    <Modal
        open={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box sx={style}>
        <div className="flex flex-col justify-center items-center px-4">
            <p className="text-[32px] font-bold text-center mt-4">
            {lang == "tr" ? "Kullanıcı Bulunamadı" : "Member Cannot Found"}
            </p>
            <p className="text-sm max-w-[300px] text-center">
            {lang == "tr" ? "Bu e-posta ve şifreye ait bir üye bulunamadı, tekrar deneyiniz ya da yardım almak için iletişime geçebilirsiniz." : "No member with this email and password was found, try again or contact us for assistance."}
            </p>
            <div className="mt-5 flex flex-col items-center">
            <p>yazilim@iyte.edu.tr</p>
            <a className="underline text-blue-700 mt-2" href="https://card.iyteyazilim.online/" target="_blank" rel="noopener noreferrer">
                {lang == "tr" ? "Yöneticiler" : "Manager"}
            </a>
            </div>

            <button onClick={() => {
                setIsErrorOpen(false);
            }} className="py-2 w-full max-w-xs rounded-lg mt-4">
            {lang == "tr" ? "Geri Dön" : "Go Back"}
            </button>
        </div>
    </Box>
    </Modal>
  )
}

export default UserCannotFound