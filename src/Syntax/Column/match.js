import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.MATCH,
        constructor: function(...arg){
            return [ `~` , arg ]
        }
    }
})()