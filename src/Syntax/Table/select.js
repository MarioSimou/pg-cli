import { STATEMENTS } from '../../utils/constants'  

const generateColumnName = hasAs => col => hasAs ? col.to : [col.to,"as",`"${col.from}"`].join(" ")

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(columns){
            const statements = []
            
            for(let column of columns){
                const getColumnName = generateColumnName(column._commands.has("as"))
                const n = column._monitor.length
                // column without any as or cast commands
                if( n === 0 ) {
                  statements.push(getColumnName({to: column._fullColName , from: column._col.from }))
                  continue
                }

                for(let methodName of column._monitor ){
                  const command = column._commands.get( methodName ).shift() 

                  switch(methodName){
                    case STATEMENTS.CAST:
                        statements.push(getColumnName({to: column._fullColName + command, from: column._col.from }) )
                        break
                    case STATEMENTS.AS:
                        // this will gets the previous command and append it to the existing command 
                        if( n > 1 ) {
                          const prev = statements.pop()
                          statements.push(getColumnName({to: prev + ' ' + command}))
                        } else {
                          statements.push(getColumnName({to: column._fullColName + ' ' + command}))
                        } 
                        break;
                    case STATEMENTS.SUM:
                    case STATEMENTS.MAX:
                    case STATEMENTS.MIN:
                    case STATEMENTS.AVG:
                    case STATEMENTS.COUNT:
                      statements.push(getColumnName({to: command + '(' + column._fullColName + ')', from : column._col.from}))
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