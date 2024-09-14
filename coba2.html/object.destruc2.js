const car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020
};

let {brand: carBrand, model: carModel, year: carYear} = car;

console.log(carBrand); // Output: Toyota
console.log(carModel); // Output: Corolla
console.log(carYear);  // Output: 2020
