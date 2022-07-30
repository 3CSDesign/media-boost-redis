/**
 * 
 * Main file
 * 
 */

const { file_proc } = require("./download");
const { toGcs } = require("./gcs");
const { informNG } = require("./informNG");
const { getKeys } = require("./redis");

//conntect to redis server
getKeys(proccess);
//retrive / sort files to be boosted

function proccess(keys) {
    console.log("detected links :"+keys.length);
    file_proc(keys,pushGCS)
}

//push to GCS

function pushGCS(obs) {
    console.log("downloaded files :"+obs.length);
    toGcs(obs,informNginx)
}

//update mysql

function informNginx(objs) {
    console.log("moved files :"+objs.length);
    informNG(objs);
}

//delete afterwards
