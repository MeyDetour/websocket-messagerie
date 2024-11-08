const mongoose = require( "mongoose");

const Message = new mongoose.Schema({
    content: {
        type: mongoose.SchemaTypes.String
    },

})