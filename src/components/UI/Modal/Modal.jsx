const Modal = ({ children, setModalRender }) => {
  function clickHandler() {
    setModalRender()
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