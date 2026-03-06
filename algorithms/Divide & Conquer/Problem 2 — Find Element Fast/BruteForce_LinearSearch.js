function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

console.log(linearSearch([3,6,10,14,18,25,29], 25));

/*
## Time Complexity
Linear search - O(n) (Check every element in the worst case)
Total - O(n)
Space Complexity O(1)
*/