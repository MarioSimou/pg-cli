import _as from './Syntax/Column/as'
import _equal from './Syntax/Column/equal'
import _and from './Syntax/Column/and'
import _or from './Syntax/Column/or'

const Column = function(colName){
    const getColName = function(){ return this }
    const getEnd = function(){ return this._value.join(',') }
    this._colName = colName   
    this._values = []
    this._params = []
    this._operators = []
    
    // getters
    Object.defineProperties( this , {
        [colName] : { get : getColName },
        end : { get: getEnd }
    })
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
Column.set(_and)
Column.set(_or)

export default Column