import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.MATCH,
        constructor: function(...arg){
            return [ `~` , arg ]
        }
    }
})()