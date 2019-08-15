import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.UNEQUAL,
        constructor: function(...arg){
            return [ '<>' , arg ]
        }
    }
})()