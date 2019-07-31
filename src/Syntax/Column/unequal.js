import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.UNEQUAL,
        constructor: function(...arg){
            return [ '<>' , arg ]
        }
    }
})()