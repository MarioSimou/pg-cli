import { STATEMENTS } from '../../utils/constants'  
export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(_){
            return [ '*' ]
        }
    }
})()