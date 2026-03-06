Problem 2 — Find Element Fast

Find number 25 in sorted array.

[3,6,10,14,18,25,29]
🔴 Brute Force

Scan every element.

for each element
 check if equals target

Time Complexity

O(n)
🟢 Divide & Conquer

Use Binary Search

Algorithm:

Check middle
If target smaller → left
If larger → right

Steps

25 vs 14 → go right
25 vs 25 → found
⏱ Time Complexity

Array halves each step.

n → n/2 → n/4 → n/8

Number of steps

log n

So

O(log n)
📦 Space Complexity

Iterative version

O(1)

Recursive version

O(log n)