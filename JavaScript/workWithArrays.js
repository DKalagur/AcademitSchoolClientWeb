(function () {
    var unsorted = [5, 0, 12, 4, 67, 23, -4, 8, 6, 5, -31];
    var fromOneToHundred = [];

    function decreaseSort(array) {
        return array.sort(function (a, b) {
            return (b - a);
        });
    }

    function getFirstFiveElements(array) {
        return array.slice(0, 5);
    }

    function getLastFiveElements(array) {
        return array.slice(array.length - 5);
    }

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).reduce(function (sum, currentItem) {
            return sum + currentItem;
        }, 0);
    }

    for (var i = 1; i <= 100; ++i) {
        fromOneToHundred.push(i);
    }

    function getEvenNumbersSquare(array) {
        return array.filter(function (number) {
            return number % 2 === 0;
        }).map(function (e) {
            return e * e;
        });
    }

    console.log("Осортированный по убыванию массив: " + decreaseSort(unsorted));
    console.log("Подмассив из первых пяти элементов: " + getFirstFiveElements(unsorted));
    console.log("Подмассив из последних пяти элементов: " + getLastFiveElements(unsorted));
    console.log("Сумма четных элементов массива: " + getEvenNumbersSum(unsorted));
    console.log("Список квадратов четных чисел: " + getEvenNumbersSquare(fromOneToHundred));
}());