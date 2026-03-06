# Interface Segregation Principle (ISP)

## Definition

**Clients should not be forced to depend on interfaces they do not use.**

Large interfaces should be split into **smaller specific interfaces**.

---

## Bad Example ❌

```javascript
class Machine {
  print() {}
  scan() {}
  fax() {}
}

class BasicPrinter extends Machine {
  print() {
    console.log("Printing");
  }

  scan() {
    throw new Error("Not supported");
  }

  fax() {
    throw new Error("Not supported");
  }
}
```

---

## Good Example ✅

```javascript
class Printer {
  print() {}
}

class Scanner {
  scan() {}
}

class Fax {
  fax() {}
}

class BasicPrinter extends Printer {
  print() {
    console.log("Printing");
  }
}
```

---

## Benefits

* Smaller interfaces
* Better flexibility
* Avoid unnecessary implementation

---

## Real World Example

Restaurant ordering system

Instead of:

```
OrderService
- dineIn
- takeAway
- delivery
```

Use:

```
DineInOrder
TakeAwayOrder
DeliveryOrder
```

---

## Key Takeaway

**Many small interfaces > one large interface**
