import _all from './Syntax/Postgresql/all'
import _insertInto from './Syntax/Postgresql/insertInto'
import _returning from './Syntax/Postgresql/returning'
import _values from './Syntax/Postgresql/values'
import _select from './Syntax/Postgresql/select'
import _from from './Syntax/Postgresql/from'
import _update from './Syntax/Postgresql/update'
import _set from './Syntax/Postgresql/set'
import _deleteFrom from './Syntax/Postgresql/deleteFrom';
import _where from './Syntax/Postgresql/where'
import Column from './Column'

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

    this._statement = []
    this._params = []
    this._table = table
    this._schema = schema
    this._columns = columns.reduce((o,column)=> ({ ...o , [column]: new Column(column)}) , {})
}

// Static method used to populate the prototype object of PostgreSQL class
PostgreSQL.set = function(param){
    if(!param || !param.name || typeof param.name !== 'string' ) throw new Error('not valid type')
    if(!param || !param.constructor || typeof param.constructor !== 'function' ) throw new Error('no valid type')

    // populates the prototype so all methods to be set when the object is initialized
    this.prototype[param.name] = function(...args){
        // we extend the arguments variable to include the method name
        param.constructor.call(this ,  args , param.name )
        // default return for any methods
        return this
    }
}
// GETTER -SETTERS
// end
const end = function(){
    const statements = this._statement
    const params = this._params
    // resets the staement object
    this._statement = []
    this._params = []

    return [ statements.join(' ') , params ]
}

Object.defineProperty(PostgreSQL.prototype, 'end' , { get: end })
Object.defineProperty(PostgreSQL.prototype, 'columns' , { get: function(){ return this._columns }} )


// SQL syntax available for pg-cli
PostgreSQL.set(_insertInto)
PostgreSQL.set(_values)
PostgreSQL.set(_returning)
PostgreSQL.set(_all)
PostgreSQL.set(_select)
PostgreSQL.set(_from)
PostgreSQL.set(_update)
PostgreSQL.set(_set)
PostgreSQL.set(_deleteFrom)
PostgreSQL.set(_where)

export default PostgreSQL