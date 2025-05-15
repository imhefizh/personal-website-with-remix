import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { config } from "dotenv";
import jwt from "jsonwebtoken"


export const action = async ({request}: ActionFunctionArgs) => {
    config();
    const formData = await request.formData();
    const input = Object.fromEntries(formData);
    let authToken;
    if (input) {
        if (input.password == process.env.THE_PASSWORD) {
        // console.log(process.env.THE_PASSWORD)
            const payload = {
                who: "Pembebas"
            }
            authToken = jwt.sign(payload, process.env.THE_SECRET);
        } else {
            return new Response(JSON.stringify({msg: "Wrong Password"}), {status: 200})
        }
    }
    return new Response(JSON.stringify({msg:"Done" ,authToken: authToken}), {status: 200})
}

export default function Login() {
    const actionData = useActionData();
    useEffect(() => {
        if (actionData) {
            const response = JSON.parse(actionData);
            if (response?.msg == "Done") {
                document.getElementById("input").value = "";
                localStorage.setItem("authToken", response?.authToken);
                // console.log("localStorage is set")
                window.location.replace("/admin")
            } else {
                alert(response?.msg)
                document.getElementById("input").value = "";
                window.location.reload()
            }
        }
    }, [actionData])

    return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
        <h1 className="font-bold text-xl">Hello Sir, Is that you?</h1>
        <Form method="post">
            <input id="input" name="password" type="password" className="px-2 text-center mt-2 border border-white rounded-sm bg-transparent focus:outline-none " />
        </Form>
    </div>)
}