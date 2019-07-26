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
import _notIn from './Syntax/Column/notIn'
import _any from './Syntax/Column/any'
import _all from './Syntax/Column/all'

const Column = function({ colName , table, schema}){
    this._colName = `${schema}."${table}"."${colName}"`   
    this._values = []
    this._params = []
    this._operators = []

    const getColName = function(){ return this }
    const getFullColName = function(){ return }
    // getters
    Object.defineProperty( this,  colName , { get : getColName })
}

// class method that populates the prototype with methods
Column.set = function(arg){
    this.prototype[arg.name] = function(...args){
        arg.constructor.call( this , ...args)
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
Column.set(_notIn)
Column.set(_any)
Column.set(_all)

export default Column