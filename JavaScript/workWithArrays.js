var V = {
    array: [5, 0, 12, 4, 67, 23, -4, 8, 6, 5, -31],
    arr: []
};

(function (array) {
    array.sort(function (a, b) {
        return (b - a);
    });
    console.log("Осортированный по убыванию массив: " + array);
}(V.array));

(function getFirstFiveElements(array) {
    console.log("Подмассив из первых пяти элементов: " + array.slice(0, 5));
}(V.array));

(function getLastFiveElements(array) {
    console.log("Подмассив из последних пяти элементов: " + array.slice(array.length - 5));
}(V.array));

(function getSumEvenNumbers(array) {
    console.log("Сумма четных элементов массива: " + array.filter(a => a % 2 === 0).reduce(function (sum, currentItem) {
        return sum + currentItem;
    })
    );
}(V.array));

for (var i = 1; i < 101; ++i) {
    V.arr[i - 1] = i
}

(function getSquareEvenNumbers(array) {
    console.log("Список квадратов четных чисел: " + array.filter(a => a % 2 === 0).map(a => a * a));
}(V.arr));