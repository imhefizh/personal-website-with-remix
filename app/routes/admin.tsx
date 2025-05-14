import { useEffect, useState } from "react";

export default function Admin() {
    const [logged, setLogged] = useState(false)

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
        <div className="flex flex-col px-7 min-h-screen">
            <h1 className="font-bold text-3xl mt-10">{logged ? "Halo Pembebas!" : "Anda tidak punya izin"}</h1>
            <ul className="flex gap-2 w-full justify-between mt-2">
                <li>Add Achievement</li>
                <li>Write Article</li>
                <li>Add Work</li>
            </ul>
            <div className="mt-4 border-t bg-white border-white">
            </div>
        </div>
    )
}