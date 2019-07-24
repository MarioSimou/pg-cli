export default (function(){
    return {
        name : 'as',
        constructor: function(...args){
            const [ newColName ] = args
            const colName = this._colName.pop()
            this._colName.push(`${colName} as ${newColName}`)
        }
    }
})()