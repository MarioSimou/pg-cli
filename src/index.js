import _all from './Syntax/Table/all'
import _insertInto from './Syntax/Table/insertInto'
import _returning from './Syntax/Table/returning'
import _values from './Syntax/Table/values'
import _select from './Syntax/Table/select'
import _from from './Syntax/Table/from'
import _update from './Syntax/Table/update'
import _set from './Syntax/Table/set'
import _deleteFrom from './Syntax/Table/deleteFrom';
import _where from './Syntax/Table/where'
import _limit from './Syntax/Table/limit'
import _offset from './Syntax/Table/offset'
import _orderBy from './Syntax/Table/orderBy'
import _groupBy from './Syntax/Table/groupBy'
import _having from './Syntax/Table/having'
import Column from './Column'

const Table = function({ table , schema, columns }){
    // Input check
    if(!table) throw new Error('please specify a table')
    if(!schema) throw new Error('please specify a schema')
    if(!columns) throw new Error('please specify columns')

    // Input type check
    if(typeof(table) !== 'string' || typeof(schema) !== 'string') 
        throw new Error('table and schema should be strings')
    if(!typeof(colums) instanceof Array) 
        throw new Error('columns should be table')

    // each instance has its own statement object
    this._statement = {
        select: null,
        from : null,
        where : null,
        update: null ,
        set: null,
        insertInto: null ,
        values: null,
        deleteFrom: null,
        having: null,
        groupBy: null,
        orderBy: null,
        all: null,
        limit: null,
        offset: null,
        returning: null,
    }

    this._params = []
    this._monitor = []
    this._table = table
    this._schema = schema
    this._columns = columns.reduce((o,column)=> ({ ...o , [column]: new Column({ colName : column , table : this._table, schema: this._schema })}) , {})
}

// Static method used to populate the prototype object of PostgreSQL class
Table.set = function(param){
    if(!param || !param.name || typeof param.name !== 'string' ) throw new Error('not valid type')
    if(!param || !param.constructor || typeof param.constructor !== 'function' ) throw new Error('no valid type')

    // populates the prototype so all methods to be set when the object is initialized
    this.prototype[param.name] = function(...args){
        // we extend the arguments variable to include the method name
        const [ statement , params ] = param.constructor.call(this ,  args , param.name )
        if( statement )
            this._statement[param.name] = statement
        if( params )
            this._params.push( ...params )

        // stack that records the methods names that are called
        this._monitor.push(param.name)

        // default return for any methods
        return this
    }
}
// GETTER -SETTERS
// end
const end = function(){
    const params = this._params
    const monitor = this._monitor
    const statement = new Map(Object.entries(this._statement))
    let n = 1
    const regex = /[$]/

    const f = []
    for( let m of monitor ){
        let q = statement.get(m)
        if(!regex.test(q)){
            f.push( q )
            continue
        } 

        const s = [] 
        q = q.replace(/[$]\d+/g , '$') // removes any nested parametrized queries

        for(let l of q.split('')){
            if(regex.test(l)) {
                s.push('$' + n )
                ++n
            } else {
                s.push(l)
            }

        } 

        f.push( s.join('') )
    }

    // resets the staement object
    this._statement = [] , this._params = [] , this._monitor = []

    return [ f.join(' ')  , params  ]
}

Object.defineProperty(Table.prototype, 'end' , { get: end })
Object.defineProperty(Table.prototype, 'columns' , { get: function(){ return this._columns }} )


// SQL syntax available for pg-cli
Table.set(_insertInto)
Table.set(_values)
Table.set(_returning)
Table.set(_all)
Table.set(_select)
Table.set(_from)
Table.set(_update)
Table.set(_set)
Table.set(_deleteFrom)
Table.set(_where)
Table.set(_offset)
Table.set(_limit)
Table.set(_orderBy)
Table.set(_groupBy)
Table.set(_having)

export default Table