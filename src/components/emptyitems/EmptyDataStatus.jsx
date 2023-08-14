function EmptyDataStatus({ message, image }) {
    return (
        <>
            <div className="col-12 px-5 py-5 text-center emptyProduts d-flex justify-content-center flex-column">
                <div>
                    <img src={image} alt="" />
                </div>
                <small className="text-muted">{message}</small>
            </div>
        </>
    )
}

export default EmptyDataStatus