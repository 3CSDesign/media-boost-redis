const { createClient } = require("@redis/client");

const client = createClient({
    socket: {
        host: "127.0.0.1",
        port: "6379",
        family: "4"
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

module.exports.getKeys = async function (end) {
    await client.connect();
    await client.set('3cs-mb-key', 'sss');

    const keys = await client.sendCommand(["keys","3cs-mb-*"]);    
    client.quit();
    let list = [];
    let count = 0;
    keys.forEach(element => {
        list.push(
            {
                "key": element
            }
        )
    });
    end(keys);
}

module.exports.setKey = async function (touched_files) {
    await client.connect();
    await client.sendCommand(["FLUSHDB"]);    
    client.quit();
}