import { Client } from 'pg'

class PostgresSQL extends Client {
    constructor( connection , structure = { table:  null,  schema: 'public' } ){
        super(connection)
        const { connectionString, user, host, database, port, password } = connection
        this._connectionString = connectionString || this._build_connectionString(user,password, host, port, database )
        this._table = structure.table 
        this._schema = structure.schema  
        this._client = null
    }
    // SETTER/GETTERS

    // PUBLIC METHODS
    /**
     * Defines the table that the client will query 
     * input: table (String)
     * output: PostgresSQL
    */
    table(table){
        this._table = table
        return this
    }
    /** 
     * Defines the schema that the client will query
     * inputs: schema (String)
     * output: PostgresSQL
    */
    schema(schema){
        this._schema = schema
        return this
    }

    /**
     * Initiales a connection with postgresql and returns the created client
     * inputs: null
     * outputs: pg client 
     */

    insert(){
        
    }

    update(){

    }
    
    delete(){

    }

    async select(args = {}){
        const [ sql , params ] = this._build_select_statement(args)
        return this.query( sql , params)
    }

    // PRIVATE METHODS
    _build_select_statement({ selectionSet , where }){
        
    }
    _build_insert_statement(){
        const sql = `INSERT INTO ${this._table}`
    }
    _build_connectionString(...args){
        const [ user , password , host , port , database ] = args
        if(!user || !password || !host || !port || !database) throw new Error('invalid params input')

        return `postgresql://${user}:${password}@${host}:${port}/${database}`
    }
}

export default PostgresSQL
