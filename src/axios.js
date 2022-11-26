import axios from "axios"

/*
    Создаем свой "дефолтный" axios для запросов на бекенд.
    Это позволяет напрямую обращаться к роутам api.
    Прим. теперь вместо запроса: axios.get("https://todotestquestion.herokuapp.com/todos"),
    мы можем написать: axios.get("/todos")
*/

const instance = axios.create({
    baseURL: "https://todotestquestion.herokuapp.com"
})

export default instance