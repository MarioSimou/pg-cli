import _as from './Syntax/Column/as'
import _equal from './Syntax/Column/equal'
import _unequal from './Syntax/Column/unequal'
import _gt from './Syntax/Column/gt'
import _gte from './Syntax/Column/gte'
import _lt from './Syntax/Column/lt'
import _lte from './Syntax/Column/lte'
import _and from './Syntax/Column/and'
import _or from './Syntax/Column/or'
import _in from './Syntax/Column/in'
import _any from './Syntax/Column/any'
import _all from './Syntax/Column/all'
import _match from './Syntax/Column/match'
import _matchi from './Syntax/Column/matchi'
import _is from './Syntax/Column/is'
import _not from './Syntax/Column/not'
import _null from './Syntax/Column/null'
import _asc from './Syntax/Column/asc'
import _desc from './Syntax/Column/desc'
import _sum from './Syntax/Column/sum'
import _max from './Syntax/Column/max'
import _min from './Syntax/Column/min'
import _avg from './Syntax/Column/avg'
import _count from './Syntax/Column/count'
import _cast from './Syntax/Column/cast'

const Column = function({ colName , table, schema}){
    this._colName = colName
    this._fullColName = `${schema}."${table}"."${colName}"`   
    this._values = []
    this._params = []

    // getters
    const getColName = function(){ return this }
    Object.defineProperty( this,  colName , { get : getColName })
}

// class method that populates the prototype with methods
Column.set = function(arg){
    this.prototype[arg.name] = function(...args){
        const [ value , params  ] = arg.constructor.call( this , ...args)
        
        if( value ) this._values.push(value)
        if( params ) this._params.push(...params)
        
        return this
    }
}

// Prototype methods for Column Class
Column.set(_as)
Column.set(_equal)
Column.set(_unequal)
Column.set(_gt)
Column.set(_gte)
Column.set(_lt)
Column.set(_lte)
Column.set(_and)
Column.set(_or)
Column.set(_in)
Column.set(_any)
Column.set(_all)
Column.set(_match)
Column.set(_matchi)
Column.set(_is)
Column.set(_not)
Column.set(_null)
Column.set(_desc)
Column.set(_asc)
Column.set(_sum)
Column.set(_min)
Column.set(_max)
Column.set(_count)
Column.set(_avg)
Column.set(_cast)

export default Column