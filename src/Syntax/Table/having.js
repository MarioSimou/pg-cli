import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name : STATEMENTS.HAVING,
        constructor: function(columns){
            const [column]=columns
            const params = column._params
            const commands = column._commands
            const statement = []
            column._commands = [], column._params = []

            for(let command of commands){
                switch(command.name){
                    case STATEMENTS.AND:
                    case STATEMENTS.OR:
                        const prev = statement.pop()
                        statement.push( ' ' + command.value.replace( new RegExp( column._fullColName ) , prev )  + '$' )
                        break;
                    case STATEMENTS.EQUAL:
                    case STATEMENTS.UNEQUAL:
                    case STATEMENTS.LT:
                    case STATEMENTS.LTE:
                    case STATEMENTS.GT:
                    case STATEMENTS.GTE:
                    case STATEMENTS.MATCH:
                    case STATEMENTS.MATCHI:
                        statement.push( command.value + '$' )
                        break;
                    case STATEMENTS.IN:
                    case STATEMENTS.ALL:
                    case STATEMENTS.ANY:
                        statement.push( ' ' + command.value )
                        break;
                    default:
                        statement.push( command.value)
                        break;
                  } 
            }

            return [ `HAVING ${statement.join('')}` , params ]
        }
    }
})()