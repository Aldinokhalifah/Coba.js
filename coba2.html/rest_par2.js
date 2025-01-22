function average(...numbers){
    let sum = 0;
    for(let num of numbers) {
        sum += num;
    }

    return sum / numbers.length;
}

console.log(average(1,2,3,4,5,6,7,8,9,10));