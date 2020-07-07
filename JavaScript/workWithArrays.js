(function f() {
    var arrays = {
        unsorted: [5, 0, 12, 4, 67, 23, -4, 8, 6, 5, -31],
        fromOneToHundred: []
    };

    function decreaseSort(array) {
        array.sort(function (a, b) {
            return (b - a);
        });
        return array;
    }

    function getFirstFiveElements(array) {
        return array.slice(0, 5);
    }

    function getLastFiveElements(array) {
        return array.slice(array.length - 5);
    }

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 === 0
        }).reduce(function (sum, currentItem) {
            return sum + currentItem;
        }, 0);
    }

    for (var i = 1; i <= 100; ++i) {
        arrays.fromOneToHundred.push(i);
    }

    function getEvenNumbersSquare(array) {
        return array.filter(function (number) {
            return number % 2 === 0
        }).map(function (e) {
            return e * e
        });
    }

    console.log("Осортированный по убыванию массив: " + decreaseSort(arrays.unsorted));
    console.log("Подмассив из первых пяти элементов: " + getFirstFiveElements(arrays.unsorted));
    console.log("Подмассив из последних пяти элементов: " + getLastFiveElements(arrays.unsorted));
    console.log("Сумма четных элементов массива: " + getEvenNumbersSum(arrays.unsorted));
    console.log("Список квадратов четных чисел: " + getEvenNumbersSquare(arrays.fromOneToHundred));
}());