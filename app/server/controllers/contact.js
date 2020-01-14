function getAllData(req, res) {
    const db = req.app.get('db');

    db.contact
        .find()
        .then(users => res.status(200).json(users))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function getDataById(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params;

    db.contact
        .findOne({
            id: contact_id
        })
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function updateUser(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params;

    db.contact
        .update({
            id: contact_id
        }, req.body)
        .then(contact => res.status(201).send(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function deleteUser(req, res) {
    const db = req.app.get('db');

    db.contact
        .destroy(req.query)
        .then(contact => {
            res.status(200).json(contact)
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function searchUser(req, res) {
    const db = req.app.get('db');

    db.contact
        .search({
            fields: ['fname', 'lname'],
            term: req.query.name
        })
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function addUser(req, res) {
    const db = req.app.get('db');
    const { user_id } = req.query;
    const { fname, lname, home_phone, mobile_phone, work_phone, city, state, postal_code, country } = req.body;

    db.contact
        .insert({
            fname,
            lname,
            home_phone,
            mobile_phone,
            work_phone,
            city,
            state,
            postal_code,
            country
        }, {
            deepInsert: true
        })
        .then(function (contact) {
            const contact_id = contact.id;

            db.addressbook
                .insert({
                    user_id: user_id,
                    contact_id: contact_id
                }, {
                    deepInsert: true
                })
            res.status(201).json({ ...contact })
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })

}

module.exports = {
    getAllData, getDataById, updateUser, deleteUser, searchUser, addUser
}