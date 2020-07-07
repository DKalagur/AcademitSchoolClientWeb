(function () {
    var countries = [
        {
            name: "Russia",
            cities: [
                {name: "Moscow", population: 12.92},
                {name: "Novosibirsk", population: 1.62},
                {name: "Krasnoyarsk", population: 1.00}
            ]
        },
        {
            name: "Japan",
            cities: [
                {name: "Tokio", population: 9.2},
                {name: "Osaka", population: 2.68},
                {name: "Kioto", population: 1.47},
                {name: "Yokogama", population: 3.7}
            ]
        },
        {
            name: "France",
            cities: [
                {name: "Paris", population: 2.15},
                {name: "Lyon", population: 0.51},
                {name: "Nice", population: 0.53},
                {name: "Bordeaux", population: 0.26}
            ]
        }
    ];

    function findMaxCitiesQuantityCountries(countries) {
        var maxCitiesQuantity = 0;
        var maxCitiesQuantityCountries = [];
        countries.forEach(function (item) {
            if (item.cities.length > maxCitiesQuantity) {
                maxCitiesQuantity = item.cities.length;
            }
        });

        countries.forEach(function (item) {
            if (item.cities.length === maxCitiesQuantity) {
                maxCitiesQuantityCountries.push(item.name);
            }
        });
        return maxCitiesQuantityCountries;
    }

    function getAllCountriesPopulationSum(countries) {
        var obj = {};
        countries.forEach(function (item) {
            obj[item.name] = item.cities.reduce(function (sum, currentItem) {
                return sum + currentItem.population;
            }, 0);
        });
        return obj;
    }

    console.log(findMaxCitiesQuantityCountries(countries));
    console.log(getAllCountriesPopulationSum(countries));
})();