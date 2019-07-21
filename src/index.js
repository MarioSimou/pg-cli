import { Client } from 'pg'

class PostgresSQL extends Object {
    constructor({ connectionString, user, host, database, port, password }){
        super()
        this._connectionString = connectionString || this._build_connectionString(user,password, host, port, database )
        this._client = null
    }

    connect(){
        return new Promise((resolve, reject )=> {
            try{
                const client = new Client({ connectionString: this._connectionString })
                client.connect()
                this._client = client
                resolve(client)    
            } catch( e ){
                reject( e )
            }
        })
    }

    _build_connectionString(...args){
        const [ user , password , host , port , database ] = args
        if(!user || !password || !host || !port || !database) throw new Error('invalid params input')

        return `postgresql://${user}:${password}@${host}:${port}/${database}`
    }
}

export default PostgresSQL
