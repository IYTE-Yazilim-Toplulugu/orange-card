import { LanguageContext } from '@/context/LanguageContext';
import React, { useContext } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ShopCard = ({ name, advantage, location } : { name: string; advantage: string; location: string }) => {
    const { lang } = useContext(LanguageContext);
  return (
    <div className='border-2 rounded-bl-2xl rounded-tr-2xl border-black p-3'>
        <h1 className='italic font-bold text-lg my-2'>{name}</h1>
        <p className='my-4'>{advantage}</p>
        <a 
        className='text-blue-600 italic'
        href={location} target="_blank" rel="noopener noreferrer">
            <LocationOnIcon sx={{ color: "blue"}} /> {lang == "tr" ? "Konumu Göster" : "Show Location"}
        </a>
    </div>
  )
}

export default ShopCard