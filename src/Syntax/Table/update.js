import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.UPDATE,
        constructor: function(args){
            const [tableName] = args
            const statement =  tableName ? ` ${tableName.schema}."${tableName.table}"` : ` ${this._schema}."${this._table}"` 

            return [ 'UPDATE' + statement ]  
        }
    }
})()