const tl = require('toolslight')

class Tgmlight {
    constructor() {
        this.apiUrl = 'api.telegram.org'
        this.contentType = 'application/json'
        this.botToken = ''
        this.requestOptions = {}
    }
    
    /*
        Lib tools.
    */

    setApiUrl = (value) => {
        this.apiUrl = value
        return this
    }
    
    getApiUrl = () => {
        return this.apiUrl
    }

    setContentType = (value) => {
        this.contentType = value
        return this
    }
    
    getContentType = () => {
        return this.contentType
    }

    setBotToken = (value) => {
        this.botToken = value
        return this
    }
    
    getBotToken = () => {
        return this.botToken
    }

    setMessageType = (value) => {
        this.requestOptions.messageType = value
        return this
    }
    
    getMessageType = () => {
        return this.requestOptions.messageType
    }

    /*
        For set telegram methods fields.
    */

    setChatId = (value) => {
        this.requestOptions.chat_id = value
        return this
    }
    
    getChatId = () => {
        return this.requestOptions.chat_id
    }

    setText = (value) => {
        this.requestOptions.text = value
        return this
    }
    
    getText = () => {
        return this.requestOptions.text
    }

    setParseMode = (value) => {
        this.requestOptions.parse_mode = value
        return this
    }
    
    getParseMode = () => {
        return this.requestOptions.parse_mode
    }

    setDisableWebPagePreview = (value = true) => {
        this.requestOptions.disable_web_page_preview = value
        return this
    }

    getDisableWebPagePreview = () => {
        return this.requestOptions.disable_web_page_preview
    }

    setDisableNotification = (value = true) => {
        this.requestOptions.disable_notification = value
        return this
    }

    getDisableNotification = () => {
        return this.requestOptions.disable_notification
    }

    setReplyToMessageId = (value) => {
        this.requestOptions.reply_to_message_id = value
        return this
    }

    getReplyToMessageId = (value) => {
        return this.requestOptions.reply_to_message_id
    }

    setReplyMarkup = (value) => {
        this.requestOptions.reply_markup = value
        return this
    }

    getReplyMarkup = (value) => {
        return this.requestOptions.reply_markup
    }

    /*
        For send request to telegram.
    */

    send = () => {
        return this[this.requestOptions.messageType]()
    }

    /*
        Private functions (not for use).
    */

    request = async (parameters) => {

        let result = ''
        
        let body = {}

        for (const parameter of parameters) {
            let func = parameter.replace(/([-_][a-z])/ig, ($1) => {
                return $1.toUpperCase()
                  .replace('-', '')
                  .replace('_', '')
            })
            func = 'get' + func.charAt(0).toUpperCase() + func.slice(1)
            if (!tl.isEmpty(this[func])) {
                body[parameter] = this[func]()
            }
        }

        let requestOptions = {
            method: 'POST', // Can be 'GET', 'POST', 'PUT', 'DELETE', 'CONNECT'.
            protocol: 'https', // Can be 'http', 'https', 'ws', 'wss'.
            host: 'api.telegram.org',
            port: 443,
            path: '/bot' + this.botToken + '/sendMessage',
            headers: {'Content-Type': this.contentType},
            body: JSON.stringify(body),
        }
      
        let err, data
        [err, data] = await tl.request(requestOptions)
        if (err) {
            result = err
        } else {
            result = data
        }

        return result
    }
}

module.exports = Tgmlight

require('./Methods/sendMessage.js');