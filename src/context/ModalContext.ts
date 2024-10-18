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

    isEmailSent: false,
    setIsEmailSent: () => false,

    isEmailNotSent: false,
    setIsEmailNotSent: () => false,

    email: "",
    setEmail: () => "",

    token: "",
    setToken: () => "",

    isPasswordCanChanged: false,
    setIsPasswordCanChanged: () => false,

    isPasswordCannotChanged: false,
    setIsPasswordCannotChanged: () => false,

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

    isEmailSent: boolean,
    setIsEmailSent: Dispatch<SetStateAction<boolean>>;

    isEmailNotSent: boolean,
    setIsEmailNotSent: Dispatch<SetStateAction<boolean>>;

    email: string,
    setEmail: Dispatch<SetStateAction<string>>;

    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>;

    isPasswordCanChanged: boolean,
    setIsPasswordCanChanged: Dispatch<SetStateAction<boolean>>;

    isPasswordCannotChanged: boolean,
    setIsPasswordCannotChanged: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContext>(ModalContextState);