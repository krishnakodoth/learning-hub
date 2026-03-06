/*
| Algorithm: Divide & Conquer
*/

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([3,6,10,14,18,25,29], 25));

/*
## Time Complexity
Each step halves the search space - n → n/2 → n/4 → n/8 ... until we find the target or exhaust the search space.
Number of steps required to reduce n to 1 is log₂(n) (base 2 logarithm of n).

Binary search - O(log n) (Halve the search space with each iteration)
Total - O(log n)
Space Complexity O(1)
*/