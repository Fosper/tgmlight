const tl = require('toolslight')
const Tgmlight = require('../index.js')

Tgmlight.prototype.sendMessage = function() {

    let result = ''

    let parameters = [
        'chat_id',
        'text',
        'parse_mode',
        'disable_web_page_preview',
        'disable_notification',
        'reply_to_message_id',
        'reply_markup'
    ]

    if (tl.isEmpty(this.getMethod())) {
        this.setMessageType(path.basename(__filename).substr(0, path.basename(__filename).length - 3))
    }

    result = this.request(parameters)

    return result
}
