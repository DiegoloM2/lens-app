export default class User {
    constructor(email, username, password) {
      this.username = username;
      this.password = password; // Note: Storing plain-text passwords is not secure; use a proper authentication method in a real app
      this.email = email;
      this.token = email;
    }
};  