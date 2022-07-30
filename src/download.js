//159.65.154.150

var http = require("http");
const fs = require('fs');
const path = require('path');

module.exports.file_proc = function (files,end){
    let success = [];
    let count = 0;
    files.forEach(dict => {
        try {
            if (dict.value == "MOVED") {
                count++;
                if (count == files.length) {
                    end(success);
                }
            }
            else{
            let file_path = dict.key;
            let real_path = file_path.replace("3cs-mb-key-","http://");
            let url = new URL(real_path);
            let options = {
            host: "10.122.0.3",
            port: 80,
            path: `http://${url.hostname}${url.pathname}${url.search}`,
            headers: {
              Host: url.hostname
            }
          };
          let dir = `./media/${getDirectory(url)}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            let file = fs.createWriteStream(`./media/${getDirectory(url)}/${getFilename(url)}`);
            let request = http.get(options, function(response) {
            response.pipe(file);

            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                count++;
                console.log(`Download Completed ${count} of ${files.length} `);
                success.push(
                    {
                        "key": dict.key,
                        "real_path": real_path,
                        "file_path": getDirectory(url),
                        "file_name": getFilename(url),
                        "download_path": `./media/${getDirectory(url)}/${getFilename(url)}`,
                    }
                )
                if (count == files.length) {
                    end(success);
                }
            });
            });
        }

        } catch (error) {
            count++;
            //skip error
        }
        
    });
    
}

/**
 * 
 * @param {String} url 
 */
function getFilename(url) {
    const pathname = url.pathname;
    const index = pathname.lastIndexOf('/');
    return pathname.substring(index + 1) // if index === -1 then index+1 will be 0
}

function getDirectory(url) {
    return path.dirname(`${url.hostname}${url.pathname}${url.search}`);
}


// http.get(options, function(res) {
//     console.log(res);
//     res.pipe(process.stdout);
//   });

