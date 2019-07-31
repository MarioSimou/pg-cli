import { STATEMENTS , COMMANDS } from '../../constants'  

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
                switch(command.name){
                  case STATEMENTS.EQUAL:
                  case STATEMENTS.UNEQUAL:
                  case STATEMENTS.LT:
                  case STATEMENTS.LTE:
                  case STATEMENTS.GT:
                  case STATEMENTS.GTE:
                  case STATEMENTS.MATCH:
                  case STATEMENTS.MATCHI:
                  case STATEMENTS.AND:
                  case STATEMENTS.OR:
                      statements.push( command.value + '$' )
                      break;
                  default:
                      statements.push( command.value)
                } 
            }           

            return [ `WHERE ${statements.join(' ')}` , params ]
        }
    }
})()