import { useState } from "react"

import Modal from "../UI/Modal/Modal"
import Button from "../UI/Button/Button"
import axios from "../../axios"

const Panel = ({ setTodos, todos, setModal }) => {

  const [titleValue, setTitlValue] = useState("")
  const [subtitleValue, setSubtitleValue] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [fileValue, setFileValue] = useState(null)
  const [styleError, setStyleError] = useState("")

  async function addTodo() {
    if (!titleValue || !subtitleValue || !dateValue) {
      setStyleError("border-red")
      return
    }

    setStyleError("")

    const formData = new FormData();
    formData.append("title", titleValue.trim())
    formData.append("date", dateValue)
    formData.append("subtitle", subtitleValue.trim())

    if (fileValue) {
      for (const item of fileValue) {
        formData.append("files", item)
      }
    }

    const { data } = await axios.post("/todos", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    setTodos([...todos, data])
    setTitlValue("")
    setSubtitleValue("")
    setDateValue("")
    setFileValue("")
    setModal(false)
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
        <input
          onChange={e => setFileValue(e.target.files)}
          type="file"
          multiple
          placeholder=".docx, .txt"
          accept=".docx, .txt"
        />
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