function sumNumber(...num) {
    let sum = 0;
    for(let numbers of num) {
        sum += numbers
    }
    return sum;
}

console.log(sumNumber(1,2,3,));