import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from './modalStyle';
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';

import KeyOffIcon from '@mui/icons-material/KeyOff';

const PasswordNotChangedModal = () => {
  const { lang } = useContext(LanguageContext);
  const { isPasswordCannotChanged, setIsPasswordCannotChanged } = useContext(ModalContext);

  return (
    <Modal
        open={isPasswordCannotChanged}
        onClose={() => setIsPasswordCannotChanged(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <div className="flex flex-col justify-center items-center px-4">
            <div className='flex justify-center items-center'>
              <KeyOffIcon sx={{ fontSize: "92px", color: "red" }} />
            </div>
              <p className="text-[32px] font-bold text-center mt-4">
                {lang == "tr" ? "Şifreniz Değiştirilemedi!" : "Your Password Has Not Been Changed"}
              </p>
              <p className="text-sm max-w-[300px] text-center">
                {lang == "tr" ? "Yeni şifreniz sistemimize kaydedilirken bir sorunla karşılaştı. Yeniden şifre oluşturmayı deneyin ya da topluluk yöneticileri ile iletişime geçin." : "There was a problem saving your new password in our system. Try creating a new password or contact the community administrators."}
              </p>

              <div className="mt-5 flex flex-col items-center">
                <p>yazilim@iyte.edu.tr</p>
                <a className="underline text-blue-700 mt-2" href="https://card.iyteyazilim.online/" target="_blank" rel="noopener noreferrer">
                    {lang == "tr" ? "Yöneticiler" : "Manager"}
                </a>
              </div>
          </div>
      </Box>
    </Modal>
  )
}

export default PasswordNotChangedModal