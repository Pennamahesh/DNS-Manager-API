const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


const { getAllDNS,
        postDNS,    
        getDNSbyId,
        updateDNS,
        deleteDNS ,
        postBulk
    } = require('../DNSController/DNSController')

router.route('/').get(getAllDNS).post(postDNS)
router.route('/:id').get(getDNSbyId).put(updateDNS).delete(deleteDNS)
router.post('/bulk', upload.single('file'), postBulk);

module.exports = router;