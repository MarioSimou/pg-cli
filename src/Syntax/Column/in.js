import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.IN,
        constructor: function(arg){
            console.log(arg)
        }
    }
})()