import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from './modalStyle';
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const EmailCannotSentModal = () => {
  const { lang } = useContext(LanguageContext);
  const { isEmailNotSent, setIsEmailNotSent } = useContext(ModalContext);
  return (
    <Modal
        open={isEmailNotSent}
        onClose={() => setIsEmailNotSent(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box sx={style}>
        <div className="flex flex-col justify-center items-center px-4">
            
            <div className='flex justify-center items-center'>
              <HighlightOffIcon sx={{ fontSize: "92px", color: "red" }} />
            </div>

            <p className="text-[32px] font-bold text-center mt-4">
              {lang == "tr" ? "Email Gönderilemedi" : "Email Could Not Be Sent"}
            </p>
            <p className="text-sm max-w-[300px] text-center">
              {lang == "tr" ? "Girdiğiniz email adresinize mail gönderilemedi. Lütfen tekrar deneyiniz ya da aldığınız hatayı topluluğa bildiriniz." : "An email could not be sent to the email address you entered. Please try again or report the error you received to the community."}
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

export default EmailCannotSentModal