import { createContext, useState, useContext, useEffect } from "react";
import { checkAuth } from "./api/authApi";

const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await checkAuth();
                console.log('the result is',result)
                if (result) {
                    setUser({
                        id: result.userId,
                        username: result.username,
                        role: result.role
                    });
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[])

    const logInClient = (userData) => {
        setUser(userData);
    };

    const logOutClient = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, loading, logInClient, logOutClient}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
