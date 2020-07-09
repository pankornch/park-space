const router = require('express').Router();
const { db } = require('../Database/admin');
const { query } = require('../Database/ParkingData');


router.patch('/patch/:path', async (req, res) => {

    const param = JSON.parse(req.body.options);
    let payload = Object.keys(param);

    if (payload.length !== 1) return res.send('Invalid payload');

    if (payload[0] !== 'carIn' && payload[0] !== "carOut") return res.send('Invalid payload');

    payload = payload[0]

    const ref = db.collection('Input').doc(req.params.path)

    let responsed = (await ref.get()).data()
    responsed = responsed[payload]


    await ref.update({ [payload]: responsed + param[payload] })

    res.send('Ok!!')
})

router.put('/patch/:path', (req, res) => {
    const [st, dynamic] = req.body.payload;
    Object.keys(st).forEach(e => {
        db.collection(process.env.STATIC).doc(st.path).update({
            [e]: st[e]
        })
    })

    Object.keys(dynamic).forEach(e => {
        db.collection(process.env.DYNAMIC).doc(st.path).update({
            [e]: dynamic[e]
        })
    })

    res.send('')
})


router.all('/:path*?', async (req, res) => {

    // const permission = res.permission;
    const path = req.params.path
    let data = await query();


    res.json(client(data, path))

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