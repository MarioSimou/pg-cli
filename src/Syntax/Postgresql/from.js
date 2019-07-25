import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.FROM,
        constructor: function(args){
            const [tableName] = args
            let statement = 'FROM'
            if( tableName && tableName.table && tableName.schema )
                statement += ` ${tableName.schema}."${tableName.table}"`
            else
                statement += ` ${this._schema}."${this._table}"`

            this._statement.push(statement)
        }
    }
})()