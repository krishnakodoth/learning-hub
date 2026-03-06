function bubbleSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

console.log(bubbleSort([8,3,5,2,9,1]));

/*
## Time Complexity

Outer loop - n
Inner loop - n

Total - n × n = O(n²)
Space Complexity O(1)
(in-place sorting)

*/