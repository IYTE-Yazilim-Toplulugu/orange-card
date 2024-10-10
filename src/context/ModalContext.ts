import { createContext, Dispatch, SetStateAction } from "react";

const ModalContextState = {
    isErrorOpen: false,
    setIsErrorOpen: () => false,

    isSuccess: false,
    setIsSuccess: () => false,

    isNotOrange: false,
    setIsNotOrange: () => false,

    isLoading: false,
    setIsLoading: () => false,
}

export type ModalContext = {
    isErrorOpen: boolean,
    setIsErrorOpen: Dispatch<SetStateAction<boolean>>;

    isSuccess: boolean,
    setIsSuccess: Dispatch<SetStateAction<boolean>>;

    isNotOrange: boolean,
    setIsNotOrange: Dispatch<SetStateAction<boolean>>;

    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContext>(ModalContextState);