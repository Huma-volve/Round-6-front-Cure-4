import type { AuthContextType } from "@/types/types";
import { createContext, useState, type ReactNode } from "react";


export const Authcontext = createContext<AuthContextType| undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string>('');
    const [userInfo, setUserInfo] = useState<string>('');
    


    return (
        <Authcontext.Provider value={{token,setToken,userInfo,setUserInfo}}>
            {children}
        </Authcontext.Provider>
    )
}