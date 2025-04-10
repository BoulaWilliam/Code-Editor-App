import { createContext, useState } from "react";

export const userContext = createContext(null);

export default function UserProvider({children})
{
const [token, setToken] = useState(localStorage.getItem("userToken"))

    function logOut()
    {
        setToken(null)
        localStorage.removeItem("userToken")
    }


    return <userContext.Provider value={{token,setToken,logOut}}>
        {children}
    </userContext.Provider>
}