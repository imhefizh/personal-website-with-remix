import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { config } from "dotenv";
import jwt from "jsonwebtoken";

export const action = async ({request}: ActionFunctionArgs) => {
    config();   
    const rawToken = request.headers.get("Authorization")  
    const token = rawToken?.slice(7);
    if (token) {
        const decodedToken = jwt.verify(token, process.env.THE_SECRET);
        try {
            // console.log(decodedToken)
            if (decodedToken) {                
                // console.log("Logged in")
                return new Response(JSON.stringify({msg: "Authorized"}), {
                    status: 200,
                    headers: {
                        "Content-Type":"application/json"
                    }
                })
            } else {
                return redirect("/login");
            }
        } catch (error) {
            return new Response(JSON.stringify({ msg: "Invalid Token" }), {
                status: 401,
                headers: {
                  "Content-Type": "application/json",
                },
              });   
        } 
    }
    return new Response(JSON.stringify({ msg: "No token provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
}