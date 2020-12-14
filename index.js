const tl = require('toolslight')

class Tgmlight {
    constructor(customOptions = {}) {
        let defaultOptions = {

        }
    }

    setMessageType = (value) => {
        this.method = value
        return this
    }
    
    getMessageType = () => {
        return this.method
    }

    
}