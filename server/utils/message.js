var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    url:`http://www.google.com/maps?q=${latitude},${longitude}`,
    from,
    createdAt: new Date().getTime()
  };
};
module.exports = {generateMessage,generateLocationMessage};
