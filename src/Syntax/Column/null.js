import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.NULL,
        constructor: function(_){
            return [ 'NULL' ]
        }
    }
})()