"use client"

import {  checkSessionUser, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ReactNode, useEffect } from "react"


type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider = ({children}:AuthProviderProps) => {
    const setUser = useAuthStore((state)=>state.setUser)
    const clearIsAuthenticated = useAuthStore((state)=>state.clearIsAuthenticated)
    useEffect(()=>{
        const fetchUser = async()=>{
            const isAuthenticated = await checkSessionUser()
            if (isAuthenticated){
                const user = await getUser();
                if (user){
                    setUser(user);
                }
            } else{clearIsAuthenticated()}
        }
        fetchUser()
    }, [clearIsAuthenticated, setUser])
  return children
}

export default AuthProvider