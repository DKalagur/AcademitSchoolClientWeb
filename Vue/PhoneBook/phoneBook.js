Vue.component("main-window", {
    data: function () {
        return {
            items: [],
            searchText: "",
            selectedForDelContacts: [],
            filteredItems: [],
            itemForDel: Object,
            selectAll: false,
            isDelCheckedItemButtonDisabled: true,
            isCancelButtonDisabled: true
        };
    },

    methods: {
        addItem: function (item) {
            this.items.push({
                name: item[0],
                lastName: item[1],
                phone: item[2]
            });

            this.newId++;
            this.filteredItems = this.items;
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (e) {
                return e !== item;
            });

            this.filteredItems = this.items;
        },

        deleteCheckedItems: function () {
            var self = this;

            this.selectedForDelContacts.forEach(function (item) {
                self.deleteItem(item);
            });

            this.selectAll = false;
            this.selectedForDelContacts = [];
            this.filteredItems = this.items;
        },

        searchItem: function () {
            if (this.searchText.length === 0) {
                this.filteredItems = this.items;
            } else {
                var self = this;

                this.filteredItems = this.items.filter(function (item) {
                    return (_.values(item).some(function (itemElement) {
                        return itemElement.toUpperCase().indexOf(self.searchText.toUpperCase()) >= 0;
                    }));
                });
            }
            this.searchText = "";
        },

        chooseItem: function (item) {
            this.itemForDel = item;

            $("#deleteItem").on("show.bs.modal", function (event) {
            });
        },

        cancelSearchItem: function () {
            this.filteredItems = this.items;
            this.searchText = "";
        },

        pickAllItems: function (event) {
            if (event) {
                this.selectedForDelContacts = this.filteredItems;
            } else {
                this.selectedForDelContacts = [];
            }
        }
    },

    computed: {
        phones: function () {
            return _.map(this.items, function (num) {
                return _.propertyOf(num)("phone");
            });
        }
    },

    watch: {
        selectedForDelContacts: function () {
            if (this.selectedForDelContacts.length !== 0) {
                this.isDelCheckedItemButtonDisabled = false;
            } else {
                this.isDelCheckedItemButtonDisabled = true;
            }
        },

        filteredItems: function () {
            if (_.isEqual(this.filteredItems, this.items) === true) {
                this.isCancelButtonDisabled = true;
            } else {
                this.isCancelButtonDisabled = false;
            }
        }
    },

    template: "#table-contacts-template"
});

Vue.component("input-form", {
    props: {
        phones: {
            type: Array
        }
    },

    data: function () {
        return {
            newName: "",
            newLastName: "",
            newPhone: "",
            isValidName: true,
            isValidLastName: true,
            isValidPhone: true,
            phoneFieldValidationMessage: "Пожалуйста заполните поле"
        };
    },

    methods: {
        addItem: function () {
            this.isValidName = this.newName.trim().length !== 0;
            this.isValidLastName = this.newLastName.trim().length !== 0;

            if (this.newPhone.trim().length === 0) {
                this.isValidPhone = false;
                this.phoneFieldValidationMessage = "Пожалуйста заполните поле"
            } else if (_.contains(this.phones, this.newPhone)) {
                this.isValidPhone = false;
                this.phoneFieldValidationMessage = "Контакт с таким номером уже существует"
            } else {
                this.isValidPhone = true;
            }

            var item = [this.newName, this.newLastName, this.newPhone];

            if (this.isValidName && this.isValidLastName && this.isValidPhone) {
                this.newName = "";
                this.newLastName = "";
                this.newPhone = "";
                this.$emit("add-item", item);
            }
        }
    },

    template: "#input-form-template"
});

new Vue({
    el: "#phoneBook"
});