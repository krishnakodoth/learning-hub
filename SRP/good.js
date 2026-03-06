// Each class has a single responsibility

/*
Single Responsibility Principle (SRP)

Definition
"A class/module/function should have only one reason to change."

Each module or class should have responsibility over a single part of the functionality, and that responsibility should be entirely encapsulated by the class.

Why It Matters
    Easier to understand and maintain
    Reduces coupling between components
    Makes testing simpler
    Changes in one responsibility don't affect others

*/

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  getUserInfo() {
    return `${this.name} - ${this.email}`;
  }
}

class UserRepository {
  save(user) {
    console.log('Saving to database...',user);
    // database logic
  }
  
  findById(id) {
    // fetch logic
  }
}

class EmailService {
  sendWelcomeEmail(email) {
    console.log(`Sending email to ${email}`);
    // email logic
  }
}

class Logger {
  log(message) {
    console.log(message);
    // logging logic
  }
}