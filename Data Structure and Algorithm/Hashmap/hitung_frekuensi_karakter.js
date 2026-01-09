let input = 'banana';

const map = new Map();
let test = "";

for(let i = 0; i < input.length; i++) {
    let karakter = input.charAt(i);

    if(map.has(karakter)) {
        map.set(karakter, map.get(karakter) + 1);
    } else {
        map.set(karakter, 1);
    }
}

console.log('Frekuensi karakter dalam string ' + input);
map.forEach((value, key) => {
    test += key + ' : ' + value + '\n';
});
console.log(test);