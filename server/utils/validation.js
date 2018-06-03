const {Users} = require('./users');
var users = new Users();

var isString = (str)=>{
  return typeof str === 'string' && str.trim().length>0;
};



module.exports = {isString};
