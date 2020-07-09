const jwt = require('jsonwebtoken');
const { db } = require('../../Database/admin');
require('dotenv');

const ref = db.collection('admin').get();


module.exports.query = async (req, res, next) => {
    let Bearer, token;
    try {
        [Bearer, token] = req.header('auth-token').split(' ');
    } catch (error) {
        res.permission = 'client'
        return next()
    }

    if (Bearer !== 'Bearer') {
        return res.send('Access Denied');
    }

    const users = await ref.then(snap => snap.docs.map(doc => doc.data()))

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        const [existUser] = users.filter(e => e._id === verified.id_);
        res.permission = existUser._id
        next()
    } catch (error) {
        res.send(error)
    }
}




module.exports.verify = async (req, res, next) => {
    let Bearer, token;
    try {
        [Bearer, token] = req.header('auth-token').split(' ');
    } catch (error) {
        next();
    }

    if (Bearer !== 'Bearer') {
        next();
    }

    const users = await ref.then(snap => snap.docs.map(doc => doc.data()));

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        const [existUser] = users.filter(e => e._id === verified.id_);

        if (existUser) return res.send('Success');

        next();

    } catch (error) {
        next();
    }
}