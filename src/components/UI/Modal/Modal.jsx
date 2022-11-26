const Modal = ({ children, setModalRender }) => {
  /**
   * При клике на темный фон закрывает модальное окно
   */
  function clickHandler() {
    setModalRender(false)
  }
  return (
    <div onClick={clickHandler} className="wrapper-modal">
      <div onClick={e => e.stopPropagation()} className="modal">
        {children}
      </div>
    </div>
  )
}

export default Modal