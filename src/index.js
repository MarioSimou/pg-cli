import all from './Syntax/all'
import insertInto from './Syntax/insertInto'
import returning from './Syntax/returning'
import values from './Syntax/values'

const PostgreSQL = function({ table , schema }){
    this._table = table
    this._schema = schema
    this._statement = {}
}

// Static method used to populate the prototype object of PostgreSQL class
PostgreSQL.set = function(arg){
    if(!arg || !arg.name || typeof arg.name !== 'string' ) throw new Error('not valid type')
    if(!arg || !arg.constructor || typeof arg.constructor !== 'function' ) throw new Error('no valid type')

    // populates the prototype so all methods to be set when the object is initialized
    this.prototype[arg.name] = function(){
        // we extend the arguments variable to include the method name
        arg.constructor.apply(this , [ arg.name , ...arguments ])
        // default return for any methods
        return this
    }
}

// GETTER - end
const end = function(){
    const values = new Map(Object.entries(this._statement)).values(), 
          sql = [], 
          params = []

    for(let value of values){
        sql.push(value.statement)
        params.concat(value.params)
    }

    // resets the staement object
    this._statement = {}

    return [ sql.join(' ') , params ]
}
Object.defineProperty(PostgreSQL.prototype, 'end' , { get: end })


// SQL syntax available for pg-cli
PostgreSQL.set(insertInto)
PostgreSQL.set(values)
PostgreSQL.set(returning)
PostgreSQL.set(all)


export default PostgreSQL