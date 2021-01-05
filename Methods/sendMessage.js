const path = require('path')
const tl = require('toolslight')
const Tgmlight = require('../index.js')

Tgmlight.prototype.sendMessage = function() {

    let result = ''

    let parameters = [
        'chat_id', // default ''
        'text', // default ''
        'parse_mode', // default 'Markdown'
        'disable_web_page_preview', // defauls false
        'disable_notification', // default false
        'reply_to_message_id', // default ''
        'reply_markup' // default []
    ]

    if (tl.isEmpty(this.requestOptions.messageType)) {
        this.setMessageType(path.basename(__filename).substr(0, path.basename(__filename).length - 3))
    }

    result = this.request(parameters)

    return result
}
