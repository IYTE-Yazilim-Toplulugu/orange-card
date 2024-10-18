import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from './modalStyle';
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

const EmailSentModal = () => {
  const { lang } = useContext(LanguageContext);
  const { isEmailSent, setIsEmailSent, email } = useContext(ModalContext);
  return (
    <Modal
        open={isEmailSent}
        onClose={() => setIsEmailSent(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <div className="flex flex-col justify-center items-center px-4">
            <div className='flex justify-center items-center'>
              <MailOutlineIcon sx={{ fontSize: "92px", color: "green" }} />
            </div>
              <p className="text-[32px] font-bold text-center mt-4">
              {lang == "tr" ? "Email Gönderildi" : "Email Sent"}
              </p>
              <p className="text-sm max-w-[300px] text-center">
              {lang == "tr" ? `${email} adlı email adresinize şifrenizi değiştirme işlemine yönelik bir mail gönderdik.` : `We have sent an e-mail to your e-mail address, ${email}, regarding changing your password.`}
              </p>
          </div>
      </Box>
    </Modal>
  )
}

export default EmailSentModal