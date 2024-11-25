function logErrors(err, req, res, next){
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next){
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err,
    stack: err.message,
  });
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
