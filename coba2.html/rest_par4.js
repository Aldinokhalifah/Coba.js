function productDetails(productName, ...prices) {
    console.log(`Produk: ${productName}`);
    console.log(`Harga: ${prices.join(',')}`);
}

productDetails('Kamera', 1000, 2300, 90000);