Vue.component("todo-item", {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    methods: {
        deleteItem: function () {
            this.$emit("delete-item", this.item);
        },
        editItem: function () {
            this.$emit("edit-item", this.item);
        },
        saveItem: function () {
            this.$emit("save-item", this.item);
        },
        cancelEdit: function () {
            this.$emit("cancel-edit", this.item);
        },
    },
    template: "#todo-item-template"
});

Vue.component("todo-list", {
    data: function () {
        return {
            items: [],
            newItemText: "",
            newId: 1,
            isEmptyText: false
        };
    },
    methods: {
        addItem: function () {
            if (this.newItemText.trim().length === 0) {
                this.isEmptyText = true;
                return;
            }
            this.isEmptyText = false;
            this.items.push({
                id: this.newId,
                text: this.newItemText,
                editingMode: false
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
            item.currentValue = item.text;
        },
        saveItem: function (item) {
            if (item.text.trim().length === 0) {
                return;
            }
            item.editingMode = false;
        },
        cancelEdit: function (item) {
            item.text = item.currentValue;
            item.editingMode = false;
        }
    },
    template: "#todo-list-template"
});

new Vue({
    el: '#my-form'
});