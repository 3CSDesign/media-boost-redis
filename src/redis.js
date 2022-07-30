const { createClient } = require("@redis/client");

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

module.exports.getKeys = async function (end) {
    await client.connect();
    await client.set('3cs-mb-key', 'sss');

    const keys = await client.sendCommand(["keys","3cs-mb-*"]);    
    client.quit();
    end(keys);
}