//Библиотеки
import { useEffect, useState } from "react"
import axios from "../../axios"

//Компоненты
import TodoItem from "../../components/TodoItem/TodoItem"
import List from "../../components/List/List"
import Panel from "../../components/Panel/Panel"
import Button from "../../components/UI/Button/Button"

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [completed, setCompleted] = useState([])
    const [notDone, setNotDone] = useState([])
    const [isRenderModal, setIsRenderModal] = useState(false)

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

    function updateTodos() {
        (async () => {
            const { data } = await axios.get("/todos")
            setTodos(data)
        })()
    }

    useEffect(() => {
        updateTodos()
    }, [])

    useEffect(() => {
        const newCompleted = todos.filter(item => item.isCompleted)
        setCompleted(newCompleted)
    }, [todos])

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
                        {notDone.length === 0 &&
                            <div className="wrapper-message">
                                <p>
                                    Список задач пуст
                                </p>
                            </div>
                        }
                        {notDone.length !== 0 &&
                            <div className="list">
                                <div className="cols">
                                    <p className="cols__title">Название</p>
                                    <p className="cols__description">Описание</p>
                                    <p className="cols__date">Срок</p>
                                    <p className="cols__option">Действия</p>
                                </div>
                                <List
                                    mass={notDone}
                                    itemRender={item =>
                                        <TodoItem
                                            key={item._id}
                                            item={item}
                                            remove={remove}
                                            editComplete={editComplete}
                                        />
                                    }
                                />
                            </div>
                        }
                    </div>
                    <div>
                        <h2 className="title">
                            Выполнено
                        </h2>
                        {completed.length === 0 &&
                            <div className="wrapper-message">
                                <p>
                                    Список выполненых задач пуст
                                </p>
                            </div>
                        }
                        {completed.length !== 0 &&
                            <div className="list">
                                <div className="cols">
                                    <p className="cols__title">Название</p>
                                    <p className="cols__description">Описание</p>
                                    <p className="cols__date">Срок</p>
                                    <p className="cols__option">Действия</p>
                                </div>
                                <List
                                    mass={completed}
                                    itemRender={item =>
                                        <TodoItem
                                            key={item._id}
                                            item={item}
                                            remove={remove}
                                            editComplete={editComplete}
                                        />
                                    }
                                />
                            </div>
                        }
                        <div className="wrapper-btn-add">
                            <Button
                                onClick={() => setIsRenderModal(true)}
                                text="Добавить"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Todo