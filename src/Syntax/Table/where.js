import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const [column] = columns
            const params = column._params
            const commands = column._commands
            const n = column._params.length
            const m = column._commands.length
            const nIterations = n > m ? n : m
            const statements = []
            // clears the stacks
            column._commands = [], column._params = []

            for( let i=0; i < nIterations; i++){
                const command = commands[i] || {}
                // if a value does not exist, skip the iteration
                if( !command.value ) continue

                // if the last character of value is =
                let s; 
                switch(command.name){
                case STATEMENTS.ALL:
                case STATEMENTS.ANY:
                case STATEMENTS.IN:
                case STATEMENTS.IS:
                case STATEMENTS.NOT:
                case STATEMENTS.NULL:
                  if(i == 0) s = column._fullColName + ' ' + command.value 
                  else s = command.value
                  break;
                case STATEMENTS.AND:
                case STATEMENTS.OR:
                  s = command.value + '$' 
                  break;
                case STATEMENTS.EQUAL:
                case STATEMENTS.UNEQUAL:
                case STATEMENTS.LT:
                case STATEMENTS.LTE:
                case STATEMENTS.GT:
                case STATEMENTS.GTE:
                case STATEMENTS.MATCH:
                case STATEMENTS.MATCHI:
                  s = column._fullColName + command.value + '$'
                  break;
                default:
                  s = column._fullColName + command.value
                  break;
                } 

                statements.push(s)
            }           

            return [ `WHERE ${statements.join(' ')}` , params ]
        }
    }
})()