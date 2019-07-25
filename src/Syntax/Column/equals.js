export default (function(){
    return {
        name: 'equals',
        constructor: function(arg){
            this._values.push(`${this._colName}=`)
            this._params.push(arg)
        }
    }
})()