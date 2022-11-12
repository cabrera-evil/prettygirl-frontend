const dbValidators = require("./db-validators");
const generateJWT = require("./generate-jwt");
const uploadeFile = require("./upload-file");

module.exports = {
  // se expanden los contenidos
  ...dbValidators,
  ...generateJWT,
  ...uploadeFile,
};
