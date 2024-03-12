export const validateSchema = () => (req, res, next) => {
  try {
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  }
};
