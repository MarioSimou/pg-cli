export default (function(){
    return {
        name: 'select',
        constructor: function(...args){
            const [ methodName, input ] = args
            const sql = `SELECT ${input._selectionSet.join(',')}`
            this._statement[methodName] = { statement : sql  , params : [] }
        }
    }
})()