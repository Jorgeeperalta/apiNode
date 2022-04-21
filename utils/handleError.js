const  handleHttpError = (res, message='Algo ocurrio',code=403) => {
    res.status(code)
    res.send(message)
}

module.exports = { handleHttpError }