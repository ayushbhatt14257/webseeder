const mongoose = require('mongoose');
const DB = process.env.MONGO_URI

mongoose.connect(DB).then(() => {
    console.log('DB CONNECTED')
}).catch((error) => {
    console.log(error);
})