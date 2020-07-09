const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { db } = require('../../Database/admin');

const ref = db.collection('admin').get()

router.post('/login', async (req, res) => {

    const users = await ref.then(snap => {
        return snap.docs.map(doc => doc.data())
    })
    const [existUser] = users.filter(e => e.email === req.body.email);
    if (!existUser) return res.send('Email Or Password is invalid');

    const verified = bcrypt.compareSync(req.body.password, existUser.password)
    if (!verified) return res.send('Email Or Password is invalid');

    const token = jwt.sign({ id_: existUser._id }, process.env.SECRET_KEY)
    res.send(token)
})


router.post('/verify', async (req, res) => {
    const [Bearer, token] = req.header('auth-token').split(' ');
    if (Bearer !== 'Bearer' && !token) return res.send("Acess Denied")
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)

        const users = await ref.then(snap => {
            return snap.docs.map(doc => doc.data())
        })

        const [existUser] = users.filter(e => e.id_ === users._id);
        return res.send('Success')
    } catch (error) {
        res.send('error')
    }

})

// router.post('/register', async (req, res) => {

//     // FS

//     if (req.body.password.length < 6) return res.send("Password must be greate than 6 charactors!")

//     const [existEmail] = await Users.filter(e => e.email === req.body.email)

//     if (existEmail) return res.send("email had already in database")
//     const salt = bcrypt.genSaltSync(10)
//     const hashPass = bcrypt.hashSync(req.body.password, salt)
//     const hashId = bcrypt.hashSync("SOME_ID", salt).split('/').join('')

//     Users.push({
//         _id: hashId,
//         name: req.body.name,
//         email: req.body.email,
//         password: hashPass,
//         date: new Date()
//     })

//     fs.writeFileSync('./model/Users_json.json', JSON.stringify(Users, null, 2))
//     res.send("Done")

// })

// router.post('/login', async (req, res) => {
//     const [user] = await UserDB.filter(e => e.email === req.body.email)
//     if (!user) return res.json({ msg: 'email is wrong' })

//     // 
//     const validPass = await bcrypt.compare(req.body.password, user.password)
//     if (!validPass) return res.json({ msg: 'incorrect password' })

//     // 
//     const token = jwt.sign({ id_: user._id }, process.env.SECRET_KEY)

//     res.json({ token })

// })

// router.post('/verify/', async (req, res) => {

//     const token = req.header('auth-token')
//     try {
//         const vToken = jwt.verify(token, process.env.SECRET_KEY)
//         const [found] = await UserDB.filter(e => e._id === vToken.id_)
//         if (found) return res.send('authorization completed')
//         res.send("Invalid Token")

//     } catch (err) {
//         res.send("Invalid Token")
//     }

// })





module.exports = router;
