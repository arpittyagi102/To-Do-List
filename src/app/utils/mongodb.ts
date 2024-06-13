import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
const dbName = process.env.DB_NAME ?? "";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function getDatabase(collectionName: string) {
    try {
        await client.connect();
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);
        
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

