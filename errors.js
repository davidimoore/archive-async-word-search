class HIError extends Error {
  constructor(messageType, message) {
    if (arguments.length === 2 && typeof messageType === 'string' && message) {
      super()
      let error = this.httpErrors(500, message).captureStackTrace(error, HomeInspectionError)
      this.errorTypeOne = error
    }
    if (arguments.length == 2 && typeof messageType === 'number' && message) {
      this.errorTypeTwo = this.httpError(messageType, message)
    }

    if (arguments.length == 2 && typeof messageType === 'object') {
      this.errorTypeThree = "Something"
    }
  }
}
