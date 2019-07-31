import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(columns){
            const statements = []
            
            for(let column of columns){
                if(column._commands.length){
                  let command;
                  if( column._commands.length){
                     // we force to has the name of the first command
                    command = { name: column._commands[0].name , value : column._commands.map(command => command.value ).join(' ') }
                    column._commands = []
                  }else{
                    command = column._commands.pop()
                  }
                  
                  // check for cast operator
                  switch(command.name){
                    case STATEMENTS.AS:
                        statements.push( column._fullColName + ' ' + command.value )
                        break;
                    case STATEMENTS.CAST:
                        statements.push( column._fullColName + command.value )
                        break;
                    default:
                        statements.push(command.value)
                        break;
                  }

                } else {
                  statements.push(column._fullColName)
                }
            }

            return [ `SELECT ${statements.join(',') || '*' }` ]
        }
    }
})()