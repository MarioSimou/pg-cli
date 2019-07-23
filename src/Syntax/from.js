export default (function(){
    return {
        name: 'from',
        constructor: function(...args){
            const [methodName ] = args
            const sql = `${this._schema}."${this._table}"`
            this._statement[methodName] = { statement : sql , params : []}
        }
    }
})()