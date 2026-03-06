# Single Responsibility Principle (SRP)

## Definition

**A class or module should have only one reason to change.**

This means every class should focus on a **single responsibility or functionality**.

If a class performs multiple tasks, changes in one task may affect the other tasks.

---

## Bad Example ❌

```javascript
class UserService {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  saveToDatabase() {
    console.log("Saving users to database...");
  }

  sendEmail(user) {
    console.log(`Sending welcome email to ${user.email}`);
  }
}
```

### Problems

* Handles **user management**
* Handles **database logic**
* Handles **email notification**

Too many responsibilities.

---

## Good Example ✅

```javascript
class UserService {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }
}

class UserRepository {
  save(users) {
    console.log("Saving users to database...");
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    console.log(`Sending welcome email to ${user.email}`);
  }
}
```

### Benefits

* Easier maintenance
* Easier testing
* Less side effects when changing code

---

## Real World Example

Hospital system:

Bad design
Doctor class handles:

* patient diagnosis
* billing
* report printing

Good design

* Doctor → diagnosis
* BillingService → payments
* ReportService → printing

---

## Key Takeaway

One module → **One responsibility**
