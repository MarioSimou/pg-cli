import { STATEMENTS } from '../../utils/constants'  
export default (function(){
    return {
        name: STATEMENTS.NULL,
        constructor: function(_){
            return [ 'NULL' ]
        }
    }
})()