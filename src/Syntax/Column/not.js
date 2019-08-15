import { STATEMENTS } from '../../utils/constants'  
export default (function(){
    return {
        name: STATEMENTS.NOT,
        constructor: function(_){
          return [ 'NOT' ]
        }
    }
})()