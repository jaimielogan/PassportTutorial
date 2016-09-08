var bcrypt = require('bcrypt');

var users = [];

function hashPassword(password){
  return bcrypt.hashSync(password,10);
}

function findUser(username){
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.username === username){
      return user;
    }
  }
  return;
}

function authenticateUser(username, password){
  var user = findUser(username);
  if(!user){
    return false;
  }
  return bcrypt.compareSync(password, user.passwordHash);
}

function addUser(username,password){
  if(!username || !password){
    return false;
  }
  if(findUser(username)){
    return false;
  }
  var user = {
    username: username,
    passwordHash: hashPassword(password)
  };
  users.push(user);
  return true;
}

module.exports = {
  find: findUser,
  authenticate: authenticateUser,
  add: addUser
};
