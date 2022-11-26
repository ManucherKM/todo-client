import axios from "axios"

const instance = axios.create({
    baseURL: "https://todobeckend.herokuapp.com/todos"
})

export default instance
