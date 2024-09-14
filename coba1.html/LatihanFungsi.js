let input = ["apple", "banana", "orange", "pineapple", "kiwi"];
const result = input.filter(checkArray);

function checkArray(str) {
    return str.length > 5;
}

console.log(result); // Output: ["banana", "orange", "pineapple"]
