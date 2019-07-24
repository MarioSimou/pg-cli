export default (function(){
    return {
        name: 'returning',
        constructor: function(args){
            this._statement.push('RETURNING')
        }
    }
})()