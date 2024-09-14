function countChar(str, char) {
    const count = str.split(char).length - 1; 
    return count; 
}
console.log(countChar('hello, world', 'o'));