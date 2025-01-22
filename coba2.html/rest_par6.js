function countString(...string) {
    let total = 0;
    for(str of string) {
        total += str.length;
    }

    return total;
}

console.log(countString('hp', 'samsung', 'lenovo'))