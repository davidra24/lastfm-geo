import { openDatabase, enablePromise } from "react-native-sqlite-storage";
import { Geo } from "./geo";

export class Database {
    
    constructor(){
        enablePromise(true);
        this.instance().then(() => true).catch(() => false)
    }
    
    async instance() {
        try {
            this.database = await openDatabase({ name: 'lastfm.db'})
            this.geo = new Geo(this.database)
            return true
        } catch (error) {
           return false
        }
    }

    async insertGeo(array){
        await this.geo.bulkInsert(array)
    }

    async getGeo(){
        await this.geo.getData()
    }

}