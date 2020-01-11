import _all from './Table/all'
import _insertInto from './Table/insertInto'
import _returning from './Table/returning'
import _values from './Table/values'
import _select from './Table/select'
import _from from './Table/from'
import _update from './Table/update'
import _set from './Table/set'
import _deleteFrom from './Table/deleteFrom';
import _where from './Table/where'
import _limit from './Table/limit'
import _offset from './Table/offset'
import _orderBy from './Table/orderBy'
import _groupBy from './Table/groupBy'
import _having from './Table/having'
import Column from './Column'
import * as util from '../utils'

const hasValidColumnStructure = column => 
    column instanceof Object && column.from && column.to


const Table = function({ table , schema = 'public', columns }){
    if(!(this instanceof Table)){
        return new Table({table, schema, columns})
    }
    if(!table || typeof table !== 'string'){
        throw new Error('please specify a table as a string')
    }
    if(!columns.every(hasValidColumnStructure)){
        throw new Error('please provide a valid column structure')
    }

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
    this._columns = columns.reduce((o,column)=> {
        const col = new Column({ colName : column.to , table : this._table, schema: this._schema })
        o[column.to] = col
        o[column.from] = col 
        return o
    }, {})

    util.setGetterDefaultProperty.call(this,'name', 'table')
    util.setGetterDefaultProperty.call(this,'schema')
    util.setGetterDefaultProperty.call(this,'columns')
    util.setGetterProperty(end).call(this,'end')
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
function end(){
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