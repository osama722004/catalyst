const mongoose = require('mongoose');
const stockSchema =new mongoose.Schema({ 
    type: {
        type: String,
        enum: ["Comon Stock","Preffered Stock"],
        default:"Comon Stock"
    },

    amount: { 
        type: Number,
        required:true
    },
    price: { 
        type: Number,
        required:true,
    },

});

module.exports = mongoose.model('Stock', stockSchema);