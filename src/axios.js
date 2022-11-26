import axios from "axios"

const instance = axios.create({
    baseURL: "https://todo-beckend.vercel.app"
})

export default instance
