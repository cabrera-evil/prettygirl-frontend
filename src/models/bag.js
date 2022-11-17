const mongoose = require('mongoose');

const bagSchema = mongoose.Schema({
    user:{
        type: String,
        require:true
    },
    products:{
        type:Array,
        detail:{
            type:Object,
            require:true,
            product_id:{
                type:String,
                require:true
            },
            amount:{
                type:Number,
                require:true
            },
        },
        require:true
    }
});

module.exports = mongoose.model('Bag', bagSchema);