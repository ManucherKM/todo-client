import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Button from "../UI/Button/Button"

const TodoItem = ({ item, editComplete, remove }) => {
    const [cross, setCross] = useState("")

    useEffect(() => {
        const todoTime = item.date
        const date = dayjs().format().split("T")[0]
        if (todoTime < date && !item.isCompleted) {
            setCross("cross")
        }
    }, [])

    return (
        <div className="todo-item">
            <p className={`todo-item__title ${cross}`}>
                {item.title}
            </p>
            <p className={`todo-item__subtitle ${cross}`}>
                {item.subtitle}
            </p>
            <p className={`todo-item__date ${cross}`}>
                {item.date}
            </p>
            <div className="todo-item__wrapper-btns">
                {item.files !== undefined &&
                    < a
                        href={`https://todotestquestion.herokuapp.com/file/${item.files}`}
                        download="Архив.zip"
                    >
                        <Button text="Скачать" />
                    </a>
                }
                <Button text="Удалить" onClick={() => remove(item._id)} />
                <Button text="Переместить" onClick={() => editComplete(item._id)} />
            </div>

        </div >
    )
}

export default TodoItem
