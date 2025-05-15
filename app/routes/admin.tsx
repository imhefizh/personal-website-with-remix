import { useEffect, useState } from "react";
import AddAchievement from "~/components/addAchievement";
import WriteArticle from "~/components/writeArticle";
import { insertOneAch } from "db"
import { ActionFunctionArgs } from "@remix-run/node";
import AddWork from "~/components/addWork";
import { Link } from "@remix-run/react";

export const action = async ({request}:ActionFunctionArgs) => {
    const formData = await request.formData()
    const {name, img, url, issuer, provided_by} = Object.fromEntries(formData)
    try {    
        const req = await insertOneAch(name, img, url, issuer, provided_by)
        return new Response(JSON.stringify({msg: "Success", req: 'req'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({msg: error}), {status: 200})
    }
}


export default function Admin() {
    const [logged, setLogged] = useState(false)
    const [opt, setOpt] = useState(0)

    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        // console.log(savedToken)
        if (!savedToken) {
            window.location.replace('/login')
        } else {
            auth(savedToken);
        }
    }, [])
    
    async function auth(token) {
        // console.log("Checking")
        const request = await fetch("/admin/auth", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
        });
        const res = await request.json()
        if (res.msg != "Authorized") {
            window.location.replace("/login")
            return
        } else {
            setLogged(true)
            return
        }
    }

    return(
        <div className="flex flex-col px-7 min-h-screen items-center">
            <div className="mt-10 flex justify-between items-center md:w-[50%]">
            <h1 className="font-bold text-3xl">{logged ? "Halo Pembebas!" : "Anda tidak punya izin"}</h1>
            <Link to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </Link>
            </div>
            <ul className="flex gap-2 w-full justify-between mt-2 md:w-[50%] border-b border-white">
                <li>
                    <button className={opt == 1 ? "font-bold" : ""} onClick={() => setOpt(1)}>
                    Add Achievement
                    </button>
                </li>
                <li>
                    <button className={opt == 2 ? "font-bold" : ""} onClick={() => setOpt(2)}>
                    Write Article
                    </button>
                </li>
                <li>
                    <button className={opt == 3 ? "font-bold" : ""} onClick={() => setOpt(3)}>
                    Add Work
                    </button>
                </li>
            </ul>
            <div className="mt-4">
                <div className={opt == 2 ? "" : "hidden"}>
                <WriteArticle />
                </div>
                <div className={opt == 1 ? "w-full flex justify-center md:mt-1" : "hidden"}>
                <AddAchievement />
                </div>
                <div className={opt == 3 ? "" : "hidden"}>
                <AddWork />
                </div>            
            </div>
        </div>
    )
}