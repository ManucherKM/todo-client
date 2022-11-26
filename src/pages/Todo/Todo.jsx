//Библиотеки
import { useEffect, useState } from "react"
//Наш дефолтный axios
import axios from "../../axios"
//Компоненты
import Panel from "../../components/Panel/Panel"
import Button from "../../components/UI/Button/Button"
import TodoList from "../../components/TodoList/TodoList"

const Todo = () => {
    //Основной список задач
    const [todos, setTodos] = useState([])
    //Список выполненых задач
    const [completed, setCompleted] = useState([])
    //Список не выполненых задач
    const [notDone, setNotDone] = useState([])
    //Флаг для рендера модального окна
    const [isRenderModal, setIsRenderModal] = useState(false)

    /**
     * Переопределяет флаг isComplete в определенной задаче и
     * отправляет запрос для изменения этого же поля в БД.
     * @param {string} id параметр для определения задачи из списка задач.
     */
    function editComplete(id) {
        const newTodos = todos.map(item => {
            if (item._id === id) {
                item.isCompleted = !item.isCompleted;
                (async () => {
                    await axios.put("/todos",
                        {
                            id: id,
                            isCompleted: item.isCompleted
                        }
                    )
                })()
            }
            return item
        })
        setTodos(newTodos)
    }

    /**
     * Удаляет задачу из списка и отправляет запрос на удаление задачи на сервере
     * @param {string} id параметр для определения задачи из списка задач.
     */
    function remove(id) {
        const newTodos = todos.filter(item => {
            if (item._id !== id) {
                return true
            }
            (async () => {
                await axios.post("/todo", { id: id })
            })()
            return false
        })
        setTodos(newTodos)
    }

    /**
     * Обновляет список задач
     */
    function updateTodos() {
        (async () => {
            const { data } = await axios.get("/todos")
            setTodos(data)
        })()
    }

    //Обновляем список задач при первом рендере
    useEffect(() => {
        updateTodos()
    }, [])

    //Формируем массив выполненых задач
    useEffect(() => {
        const newCompleted = todos.filter(item => item.isCompleted)
        setCompleted(newCompleted)
    }, [todos])

    //Формируем массив не выполненых задач
    useEffect(() => {
        const newNotDone = todos.filter(item => !item.isCompleted)
        setNotDone(newNotDone)
    }, [todos])

    return (
        <>
            {isRenderModal &&
                <Panel
                    setModal={setIsRenderModal}
                    setTodos={setTodos}
                    todos={todos}
                />
            }
            <div className="todo">
                <div className="container">
                    <div>
                        <h2 className="title">
                            Задачи
                        </h2>
                        <TodoList
                            massTodo={notDone}
                            editComplete={editComplete}
                            remove={remove}
                        />
                    </div>
                    <div>
                        <h2 className="title">
                            Выполнено
                        </h2>
                        <TodoList
                            massTodo={completed}
                            editComplete={editComplete}
                            remove={remove}
                        />
                    </div>
                    <div className="wrapper-btn-add">
                        <Button
                            onClick={() => setIsRenderModal(true)}
                            text="Добавить"
                        />
                    </div>
                </div>
            </div >
        </>

    )
}

export default Todo