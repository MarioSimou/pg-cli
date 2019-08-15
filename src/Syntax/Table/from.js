import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.FROM,
        constructor: function(args){
            const [tableName] = args
            const statement = tableName ? `${tableName.schema}."${tableName.table}"` : `${this._schema}."${this._table}"`
            return [ 'FROM ' + statement ]
        }
    }
})()