import { useRef, useState } from "react"

import Modal from "../UI/Modal/Modal"
import Button from "../UI/Button/Button"
import axios from "../../axios"

const Panel = ({ setTodos, todos, setModal }) => {

  const [titleValue, setTitlValue] = useState("")
  const [subtitleValue, setSubtitleValue] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [fileValue, setFileValue] = useState(null)
  const [styleError, setStyleError] = useState("")
  const inputFile = useRef(null)

  /**
   * При клике на кнопку начинаем отправлять форму 
   */
  async function addTodo() {
    //Небольшая валидация
    if (!titleValue.trim() || !subtitleValue.trim() || !dateValue) {
      setStyleError("border-red")
      return
    }
    //Если валидация успешная - очищаем переменную с css классам для ошибок
    setStyleError("")

    //Создаем FormData для отправки данных
    const formData = new FormData();
    formData.append("title", titleValue.trim())
    formData.append("date", dateValue)
    formData.append("subtitle", subtitleValue.trim())
    //Добавляем файл задачи в FormData если он был выбран
    if (fileValue) {
      for (const item of fileValue) {
        formData.append("files", item)
      }
    }
    //Отправляем FormData на бекенд и достаем ответ из запроса
    const { data } = await axios.post("/todos", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    //В новый список задач разворачиваем старый и в конец добавляем новую задачу
    setTodos([...todos, data])
    //Очищаем форму
    setTitlValue("")
    setSubtitleValue("")
    setDateValue("")
    setFileValue("")
    //Закрываем модальное окно
    setModal(false)
  }
  /**
   * При клике на кнопку кликаем на input с типом file
   */
  function selectFile() {
    inputFile.current.click()
  }

  return (
    <Modal setModalRender={setModal}>
      <div className="panel">
        <p className="panel__title">
          Задача
        </p>
        <input
          onChange={e => setTitlValue(e.target.value)}
          type="text"
          className={styleError}
          value={titleValue}
          placeholder="Title"
        />
        <textarea
          onChange={e => setSubtitleValue(e.target.value)}
          type="text"
          className={styleError}
          value={subtitleValue}
          placeholder="Subtitle"
        />
        <label htmlFor="input-file">
          <Button
            text="Выбрать"
            onClick={selectFile}
          />
          <input
            ref={inputFile}
            onChange={e => setFileValue(e.target.files)}
            type="file"
            multiple
            className="input-file"
            accept=".docx, .txt"
          />
        </label>
        <input
          onChange={e => setDateValue(e.target.value)}
          type="date"
          className={styleError}
          value={dateValue}
        />
        <Button
          onClick={addTodo}
          text="Добавить"
        />
      </div>
    </Modal>
  )
}

export default Panel