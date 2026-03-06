# Dependency Inversion Principle (DIP)

## Definition

**High-level modules should not depend on low-level modules. Both should depend on abstractions.**

---

## Bad Example ❌

```javascript
class MySQLDatabase {
  save(data) {
    console.log("Saving to MySQL");
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }

  saveUser(user) {
    this.db.save(user);
  }
}
```

### Problem

UserService tightly depends on MySQL.

---

## Good Example ✅

```javascript
class Database {
  save(data) {}
}

class MySQLDatabase extends Database {
  save(data) {
    console.log("Saving to MySQL");
  }
}

class MongoDatabase extends Database {
  save(data) {
    console.log("Saving to MongoDB");
  }
}

class UserService {
  constructor(database) {
    this.database = database;
  }

  saveUser(user) {
    this.database.save(user);
  }
}
```

Usage

```javascript
const db = new MongoDatabase();
const userService = new UserService(db);

userService.saveUser({ name: "Krishna" });
```

---

## Benefits

* Loose coupling
* Easier testing
* Easy database switching

---

## Real World Example

Authentication system

Instead of tightly coupling:

```
AuthService → Firebase
```

Use abstraction:

```
AuthService → AuthProvider
               ↳ Firebase
               ↳ Auth0
               ↳ CustomAuth
```

---

## Key Takeaway

**Depend on abstractions, not concrete implementations**
