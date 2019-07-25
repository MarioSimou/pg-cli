import _as from './Syntax/Column/as'
import _equals from './Syntax/Column/equals'

console.log(_equals)

const Column = function(colName){
    const getColName = function(){ return this }
    const getEnd = function(){ return this._value.join(',') }
    this._colName = colName   
    this._values = []
    this._params = []
    
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
Column.set(_equals)

export default Column