import { ActionFunctionArgs } from "@remix-run/node";
import { insertOne } from "db";

export const action: ActionFunctionArgs = async ({request}) => {
    const data = await request.json();
    try {
        const req = await insertOne(data)
        return new Response(JSON.stringify({ msg: req }), {status: 200})
    } catch (error) {
        console.log(error)
        return null
    }
}