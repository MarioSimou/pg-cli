import _all from './Syntax/PgSql/all'
import _insertInto from './Syntax/PgSql/insertInto'
import _returning from './Syntax/PgSql/returning'
import _values from './Syntax/PgSql/values'
import _select from './Syntax/PgSql/select'
import _from from './Syntax/PgSql/from'
import _update from './Syntax/PgSql/update'
import _set from './Syntax/PgSql/set'
import _deleteFrom from './Syntax/PgSql/deleteFrom';
import _where from './Syntax/PgSql/where'
import Column from './Column'

const PgSql = function({ table , schema, columns }){
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
    this._columns = columns.reduce((o,column)=> ({ ...o , [column]: new Column({ colName : column , table : this._table, schema: this._schema })}) , {})
}

// Static method used to populate the prototype object of PostgreSQL class
PgSql.set = function(param){
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

    return [ statements.map( v => v.trim()).join(' ').trim() , params ]
}

Object.defineProperty(PgSql.prototype, 'end' , { get: end })
Object.defineProperty(PgSql.prototype, 'columns' , { get: function(){ return this._columns }} )


// SQL syntax available for pg-cli
PgSql.set(_insertInto)
PgSql.set(_values)
PgSql.set(_returning)
PgSql.set(_all)
PgSql.set(_select)
PgSql.set(_from)
PgSql.set(_update)
PgSql.set(_set)
PgSql.set(_deleteFrom)
PgSql.set(_where)

export default PgSql