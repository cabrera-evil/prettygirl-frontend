const mongoose = require('mongoose');

const bagSchema = mongoose.Schema({
    client_id:{
        type: String,
        require:true
    },
    products:{
        type: Array,
        product_id:{
            type:String,
            require:true
        },
        amount:{
            type:Number,
            default:1
        },
    }
});

module.exports = mongoose.model('Bag', bagSchema);