# 🚀 Learning Hub

A structured repository documenting my continuous learning journey in **Software Engineering, Algorithms, System Design, and JavaScript fundamentals**.

This repository acts as my **personal knowledge hub** where I explore concepts deeply, document learnings, and implement practical code examples.

The objective is to **build strong fundamentals, practice consistently, and maintain a reference library for future development and interview preparation.**

---

# 📚 Repository Structure

Each topic is organized into its own folder with:

- 📖 Concept explanations
- 💡 Real-world examples
- 🧪 Code implementations
- 🧩 Practice problems

```
learning-hub
│
├── solid-principles
│   ├── README.md
│   ├── srp
│   ├── ocp
│   ├── lsp
│   ├── isp
│   └── dip
│
├── algorithms
│   ├── divide-and-conquer
│   ├── dynamic-programming
│   ├── greedy
│   ├── backtracking
│   └── sorting
│
├── system-design
│   ├── fundamentals
│   ├── scalability
│   └── design-examples
│
└── javascript-concepts
    ├── closures
    ├── event-loop
    ├── promises
    └── async-await
```

---

# 🎯 Learning Focus

## 🧠 Software Engineering Principles

- SOLID Principles
- Design Patterns
- Clean Code
- Scalable Architecture

---

## ⚙️ Algorithms & Data Structures

- Algorithm Paradigms
- Problem Solving Patterns
- Brute Force vs Optimized Approaches
- Time & Space Complexity Analysis

---

## 🏗 System Design

- Scalable system architecture
- Backend design patterns
- Real-world design examples
- Performance optimization

---

## 🟨 JavaScript Deep Dive

- Closures
- Event Loop
- Promises
- Async / Await
- Performance optimization

---

# 🧪 Example Code

Example: **Merge Sort using Divide & Conquer**

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)

  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

function merge(left, right) {
  let result = []
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

  return result.concat(left.slice(i)).concat(right.slice(j))
}
```

---

# 📈 Learning Philosophy

My learning approach follows these steps:

1. Understand the **core concept**
2. Start with a **brute force solution**
3. Improve using **optimized techniques**
4. Apply in **real-world scenarios**
5. Document everything for **future reference**

---

# 🛠 Tech Stack

Most examples in this repository are implemented using:

- JavaScript
- Node.js
- TypeScript
- Markdown

---

# 📌 Purpose of This Repository

- Document my **continuous learning journey**
- Strengthen **core computer science fundamentals**
- Prepare for **system design & coding interviews**
- Share knowledge with the developer community

---

# 🤝 Contributions

This repository is mainly for personal learning, but suggestions and improvements are always welcome.

---

# ⭐ Support

If you find this repository helpful, feel free to **star ⭐ the repository**.

---

💡 *Learning never stops. Consistency builds mastery.*