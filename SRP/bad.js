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
// BAD EXAMPLE
// This class does too many things
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // User data management
  getUserInfo() {
    return `${this.name} - ${this.email}`;
  }
  
  // Database operations
  saveToDatabase() {
    console.log('Saving to database...');
    // database logic
  }
  
  // Email operations
  sendWelcomeEmail() {
    console.log(`Sending email to ${this.email}`);
    // email logic
  }
  
  // Logging
  logActivity() {
    console.log(`User ${this.name} performed an action`);
    // logging logic
  }
}