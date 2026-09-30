export const sendSuccess = (res, message, data = null, meta = undefined) => {
  res.json({
    success: true,
    message,
    data,
    ...(meta && { meta })
  });
};

export const sendError = (res, statusCode, code, message, details = undefined) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      ...(details && { details })
    }
  });
};
