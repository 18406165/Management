/**
 * ManagementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
 
    // action - create
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('person/create');

    if (typeof req.body.management === "undefined")
        return res.badRequest("Form-data not received.");

    await management.create(req.body.management);

    return res.ok("Successfully created!");
},

// action - paginate
paginate: async function (req, res) {

    const qPage = Math.max(req.query.page - 1, 0) || 0;

    const numOfItemsPerPage = 2;

    var models = await Person.find({
        limit: numOfItemsPerPage, 
        skip: numOfItemsPerPage * qPage
    });

    var numOfPage = Math.ceil(await Person.count() / numOfItemsPerPage);

    return res.view('person/paginate', { persons: models, count: numOfPage });
},
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('ManagementEvent/create');

    if (typeof req.body.ManagementEvent === "undefined")
        return res.badRequest("Form-data not received.");

    await ManagementEvent.create(req.body.Person);

    return res.ok("Successfully created!");
},

};

