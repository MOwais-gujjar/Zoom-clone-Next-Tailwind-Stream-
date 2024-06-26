"use server"

import { currentUser } from "@clerk/nextjs"
import { StreamClient } from "@stream-io/node-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();
    if(!user) throw new Error('User is not Loged in');
    if(!apikey) throw new Error('apikey is not available')
    if(!apiSecret) throw new Error('api secret is not available');
    
    const client = new StreamClient(apikey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor( Date.now()/1000) -60;

    const token = client.createToken(user.id, exp, issued)

    return token;
}