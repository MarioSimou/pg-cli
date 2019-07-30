import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(_){
            return [ '*' ]
        }
    }
})()