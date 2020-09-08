Vue.component("todo-item", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            inputFieldText: this.item.text
        };
    },

    methods: {
        deleteItem: function () {
            this.$emit("delete-item", this.item, this.inputFieldText);
        },

        editItem: function () {
            this.inputFieldText = this.item.text;
            this.$emit("edit-item", this.item);
        },

        saveItem: function (currentText) {
            this.inputFieldText = currentText;
            this.$emit("save-item", this.item, currentText);
        },

        cancelEdit: function () {
            this.$emit("cancel-edit", this.item);
        }
    },

    template: "#todo-item-template"
});

Vue.component("todo-list", {
    data: function () {
        return {
            items: [],
            newItemText: "",
            newId: 1,
            isEmptyInputText: false
        };
    },

    methods: {
        addItem: function () {
            if (this.newItemText.trim().length === 0) {
                this.isEmptyInputText = true;
                return;
            }

            this.isEmptyInputText = false;
            this.items.push({
                id: this.newId,
                text: this.newItemText,
                editingMode: false,
                isEmptyFieldText: false
            });

            this.newId++;
            this.newItemText = "";
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (e) {
                return e !== item;
            });
        },

        editItem: function (item) {
            item.editingMode = true;
        },

        saveItem: function (item, currentText) {
            if (currentText.trim().length === 0) {
                item.isEmptyFieldText = true;
                return;
            }

            item.isEmptyFieldText = false;
            item.editingMode = false;
            item.text = currentText;
        },

        cancelEdit: function (item) {
            item.editingMode = false;
            item.isEmptyFieldText = false;
        }
    },

    template: "#todo-list-template"
});

new Vue({
    el: '#my-form'
});