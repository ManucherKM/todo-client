import List from "../List/List"
import TodoItem from "../TodoItem/TodoItem"

const TodoList = ({ massTodo, remove, editComplete }) => {
    return (
        <div className="todo-list">
            {massTodo.length === 0 &&
                <div className="wrapper-message">
                    <p>
                        Список задач пуст
                    </p>
                </div>
            }
            {massTodo.length !== 0 &&
                <div className="list">
                    <div className="cols">
                        <p className="cols__title">Название</p>
                        <p className="cols__description">Описание</p>
                        <p className="cols__date">Срок</p>
                        <p className="cols__option">Действия</p>
                    </div>
                    <List
                        mass={massTodo}
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
    )
}

export default TodoList