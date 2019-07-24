import all from './Syntax/all'
import insertInto from './Syntax/insertInto'
import returning from './Syntax/returning'
import values from './Syntax/values'
import as from './Syntax/as'
import select from './Syntax/select'
import _from from './Syntax/from'
import update from './Syntax/update'
import set from './Syntax/set'
import deleteFrom from './Syntax/deleteFrom';
import where from './Syntax/where'

const PostgreSQL = function({ table , schema, columns }){
    // Input check
    if(!table) throw new Error('please specify a table')
    if(!schema) throw new Error('please specify a schema')
    if(!columns) throw new Error('please specify columns')

    // Input type check
    if(typeof(table) !== 'string' || typeof(schema) !== 'string') 
        throw new Error('table and schema should be strings')
    if(!typeof(colums) instanceof Array) 
        throw new Error('columns should be table')

    this._statement = {}
    this._selectionSet = []
    this._table = table
    this._schema = schema
    this._columns = columns.reduce((o,column)=> {
        o[column]=column
        const get = ()=>{  this._selectionSet.push(column); return this }
        Object.defineProperty(o, column , { get: get })
        return o
    } , {})
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
// GETTER -SETTERS
// end
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
Object.defineProperty(PostgreSQL.prototype, 'columns' , { get: function(){ return this._columns }} )


// SQL syntax available for pg-cli
PostgreSQL.set(insertInto)
PostgreSQL.set(values)
PostgreSQL.set(returning)
PostgreSQL.set(all)
PostgreSQL.set(as)
PostgreSQL.set(select)
PostgreSQL.set(_from)
PostgreSQL.set(update)
PostgreSQL.set(set)
PostgreSQL.set(deleteFrom)
PostgreSQL.set(where)

export default PostgreSQL