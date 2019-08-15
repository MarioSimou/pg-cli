import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(columns){
            const statements = []
            
            for(let column of columns){
                const n = column._monitor.length
                // column without any as or cast commands
                if( n === 0 ) {
                  statements.push(column._fullColName)
                  continue
                }

                for(let methodName of column._monitor ){
                  const command = column._commands.get( methodName ).shift() 

                  switch(methodName){
                    case STATEMENTS.CAST:
                        statements.push( column._fullColName + command )
                        break
                    case STATEMENTS.AS:
                        // this will gets the previous command and append it to the existing command 
                        if( n > 1 ) {
                          const prev = statements.pop()
                          statements.push( prev + ' ' + command )
                        } else {
                          statements.push( column._fullColName + ' ' + command )
                        } 
                        break;
                    case STATEMENTS.SUM:
                    case STATEMENTS.MAX:
                    case STATEMENTS.MIN:
                    case STATEMENTS.AVG:
                    case STATEMENTS.COUNT:
                      statements.push( command + '(' + column._fullColName + ')')
                      break;
                    default:
                        statements.push(command)
                  }
                }

            }

            // clears each column - we assume that there is a change for a column to appear more than once
            columns.forEach( column => column._flush() )


            return [ `SELECT ${statements.join(',') || '*' }` ]
        }
    }
})()