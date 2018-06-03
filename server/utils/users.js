users = [];
class Users{
  constructor(){
    this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room}
    this.users.push(user);

  }
  removeUser(id){
    var user = this.getUser(id);
    if (user) {
      this.users= this.users.filter((user)=> user.id != id);
    }
    return user;
  }

  getUser(id){
    return  this.users.filter((user)=> user.id === id)[0];
  }
  getUserList(room){
    var users = this.users.filter((user=> user.room === room));// all users with specified Room
    var namesArray = users.map((user)=> user.name);
    return namesArray;
  }

  unique (params) {
    var allUsers = this.getUserList(params.room);
    return allUsers.filter((user) => user === params.name);
  }

}

module.exports = {Users};
