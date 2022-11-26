const Button = ({ text, onClick = () => { } }) => {
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