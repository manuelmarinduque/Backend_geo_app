let response = {
  error: true,
  status: null,
  body: null,
  message: null,
  req: null,
};

const success = (req, res, data, message, statusCode) => {
  response.error = false;
  response.status = statusCode || 200;
  response.body = data || [];
  response.message = message || "Done";
  res.status(statusCode).send(response);
};

const error = (req, res, data, message, statusCode) => {
  response.error = true;
  response.status = statusCode || 500;
  response.body = data || [];
  response.message = message || "Internal Server Error";
  response.req = req;
  res.status(statusCode).send(response);
};

module.exports = {
  success,
  error,
};
