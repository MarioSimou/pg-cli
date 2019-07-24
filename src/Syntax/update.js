export default (function(){
    return {
        name : 'update',
        constructor: function(...args){
            const [ methodName ] = args
            const sql = `UPDATE ${this._schema}."${this._table}"`
            this._statement[methodName] = { statement : sql  , params : [] }
        }
    }
})()