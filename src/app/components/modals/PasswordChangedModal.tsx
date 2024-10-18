"use client"
import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from './modalStyle';
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';

import LockResetIcon from '@mui/icons-material/LockReset';
import { useRouter } from 'next/navigation';

const PasswordChangedModal = () => {
  const { lang } = useContext(LanguageContext);
  const { isPasswordCanChanged, setIsPasswordCanChanged } = useContext(ModalContext);

  const router = useRouter();

  return (
    <Modal
        open={isPasswordCanChanged}
        onClose={() => {
          setIsPasswordCanChanged(false);
          router.push("/login");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <div className="flex flex-col justify-center items-center px-4">
            <div className='flex justify-center items-center'>
              <LockResetIcon sx={{ fontSize: "92px", color: "green" }} />
            </div>
              <p className="text-[32px] font-bold text-center mt-4">
                {lang == "tr" ? "Şifreniz Değiştirildi" : "Password Changed"}
              </p>
              <p className="text-sm max-w-[300px] text-center">
                {lang == "tr" ? "Şifreniz yenilenmiştir. Yeni şifrenizi kullanarak Turuncu Tik kartınıza erişebilir ve İYTE Yazılım Topluluğu'nun geliştirdiği diğer sistemlere giriş yapabilirsiniz. " : "Your password has been renewed. Using your new password, you can access your Orange Tick card and log in to other systems developed by the IYTE Software Community."}
              </p>
          </div>
      </Box>
    </Modal>
  )
}

export default PasswordChangedModal