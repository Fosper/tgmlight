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

    addKeyboardRow = (value) => {
        let keyboardType = 'inline_keyboard'
        if (typeof value[0] === 'string') {
            keyboardType = 'keyboard'
        } else {
            console.log(value[0])
            console.log(value[0].text)
            console.log(value[0].requestContact)
            if (value[0].requestContact !== undefined || value[0].requestLocation !== undefined || value[0].requestPoll !== undefined) {
                keyboardType = 'keyboard'
            }
        }

        let keyboardRow = []
        for (const button of value) {
            let key = {}
            if (typeof button === 'string') {
                key.text = button
            } else {
                for (const buttonField of Object.keys(button)) {
                    switch (buttonField) {
                        case 'text':
                            key.text = button[buttonField]
                            break;
                        case 'requestContact':
                            key.request_contact = button[buttonField]
                            break
                        case 'requestLocation':
                            key.request_location = button[buttonField]
                            break
                        case 'requestPoll':
                            key.request_poll = button[buttonField]
                            break
                        case 'url':
                            key.url = button[buttonField]
                            break
                        case 'loginUrl':
                            key.login_url = button[buttonField]
                            break
                        case 'callbackData':
                            key.callback_data = button[buttonField]
                            break
                        case 'switchInlineQuery':
                            key.switch_inline_query = button[buttonField]
                            break
                        case 'switchInlineQueryCurrentChat':
                            key.switch_inline_query_current_chat = button[buttonField]
                            break
                        case 'callbackGame':
                            key.callback_game = button[buttonField]
                            break
                        case 'pay':
                            key.pay = button[buttonField]
                            break
                        default:
                            key[buttonField] = button[buttonField]
                            break
                    }
                }
            }
            keyboardRow.push(key)
        }

        let replyMarkup = this.getReplyMarkup()
        if (tl.isEmpty(replyMarkup[keyboardType])) {
            replyMarkup[keyboardType] = []
        }
        replyMarkup[keyboardType].push(keyboardRow)

        this.setReplyMarkup(replyMarkup)

        return this

        // url
        // login_url
        // callback_data
        // switch_inline_query
        // switch_inline_query_current_chat
        // callback_game
        // pay
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

    getReplyToMessageId = () => {
        return this.requestOptions.reply_to_message_id
    }

    setResizeKeyboard = (value = true) => {
        if (tl.isEmpty(this.requestOptions.reply_markup)) {
            this.requestOptions.reply_markup = {}
        }
        this.requestOptions.reply_markup.resize_keyboard = value
        return this
    }

    getResizeKeyboard = () => {
        return this.requestOptions.reply_markup.resize_keyboard
    }

    setOneTimeKeyboard = (value = true) => {
        if (tl.isEmpty(this.requestOptions.reply_markup)) {
            this.requestOptions.reply_markup = {}
        }
        this.requestOptions.reply_markup.one_time_keyboard = value
        return this
    }

    getOneTimeKeyboard = () => {
        return this.requestOptions.reply_markup.one_time_keyboard
    }

    setSelective = (value = true) => {
        if (tl.isEmpty(this.requestOptions.reply_markup)) {
            this.requestOptions.reply_markup = {}
        }
        this.requestOptions.reply_markup.selective = value
        return this
    }

    getSelective = () => {
        return this.requestOptions.reply_markup.selective
    }

    setReplyMarkup = (value) => {
        this.requestOptions.reply_markup = value
        return this
    }

    getReplyMarkup = () => {
        if (tl.isEmpty(this.requestOptions.reply_markup)) {
            this.requestOptions.reply_markup = {}
        }
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

                switch (func) {
                    case 'getReplyMarkup':
                        body[parameter] = JSON.stringify(this[func]())
                        break
                    default:
                        body[parameter] = this[func]()
                        break
                }
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