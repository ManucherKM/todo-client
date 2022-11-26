const List = ({ mass, itemRender }) => {
    return (
        <>
            {mass.map(itemRender)}
        </>
    )
}

export default List