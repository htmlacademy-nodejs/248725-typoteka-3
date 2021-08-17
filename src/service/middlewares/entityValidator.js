'use strict';

const {StatusCodes, ReasonPhrases} = require(`http-status-codes`);

module.exports = (keysList) => (req, res, next) => {
  const entity = req.body;
  const keys = Object.keys(entity);
  const keysExists = keysList.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST);
  }

  return next();
};
