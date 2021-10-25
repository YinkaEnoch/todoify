exports.NotFoundHandler = (data) => {
  return {
    code: 1,
    status: "NotFound",
    response: { message: "Todo does not exist", data },
  };
};
