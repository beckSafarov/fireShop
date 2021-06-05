export const checkForValues = (values = [], res, statusCode) => {
  values.forEach((value) => {
    if (value === undefined) {
      res.status(statusCode);
      throw new Error(`Insufficient details`);
    }
  });
};
