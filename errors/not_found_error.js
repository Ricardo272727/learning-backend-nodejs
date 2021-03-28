class NotFoundError extends Error{
  constructor(message){
    super(message);
    this.status = 404;
    this.code = ERROR_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
