import as from './Syntax/Column/as'

const Column = function(colName){
    const getColName = function(){ return this }
    const getEnd = function(){ return this._colName.join(' ') }
    this._colName = [ colName ]   
    this._initColName = colName
    
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
Column.set(as)

export default Column