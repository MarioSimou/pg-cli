export default (function(){
    return {
        name: 'insertInto',
        constructor: function(...args){
            const [ methodName , input ] = args
            const { table , schema } = input || { table : this._table , schema: this._schema } 
            const relation = `${schema}."${table}"`
            this._statement[methodName] = { statement : `INSERT INTO ${relation}` , params : [] }
        }
    }
})()
