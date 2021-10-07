generateUUID = ()  => {
    // TODO generate a stronger uuid
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }


  const utils = {
    generateUUID: generateUUID
  };
  module.exports = utils;
