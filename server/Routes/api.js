const router = require('express').Router();
const { db } = require('../Database/admin');
const { query } = require('../Database/ParkingData');

const verifyToken = require('./Auth/verifyToken');;

router.patch('/patch/:path', async (req, res) => {
    const param = JSON.parse(req.body.options);
    let payload = Object.keys(param);

    if (payload.length !== 1) return res.send('Invalid payload');

    if (payload[0] !== 'carIn' && payload[0] !== "carOut") return res.send('Invalid payload');

    payload = payload[0]

    const ref = db.collection('Input').doc(req.params.path)

    let responsed = (await ref.get()).data()
    responsed = responsed[payload]
    

    let updateData = await ref.update({ [payload]: responsed + param[payload]})

    res.send('Ok!!')
})

router.all('/:path*?', verifyToken, async (req, res) => {

    const permission = res.permission;
    const path = req.params.path
    let data = await query();

    if (permission === 'client') {
        return res.json(client(data, path))
    }
});




function client(data, path) {
    if (!path) {
        return data.map(v => {
            return {
                title_th: v.title_th,
                title_en: v.title_en,
                path: v.path,
                image: v.image,
                position: v.position,
            }
        })
    }
    const [cur] = data.filter(e => e.path === path);
    return { ...cur, ...{ distance: coodinate(cur, data, path) } }
}





function coodinate(cur, data, path) {
    return data.filter(e => e.path !== path)
        .map(v => {
            return {
                title_th: v.title_th,
                title_en: v.title_en,
                path: v.path,
                image: v.image,
                distance: ((v.position.lat - cur.position.lat) ** 2 + (v.position.long - cur.position.long) ** 2) ** 0.5
            }
        }).sort((a, b) => a.distance < b.distance ? -1 : 1).slice(0, 4);
}

module.exports = router;


