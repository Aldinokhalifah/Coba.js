function isPalindrome(str) {
    // Menggunakan metode chaining untuk membalikkan string
    const reversed = str.split('').reverse().join('');
    return str === reversed; // Mengembalikan hasil perbandingan string asli dengan string yang dibalik
}

// Contoh pemanggilan fungsi
console.log(isPalindrome("madam")); // Output: true
console.log(isPalindrome("hello")); // Output: false
