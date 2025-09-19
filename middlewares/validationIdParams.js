const validationIdParam = (req, res, next) => {
  const { id } = req.params;
  if (id && isNaN(Number(id))) {
    return res.status(400).send("L'ID deve essere un numero valido");
  }
  next();
};

module.exports = validationIdParam;