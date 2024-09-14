let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterEvenNumbers(arr) {
    return arr.filter(function(a) {
        return a % 2 === 0;
    });
}

console.log(filterEvenNumbers(input)); // Output: [2, 4, 6, 8, 10]
