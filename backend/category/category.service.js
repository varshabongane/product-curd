const config = require('config.json');
const db = require('helpers/db');
const Category = db.Category;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(page) {
    if(page == "all"){//for fetching  all category 
        const numOfrecords = await Category.count();
        var recordsAll = await Category.find().sort( {createdDate:-1 });
        data = {numOfrecords :numOfrecords,records:recordsAll} ;
        return data;
    }

    const resPerPage = 10; // results per page
    // Count how many records were found
    const numOfrecords = await Category.count();
    const pages =  Math.ceil(numOfrecords / resPerPage),
    records = await Category.find().skip((resPerPage*page) - resPerPage).limit(resPerPage).sort( {createdDate:-1 });
    data = {numOfrecords :numOfrecords,pages:pages,records:records} ;
    return data;
}

async function getById(id) {
    return await Category.findById(id);
}

async function create(inputParam) {
    // validate
    if (await Category.findOne({ name: inputParam.name })) {
        throw 'Catgory "' + inputParam.name + '" is already taken';
    }

    const category = new Category(inputParam);

    // save category
    await category.save();
    
}

async function update(id, userParam) {
    const category = await Category.findById(id);

    // validate
    if (!category) throw 'Category not found';
    if (category.name !== userParam.name && await Category.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" is already taken';
    }

 

    // copy userParam properties to category
    Object.assign(category, userParam);

    await category.save();
}

async function _delete(id) {
    await Category.findByIdAndRemove(id);
}