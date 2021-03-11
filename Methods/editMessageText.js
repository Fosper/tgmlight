const path = require('path')
const tl = require('toolslight')
const Tgmlight = require('../index.js')

Tgmlight.prototype.editMessageText = function() {

    let result = ''

    let parameters = [
        'chat_id', // default ''
        'message_id', // default 0
        'inline_message_id', // default ''
        'text', // default ''
        'parse_mode', // default 'Markdown'
        'entities', // default [] !!!
        'disable_web_page_preview', // defauls false
        'reply_markup' // default []
    ]

    if (tl.isEmpty(this.requestOptions.messageType)) {
        this.setMessageType(path.basename(__filename).substr(0, path.basename(__filename).length - 3))
    }

    result = this.request(parameters)

    return result
}