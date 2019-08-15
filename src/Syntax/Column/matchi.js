import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.MATCHI,
        constructor: function(...arg){
            return [ '~*' , arg ]
        }
    }
})()