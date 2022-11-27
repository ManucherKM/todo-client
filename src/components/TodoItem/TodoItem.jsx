import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Button from "../UI/Button/Button"

const TodoItem = ({ item, editComplete, remove }) => {
    //Название класса для задач у которых прошел срок их выполнения
    const [cross, setCross] = useState("")

    useEffect(() => {
        //Получаем конечный срок задачи
        const todoTime = item.date
        //Получаем текущую дату 
        const date = dayjs().format().split("T")[0]
        /*
        Если текущая дата больще даты срока и эта задача не выполнена -
        добавляем css класс для отметки этого
        */
        if (todoTime < date && !item.isCompleted) {
            setCross("cross")
        }
    }, [item])

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
                {/* Если файлов у задачи нет - не отрисовываем кнопку для скачивания файлов */}
                {item.files !== undefined &&
                    < a

                        href={`https://todo-beckend-production.up.railway.app/file/${item.files}`}
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
