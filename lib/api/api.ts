import axios from "axios";


const NextServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})


export default NextServer;