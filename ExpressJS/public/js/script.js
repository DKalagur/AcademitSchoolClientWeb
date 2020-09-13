function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

new Vue({
    el: "#app",

    data: {
        contacts: [],
        name: "",
        phone: "",
        lastName: "",
        term: "",
        isValidName: true,
        isValidLastName: true,
        isValidPhone: true,
        phoneFieldValidationMessage: "Пожалуйста заполните поле",
        contactForDel: Object,
        selectedForDelContacts: [],
        selectAll: false,
        isDelCheckedItemButtonDisabled: true,
        isCancelButtonDisabled: true
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        searchContact: function () {
            this.loadContacts();
            this.isCancelButtonDisabled = false;
        },

        loadContacts: function () {
            var self = this;

            get("/getContacts", {
                term: this.term
            }).done(function (data) {
                self.contacts = data;
            }).fail(function () {
                alert("Ошибка при загрузке списка контактов");
            });
        },

        addContact: function () {
            var self = this;
            var request = {
                contact: {
                    name: this.name,
                    lastName: this.lastName,
                    phone: this.phone
                }
            };

            post("/addContact", request).done(function (data) {
                self.isValidName = true;
                self.isValidLastName = true;
                self.isValidPhone = true;

                if (!data.success) {
                    if (data.invalidData.includes("name")) {
                        self.isValidName = false;
                    }

                    if (data.invalidData.includes("lastName")) {
                        self.isValidLastName = false;
                    }

                    if (data.invalidData.includes("phone")) {
                        self.isValidPhone = false;
                        self.phoneFieldValidationMessage = "Пожалуйста заполните поле";
                    }

                    if (data.invalidData.includes("samePhone")) {
                        self.isValidPhone = false;
                        self.phoneFieldValidationMessage = "Контакт с указанным номером уже существует";
                    }
                    return;
                }

                self.name = "";
                self.lastName = "";
                self.phone = "";

                self.loadContacts();
            }).fail(function () {
                alert("Ошибка при создании контакта");
            });
        },

        chooseContact: function (contact) {
            this.contactForDel = contact;

            $("#deleteItem").on("show.bs.modal", function (event) {
            });
        },

        deleteContact: function (contact) {
            var self = this;

            post("/deleteContact", {
                id: contact.id
            }).done(function () {
                self.loadContacts()
            }).fail(function () {
                alert("Ошибка при удалении контакта");
            });
        },

        deleteCheckedContacts: function () {
            var self = this;
            var ids = [];
            this.selectedForDelContacts.forEach(function (item) {
                ids.push(item.id);
            })
            post("/deleteCheckedContacts", {
                ids: ids
            }).done(function () {
                self.loadContacts()
            }).fail(function () {
                alert("Ошибка при удалении контакта");
            });

            this.selectAll = false;
            this.selectedForDelContacts = [];
        },

        cancelSearch: function () {
            this.term = "";
            this.loadContacts();
            this.isCancelButtonDisabled = true;
        },

        pickAllContacts: function (event) {
            if (event) {
                this.selectedForDelContacts = this.contacts;
            } else {
                this.selectedForDelContacts = [];
            }
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
    }
});