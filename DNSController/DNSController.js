const DNSmodel = require("../Models/DnsModel");
const asynhandler = require("express-async-handler");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { default: mongoose } = require("mongoose");



const getAllDNS = asynhandler(async (req, res) => {
    const DNS = await DNSmodel.find();
    res.status(201).json(DNS);
    }
);

const postBulk = asynhandler(async (req, res) => {
    const fileRows = [];
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', async (data) => {
        fileRows.push(data);
        const { Adress, IP, CNAME, MX, NS, PTR, SOA, SRV, TXT, DNSSEC } = data;
        if (!Adress || !IP || !CNAME || !MX || !NS || !PTR || !SOA || !SRV || !TXT || !DNSSEC) {
            res.status(400);
            throw new Error("All fields are required");
        }
        await DNSmodel.create({
            Adress,
            IP,
            CNAME,
            MX,
            NS,
            PTR,
            SOA,
            SRV,
            TXT,
            DNSSEC
        });
    })
    .on('end', () => {
        console.log(fileRows);
        res.status(201).json(fileRows);
    });
});

const postDNS = asynhandler(async (req, res) => {
    const {Adress, IP, CNAME, MX, NS, PTR, SOA, SRV, TXT, DNSSEC} = req.body;
    console.log(req.body);
    if(!Adress || !IP || !CNAME || !MX || !NS || !PTR || !SOA || !SRV || !TXT || !DNSSEC){
        res.status(400);
        throw new Error("All fields are required");
    }
    const postDNS = await DNSmodel.create({
        Adress,
        IP,
        CNAME,
        MX,
        NS,
        PTR,
        SOA,
        SRV,
        TXT,
        DNSSEC
    });
    res.status(201).json(postDNS);
    }
);

const getDNSbyId = asynhandler(async (req, res) => {
    const DNSbyid = await DNSmodel.findById(req.params.id);
    if(!DNSbyid){
        res.status(400);
        throw new Error("DNS Not Found");
    }
    res.status(201).json(DNSbyid);
    }
);

const updateDNS = asynhandler(async (req, res) => {
    const DNSbyid = await DNSmodel.findById(req.params.id);
    if(!DNSbyid){
        res.status(400);
        throw new Error("DNS Not Found");
    }
    const updateDNS = await DNSmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateDNS);
    }
);

const deleteDNS = asynhandler(async (req, res) => {
    const id= mongoose.Schema.ObjectId(req.params.id)
    const DNSbyid = await DNSmodel.findById(id);
    console.log(DNSbyid);
    if(!DNSbyid){
        res.status(400);
        throw new Error("DNS Not Found");
    }
    await DNSbyid.remove();
    console.log("DNS Deleted");
    res.status(200).json(DNSbyid);
    }
);

module.exports = {
    getAllDNS,
    postDNS,
    getDNSbyId,
    updateDNS,
    deleteDNS,
    postBulk
};