const moment = require('moment');

var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    url:`http://www.google.com/maps?q=${latitude},${longitude}`,
    from,
    createdAt: moment().valueOf()
  };
};
module.exports = {generateMessage,generateLocationMessage};
