const mongoose = require( "mongoose");

const Message = new mongoose.Schema({
    content: {
        type: mongoose.SchemaTypes.String
    },

})

module.exports = mongoose.model('Message', Message);