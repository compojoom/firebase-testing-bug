import * as functions from "firebase-functions";

let admin = null;

exports.initializeMockApp = function(mock) {
    admin = mock;

    // console.log('aaad min mock', admin.firestore().Timestamp, admin)
    // if (typeof admin.firestore.Timestamp === 'undefined') {
    //     const normalAdmin = require("firebase");
    //     admin.firestore.Timestamp = normalAdmin.firestore.Timestamp
    // }
};

exports.initializeApp = function() {
    console.log('init app')
    if (!admin) {
        console.log('init app')
        admin = require("firebase-admin");
        admin.initializeApp();
    }
};

exports.getAdmin = function() {

    return admin;
};
