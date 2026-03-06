# Divide & Conquer

## 📌 Overview

**Divide & Conquer** is an algorithm design paradigm where a problem is divided into smaller subproblems, each subproblem is solved independently, and the results are combined to form the final solution.

This approach is commonly used to improve efficiency compared to brute-force solutions.

### The Three Steps

1. **Divide** – Break the problem into smaller subproblems.
2. **Conquer** – Solve the subproblems recursively.
3. **Combine** – Merge the results to produce the final solution.

```
            Problem
               |
            Divide
           /     \
      Subproblem Subproblem
           |        |
        Conquer  Conquer
           \        /
            Combine
               |
             Result
```

---

# 🧠 When to Use Divide & Conquer

Use Divide & Conquer when:

- The problem can be split into **smaller independent subproblems**
- Each subproblem is **similar to the original problem**
- Results from subproblems can be **combined efficiently**

Typical scenarios:

- Searching in **sorted arrays**
- **Sorting algorithms**
- **Tree algorithms**
- Problems that reduce input size **by half**

---

# ⚔️ Divide & Conquer vs Brute Force

| Approach | Idea | Time Complexity |
|--------|------|----------------|
| Brute Force | Check every possible solution | Usually O(n²) or worse |
| Divide & Conquer | Break problem and solve smaller parts | Often O(n log n) |

Example: Finding maximum element

**Brute Force**

```
Scan entire array once
```

**Divide & Conquer**

```
Split array into two halves
Find max in left half
Find max in right half
Return the larger value
```

---

# 📚 Classic Algorithms Using Divide & Conquer

| Algorithm | Use Case |
|----------|----------|
| Binary Search | Searching |
| Merge Sort | Sorting |
| Quick Sort | Sorting |
| Maximum Subarray | Finding max sum |
| Closest Pair of Points | Computational geometry |
| Karatsuba Algorithm | Fast multiplication |

---

# Example 1 — Binary Search

Binary Search repeatedly divides the search space in half.

### Time Complexity

```
O(log n)
```

### JavaScript Implementation

```javascript
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) {
      return mid
    }

    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

const arr = [1,3,5,7,9,11]
console.log(binarySearch(arr, 7))
```

---

# Example 2 — Merge Sort

Merge Sort divides the array recursively and merges sorted halves.

### Time Complexity

```
O(n log n)
```

### JavaScript Implementation

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)

  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

function merge(left, right) {
  const result = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)]
}

console.log(mergeSort([8,3,5,4,7,6,1,2]))
```

---

# 🌳 Recursion Tree Example (Merge Sort)

```
[8,3,5,4,7,6,1,2]

           Split
        /        \
   [8,3,5,4]   [7,6,1,2]

     /   \        /   \
   [8,3] [5,4]  [7,6] [1,2]

     ↓     ↓      ↓     ↓
   [3,8] [4,5]  [6,7] [1,2]

            Merge

[1,2,3,4,5,6,7,8]
```

---

# ⏱ Time Complexity Analysis

Divide & Conquer algorithms often follow this recurrence:

```
T(n) = aT(n/b) + f(n)
```

Where:

- **a** = number of subproblems
- **n/b** = size of each subproblem
- **f(n)** = cost of dividing and merging

Example for Merge Sort:

```
T(n) = 2T(n/2) + O(n)
```

Using **Master Theorem**

```
Time Complexity = O(n log n)
```

---

# 👍 Advantages

- Efficient for large problems
- Reduces time complexity significantly
- Works well with recursion
- Can be parallelized

---

# 👎 Disadvantages

- Recursion overhead
- Some algorithms require extra memory
- Implementation complexity can increase

---

# 🧪 Practice Problems

### Easy

- Binary Search
- Find Maximum Element
- Count Occurrences in Sorted Array

### Medium

- Merge Sort
- Quick Sort
- Maximum Subarray

### Hard

- Median of Two Sorted Arrays
- Closest Pair of Points
- Skyline Problem

---

# 🧩 Example Problem

### Find Maximum Element using Divide & Conquer

```javascript
function findMax(arr, left, right) {

  if (left === right) {
    return arr[left]
  }

  const mid = Math.floor((left + right) / 2)

  const leftMax = findMax(arr, left, mid)
  const rightMax = findMax(arr, mid + 1, right)

  return Math.max(leftMax, rightMax)
}

const arr = [3,9,2,8,5]

console.log(findMax(arr, 0, arr.length - 1))
```

### Time Complexity

```
O(n)
```

---

# 💡 Interview Insight

If you notice:

- Problem can be **split**
- Input size **reduces each step**
- Recursion appears naturally
- Searching in **sorted structure**

Think about **Divide & Conquer**.

---

# 📂 Suggested Repository Structure

```
divide-and-conquer/
│
├── binary-search.js
├── merge-sort.js
├── quick-sort.js
├── max-subarray.js
└── problems.md
```

---

# 🎯 Learning Goal

This repository section aims to:

- Understand **Divide & Conquer deeply**
- Implement classic algorithms
- Compare **Brute Force vs Optimized approaches**
- Practice **interview-level problems**

---