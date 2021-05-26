const MongoClient = require('mongodb').MongoClient;

module.exports = class MongoDAL {
    constructor(mongoOptions) {
        this.dbUri = mongoOptions.dbUri;
        this.dbName = mongoOptions.dbName;
        this.dbCollection = mongoOptions.dbCollection;
    }

    async saveSettings(guildId, component, settings) {
        let client;

        try {
            client = await MongoClient.connect(this.dbUri, { useUnifiedTopology: true });
            await client.db(this.dbCollection).collection(this.dbCollection).deleteOne({ guildId: guildId });
            return await client.db(this.dbCollection).collection(this.dbCollection).insertOne({ guildId, component, settings });
        } catch (err) {
            console.error(err);
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async getSettings(guildIds) {
        let client;
        guildIds = Array.isArray(guildIds) ? guildIds : [guildIds];

        try {
            client = await MongoClient.connect(this.dbUri, { useUnifiedTopology: true });
            return await client.db(this.dbCollection).collection(this.dbCollection).find({ guildId: { $in: guildIds } }).toArray();
        } catch (err) {
            console.error(err);
        } finally {
            if (client) {
                client.close();
            }
        }
    }
}
