import { Box, Modal } from '@mui/material';
import React, { useContext } from 'react'
import { style } from "@/app/components/modals/modalStyle";
import { LanguageContext } from '@/context/LanguageContext';
import { ModalContext } from '@/context/ModalContext';
import { Grid } from 'react-loader-spinner';

const LoadingModal = () => {
    const { isLoading, setIsLoading } = useContext(ModalContext); 
    const {lang} = useContext(LanguageContext);
  return (
    <Modal
        open={isLoading}
        onClose={() => setIsLoading(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box sx={style}>
        <div className="flex flex-col justify-center items-center px-4">
          <Grid
            height="90"
            width="90"
            color="#FEA236"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='circles-with-bar-loading'
          />
          <p className="mt-6">
            {lang == "tr" ? "Giriş İşlemi Sürüyor" : "Login Process is in Progress"}
          </p>
        </div>
    </Box>
    </Modal>
  )
}

export default LoadingModal