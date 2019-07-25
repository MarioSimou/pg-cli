export default (function(){
    return {
        name : 'as',
        constructor: function(...args){
            const [ newColName ] = args
            this._values.push(`${this._colName} as ${newColName}`)
        }
    }
})()