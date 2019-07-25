import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(args){
            const colNames = args.reduce(( s , column ) => [...s, column._values.pop() ], [])
            const statement = `SELECT ${colNames.join(',')}`
            this._statement.push(statement)
        }
    }
})()