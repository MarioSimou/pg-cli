export default (function(){
    return {
        name: 'deleteFrom',
        constructor: function(...args){
            const [ methodName ] = args
            const statement = `DELETE FROM ${this._schema}."${this._table}"`
            this._statement[methodName] = { statement : statement , params: [] }
        }
    }
})()