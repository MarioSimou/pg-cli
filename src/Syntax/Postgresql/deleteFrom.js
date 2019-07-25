import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.DELETE_FROM,
        constructor: function(args){
            const [tableName] = args
            let statement = 'DELETE FROM'
            if( tableName && tableName.table && tableName.schema )
                statement += ` ${tableName.schema}."${tableName.table}"`
            else
                statement += ` ${this._schema}."${this._table}"`

            this._statement.push(statement)
        }
    }
})()