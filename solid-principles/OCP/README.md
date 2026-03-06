# Open Closed Principle (OCP)

## Definition

**Software entities should be open for extension but closed for modification.**

You should be able to **add new functionality without changing existing code**.

---

## Bad Example ❌

```javascript
class DiscountCalculator {
  calculate(type, amount) {
    if (type === "regular") {
      return amount * 0.1;
    }

    if (type === "premium") {
      return amount * 0.2;
    }

    if (type === "vip") {
      return amount * 0.3;
    }
  }
}
```

### Problem

Every time a new discount type is added, the class must be modified.

---

## Good Example ✅

```javascript
class Discount {
  calculate(amount) {
    return 0;
  }
}

class RegularDiscount extends Discount {
  calculate(amount) {
    return amount * 0.1;
  }
}

class PremiumDiscount extends Discount {
  calculate(amount) {
    return amount * 0.2;
  }
}

class VipDiscount extends Discount {
  calculate(amount) {
    return amount * 0.3;
  }
}

class DiscountCalculator {
  calculate(discountStrategy, amount) {
    return discountStrategy.calculate(amount);
  }
}
```

Usage

```javascript
const calculator = new DiscountCalculator();
const discount = calculator.calculate(new VipDiscount(), 1000);
```

---

## Benefits

* No modification to existing code
* Easy to extend
* Safer production systems

---

## Real World Example

Payment systems

Instead of modifying payment code:

* Add `StripePayment`
* Add `RazorpayPayment`
* Add `PaypalPayment`

---

## Key Takeaway

**Extend behavior → Do not modify existing code**
