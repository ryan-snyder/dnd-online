const shortid = require('shortid');

const generateUrl = async (context) => {
  const url = `${context.path}/${shortid.generate()}`;

  context.data.url = url;

  return context;
};

module.exports = {
  generateUrl
};