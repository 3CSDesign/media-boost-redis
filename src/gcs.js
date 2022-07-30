// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage({keyFilename: 'secure/key.json'});
const bucket = storage.bucket('media-boost');

module.exports.toGcs = function uploadToGcs(objs,end) {
    let success = [];
    let count = 0;

    objs.forEach(element => {
        let obj = element;
        //console.log(element);
        const options = {
            destination: obj.file_path+"/"+obj.file_name,
            validation: 'md5',
            public: true
        };
        bucket.upload(obj.download_path,options, function(err, file, apiResponse) {
            //console.log(err);
            //console.log(apiResponse);
            //console.log(file);
            if (err!=null) {
                console.log("ok - "+obj.file_path);
                success.push(
                    element
                )
            }
            else{
                console.log("not ok - "+obj.file_path);
                onsole.log(err);
            }
            count++;

            if (count == objs.length) {
                end(success);
            }
       });
    });    
}

