const config = require('config.json');
const db = require('helpers/db');
const Product = db.Product;
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(page) {
    const resPerPage = 10; // results per page
    // Count how many records were found
    const numOfrecords = await Product.count();
    const pages =  Math.ceil(numOfrecords / resPerPage),
    records = await Product.aggregate([{
        $lookup: {
            from: "categories", // collection name in db
            localField: "category_id",
            foreignField: "_id",
            as: "categoryData"
        }
    },
    {
        $addFields: { category_name:
          "$categoryData.name" }
    },
    {
        $project: { "categoryData" :0  }
    }
      ])
    .skip((resPerPage*page) - resPerPage).limit(resPerPage).sort( {createdDate:-1 });
    data = {numOfrecords :numOfrecords,pages:pages,records:records} ;
    return data;
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(inputParam) {
    // validate
    if (await Product.findOne({ name: inputParam.name })) {
        throw 'Product "' + inputParam.name + '" is already taken';
    }

    const product = new Product(inputParam);

    // save product
    await product.save();
    
}

async function update(id, userParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.name !== userParam.name && await Product.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" is already taken';
    }

 

    // copy userParam properties to product
    Object.assign(product, userParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}