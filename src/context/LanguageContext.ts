import { createContext, Dispatch, SetStateAction } from "react";

const LanguageContextState = {
  lang: "tr",
  setLang: () => "tr",
};
  

export type LanguageContext = {
    lang: string | null,
    setLang: Dispatch<SetStateAction<string | null>>
}

export const LanguageContext = createContext<LanguageContext>(LanguageContextState);