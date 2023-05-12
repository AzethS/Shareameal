const users = [
    {
      id: 1,
      username: "john",
      password: "password123",
      email: "john@example.com"
    },
    {
      id: 2,
      username: "jane",
      password: "password456",
      email: "jane@example.com"
    }
  ];
  
  class User {
    static getAll() {
      return Promise.resolve(users);
    }
  
    static find(username) {
      return users.find(user => user.username === username);
    }
  
    static findById(id) {
      return users.find(user => user.id === id);
    }
  
    static save(user) {
      user.id = users.length + 1;
      users.push(user);
      return Promise.resolve(user);
    }
  
    static update(id, updates) {
      const user = users.find(user => user.id === id);
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      Object.assign(user, updates);
      return Promise.resolve(user);
    }
  
    static delete(id) {
      const index = users.findIndex(user => user.id === id);
      if (index === -1) {
        return Promise.reject(new Error("User not found"));
      }
      users.splice(index, 1);
      return Promise.resolve();
    }
  }
  
  module.exports = User;