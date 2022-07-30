/**
 * 
 * Main file
 * 
 */

const { file_proc } = require("./download");
const { toGcs } = require("./gcs");
const { getKeys } = require("./redis");

//conntect to redis server
getKeys(proccess);
//retrive / sort files to be boosted

function proccess(keys) {
    console.log(keys);
    file_proc(keys,pushGCS)
}

//push to GCS

function pushGCS(obs) {
    console.log(obs.length);
    toGcs(obs,informNginx)
}

//update mysql

function informNginx(objs) {
    console.log(objs.length);
}

//delete afterwards
