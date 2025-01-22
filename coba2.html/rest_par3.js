function oddNumbers(...nums) {
    return nums.filter(num => num % 2 == 1);
}

console.log(oddNumbers(1,2,3,4,5,6,7,8,9,10));