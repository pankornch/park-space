const { db } = require('./admin');
require('dotenv');
module.exports.query = () => {
    return new Promise((resolve, reject) => {
        resolve(db.collection(process.env.STATIC).get()
            .then(querySnapshot => {
                return querySnapshot.docs.map(doc => {
                    return doc.data()
                });
            })
        )
    })
}
