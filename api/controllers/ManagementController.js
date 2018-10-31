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
        return res.view('pages/create');

    // if (typeof req.body.management === "undefined")
    //     return res.badRequest("Form-data not received.");



    await Management.create(req.body);

    return res.ok("Successfully created!");
},


// action - view
view: async function (req, res) {

    var message = Management.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Management.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('management/home', { Management: model });

},


// action - update
update: async function (req, res) {

    if (req.method == "GET") {

        var model = await Management.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('pages/update', { person: model });

    } else {

        if (typeof req.body.Management === "undefined")
            return res.badRequest("Form-data not received.");}




        var models = await Management.update(req.params.id).set({
            
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");


},



// action - delete 
delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var message = Management.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var models = await Management.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    return res.ok("Management Deleted.");

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



// action - update
update: async function (req, res) {

    var message = Person.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    if (req.method == "GET") {

        var model = await Person.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('person/update', { person: model });

    } else {

        if (typeof req.body.Person === "undefined")
            return res.badRequest("Form-data not received.");

        var models = await Person.update(req.params.id).set({
            name: req.body.Person.name,
            age: req.body.Person.age
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
},

// action - index
admin: async function (req,res) {
    
    var models = await Management.find();
    // sails.log(models);
    return res.view('pages/admin', { Management: models });
    
},

};

