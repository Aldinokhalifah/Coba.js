function sumArray(arr) {
    let total = 0; // Inisialisasi variabel penampung

    for (let i = 0; i < arr.length; i++) {
        total += arr[i]; // Tambahkan elemen ke total
    }

    return total; // Kembalikan hasil penjumlahan
}
console.log(sumArray([1,2,3,4,5,6]));
