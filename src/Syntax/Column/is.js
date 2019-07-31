import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.IS,
        constructor: function(_){
            return [ 'IS' ]
        }
    }
})()