const Button = ({ text, onClick = () => { } }) => {
    /**
     * Вызывает функцию переданную пропсом
     */
    function clickHandler() {
        onClick()
    }
    return (
        <>
            <button onClick={clickHandler} className="btn">{text}</button>
        </>
    )
}

export default Button