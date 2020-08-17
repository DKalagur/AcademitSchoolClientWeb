(function () {
    var peoples = [
        {
            name: "Denis",
            lastName: "Kalagur",
            age: 30
        },
        {
            name: "Olga",
            lastName: "Kalagur",
            age: 25
        },
        {
            name: "Michail",
            lastName: "Kondratiev",
            age: 45
        },
        {
            name: "Fedor",
            lastName: "Fedorov",
            age: 15
        },
        {
            name: "Ivan",
            lastName: "Sidorov",
            age: 31
        },
        {
            name: "Tatiana",
            lastName: "Postnikova",
            age: 48
        },
        {
            name: "Elena",
            lastName: "Ustinova",
            age: 31
        },
        {
            name: "Vasiliy",
            lastName: "Terkin",
            age: 25
        },
        {
            name: "Sergey",
            lastName: "Enin",
            age: 38
        },
        {
            name: "Frol",
            lastName: "Damirov",
            age: 21
        }
    ];

    console.log(peoples);

    var averageAge = _.reduce(peoples, function (memo, num) {
        return memo + num.age
    }, 0) / peoples.length;

    console.log(averageAge);

    var filteredAndSortedByAgePeoples = _.chain(peoples)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy("age")
        .value();

    console.log(filteredAndSortedByAgePeoples);

    _.each(peoples, function (p) {
        p.fullName = p.lastName + " " + p.name;
    });

    console.log(peoples);
})();