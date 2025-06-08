"use client"

import { api, ENDPOINT } from "@/lib/api";

const { Loader2Icon } = require("lucide-react");
const { useEffect, useState } = require("react");
const { useDispatch } = require("react-redux")



const AuthProvider = ({ children }) => {
    const dispatch= useDispatch();
    const [loading, setLoading]= useState(true);
    useEffect(() => {
        setLoading(true);
        const fetcher = async () => {
            try{
                const res= await api.get(ENDPOINT.user);
                if(res.status === 200) {
                    dispatch(userLoggedInDetails(res.data.user));
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetcher();
    }, [dispatch]);

    if (loading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader2Icon className="w-[100px] h-[100px] animate-spin" />
            </div>
        );
    return <>
        {children}
    </>
}



export default AuthProvider;