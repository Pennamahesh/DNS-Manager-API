const mongose = require("mongoose");

const DNSmodel = mongose.Schema({
    _id: mongose.Schema.Types.ObjectId,
    Adress: {
        type: String,
        required: [true, "please provide the Adress"],
    },
    IP: {
        type: String,
        required: [true, "please provide the IP"],
    },
    CNAME: {
        type: String,
        required: [true, "please provide the CNAME"],
    },
    MX: {
        type: String,
        required: [true, "please provide the MX"],
    },
    NS: {
        type: String,
        required: [true, "please provide the NS"],
    },
    PTR: {
        type: String,
        required: [true, "please provide the PTR"],
    },
    SOA: {
        type: String,
        required: [true, "please provide the SOA"],
    },
    SRV: {
        type: String,
        required: [true, "please provide the SRV"],
    },
    TXT: {
        type: String,
        required: [true, "please provide the TXT"],
    },
    DNSSEC: {
        type: String,
        required: [true, "please provide the DNSSEC"],
    },
});


module.exports=mongose.model("Contacts",DNSmodel)