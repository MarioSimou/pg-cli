import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.INSERT_INTO,
        constructor: function(args){
            const [tableName] = args
            const statement =  tableName ? ` ${tableName.schema}."${tableName.table}"` : ` ${this._schema}."${this._table}"` 

            return [ 'INSERT INTO' + statement  ]
        }
    }
})()
