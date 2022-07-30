const fs = require('fs');
const path = require('path');
const NGINX_DIR = "/data/nginx/static/cache/";

module.exports.informNG = function (objs) {
    objs.forEach(element => {
        let dir = NGINX_DIR + elemen.file_path;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.closeSync(fs.openSync(element.file_path+"/"+element.file_name, 'w'));
    });
}