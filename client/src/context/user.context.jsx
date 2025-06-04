import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: "", isLoggedIn: false })
    const checkUserAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/user/check-user-auth", { credentials: "include" })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setUser({ username: data.user.username, isLoggedIn: true })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/user/log-out", { credentials: "include" })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error);
            }
            alert("User Logged Out")
            navigate("/")
            setTimeout(() => { setUser({ username: "", isLoggedIn: false }); }, 0)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkUserAuthentication()
    }, [])
    return <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}