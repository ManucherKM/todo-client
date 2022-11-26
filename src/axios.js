import axios from "axios"

const instance = axios.create({
    baseURL: "https://todotestquestion.herokuapp.com"
})

export default instance
