function minMax(...numbers) {
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers)
    };
}

console.log(minMax(1,2,3,4,5,6,7,8,9))