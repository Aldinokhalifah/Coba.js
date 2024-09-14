function reverseString(str) {
    let string = str.split('');
    let reverse = string.reverse();
    let join = reverse.join('');
    return join
}
console.log(reverseString('hello, wolrd!'));