import { enablePromise } from "react-native-sqlite-storage";

export class Geo {

    TABLE_NAME = 'GEO'
    COL_URL = 'url'
    COL_NAME = 'name'
    COL_DURATION = 'duration'
    COL_IMAGE = 'image'
    COL_ARTIST = 'artist'

    CREATE_QUERY = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
        ${this.COL_URL} TEXT PRIMARY KEY, ${this.COL_NAME} TEXT, 
        ${this.COL_DURATION} TEXT, ${this.COL_IMAGE} TEXT, ${this.COL_ARTIST} TEXT)`

    constructor(db) {
        enablePromise(true)
        this.database = db
        this.createTable()
    }
    async createTable() {
        await this.database.transaction(async tr => {
            await this.database.executeSql(this.CREATE_QUERY)
        })
    }

    async bulkInsert(arrayInsert) {
        await this.database.transaction((transaction) => {
            arrayInsert.forEach(async element => {
                const insertedItem = { ...element, image: JSON.stringify(element.image), artist: JSON.stringify(element.artist) }
                await this.database.executeSql(
                    `INSERT INTO ${this.TABLE_NAME} (${this.COL_URL}, ${this.COL_NAME},
                    ${this.COL_DURATION},${this.COL_IMAGE}, ${this.COL_ARTIST}) 
                    VALUES (?,?,?,?,?)`,
                    [insertedItem.url, insertedItem.name, insertedItem.duration, insertedItem.image, insertedItem.artist]
                )
            });
            //console.log('transaction', transaction)
        })
    }

    async getData(){
        //enablePromise(true)
        let data = []
        await this.database.readTransaction(async (tx) => {
            await this.database.executeSql(`SELECT * FROM ${this.TABLE_NAME}`, [], function(tx, results) {
                data = results.rows;
            })
        })
        return data
    }

}