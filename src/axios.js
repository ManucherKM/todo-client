import axios from "axios"

/*
    Создаем свой "дефолтный" axios для запросов на бекенд.
    Это позволяет напрямую обращаться к роутам api.
    Прим. теперь вместо запроса: axios.get("https://todo-beckend-production.up.railway.app/todos"),
    мы можем написать: axios.get("/todos")
*/

const instance = axios.create({
    baseURL: "https://todo-beckend-production.up.railway.app"
})

export default instance
