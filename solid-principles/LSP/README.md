# Liskov Substitution Principle (LSP)

## Definition

**Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.**

If class `B` extends class `A`, we should be able to use `B` wherever `A` is used.

---

## Bad Example ❌

```javascript
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly");
  }
}
```

### Problem

Penguin breaks the behavior of Bird.

---

## Good Example ✅

```javascript
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying");
  }
}

class Sparrow extends FlyingBird {}

class Penguin extends Bird {
  swim() {
    console.log("Swimming");
  }
}
```

---

## Benefits

* Predictable inheritance
* Avoids runtime surprises
* Clean polymorphism

---

## Real World Example

Vehicle system

Bad design:

Vehicle → drive()

Boat extends Vehicle but cannot drive.

Better design:

* Vehicle
* DrivableVehicle
* FlyableVehicle
* SailableVehicle

---

## Key Takeaway

**Child classes must honor the behavior of parent classes.**
