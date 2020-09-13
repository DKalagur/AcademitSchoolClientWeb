var express = require('express');
var router = express.Router();

var newContactId = 1;
var contacts = [];

router.get('/getContacts', function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    res.send(term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.name.toUpperCase().indexOf(term) >= 0 || c.phone.toUpperCase().indexOf(term) >= 0 || c.lastName.toUpperCase().indexOf(term) >= 0;
        })
    );
});

router.post('/addContact', function (req, res) {
    var contact = req.body.contact;
    var invalidData = [];
    var isValidData = true;

    if (!contact) {
        res.send({
            success: false,
            message: "Неверные данные в запросе"
        });
    }

    if (!contact.name) {
        invalidData.push("name");
        isValidData = false;
    }

    if (!contact.lastName) {
        invalidData.push("lastName");
        isValidData = false;
    }

    if (!contact.phone) {
        invalidData.push("phone");
        isValidData = false;
    }

    contacts.forEach(function (element) {
        if (contact.phone === element.phone) {
            isValidData = false;
            invalidData.push("samePhone");
        }
    });

    if (!isValidData) {
        res.send({
            success: false,
            invalidData: invalidData,
        });
        return;
    }

    contact.id = newContactId;
    ++newContactId;
    contacts.push(contact);

    res.send({
        success: true
    });
})

router.post('/deleteContact', function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true
    });
});

router.post('/deleteCheckedContacts', function (req, res) {
    var ids = req.body.ids;

    ids.forEach(function (id) {
        contacts = contacts.filter(function (c) {
            return c.id !== id;
        });
    });

    res.send({
        success: true
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;