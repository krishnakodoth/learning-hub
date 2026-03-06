Goal
Sort an array efficiently.

Example

[8,3,5,2,9,1]
🔴 Brute Force Approach

Use Bubble Sort

Algorithm

Compare every pair repeatedly
Swap if wrong order

Time Complexity

O(n²)

Why?

Two nested loops
n × n comparisons

If n = 1,000,000

1e6 × 1e6 = 1e12 operations

Impossible.

🟢 Optimized — Divide & Conquer

Use Merge Sort

Idea

Divide array
Sort smaller arrays
Merge sorted arrays

Example

[8,3,5,2]

Split
[8,3] [5,2]

Split
[8] [3] [5] [2]

Merge
[3,8] [2,5]

Merge
[2,3,5,8]
⏱ Time Complexity

Levels of division

log n

Work per level

n

Total

O(n log n)
📦 Space Complexity

Extra array for merging

O(n)