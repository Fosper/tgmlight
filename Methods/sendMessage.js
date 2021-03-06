const path = require('path')
const Tgmlight = require('../index.js')

/*
    [Example-1]:

    const tgmlight = require('tgmlight')
    let tgm = new tgmlight
    tgm
    .setBotToken('1234567890:AbCdEfGhIjKlMnOpQrStUvWxYz')
    .setChatId('9876543210')
    .setText('Hello world!')
    .setDisableNotification()
    .addKeyboardRow([
        {text: 'Button-1', callbackData: 'ButtonOne'},
        {text: 'Button-2', callbackData: 'ButtonTwo'},
    ])
    .addKeyboardRow([
        {text: 'Button-3', callbackData: 'ButtonThree'},
    ])
    .sendMessage()

    
    [Example-2]:

    const tgmlight = require('tgmlight')
    let tgm = new tgmlight
    tgm.setBotToken('1234567890:AbCdEfGhIjKlMnOpQrStUvWxYz')
    tgm.setMessageType('sendMessage')
    tgm.setChatId('9876543210')
    tgm.setText('Hello world!')
    tgm.setDisableNotification()
    tgm.addKeyboardRow([
        {text: 'Button-1'},
        {text: 'Button-2'},
    ])
    tgm.addKeyboardRow([
        {text: 'Button-3'},
    ])
    tgm.send()
*/

Tgmlight.prototype.sendMessage = function() {

    let result = ''

    let parameters = [
        'chat_id', // Default: none. Required: yes. Type: Integer or String.
        'text', // Default: none. Required: yes. Type: String.
        'parse_mode', // Default: 'Markdown'. Required: no. Type: String.
        'entities', // Default: none. Required: no. Type: Array of MessageEntity.
        'disable_web_page_preview', // Default: false. Required: no. Type: Boolean.
        'disable_notification', // Default: false. Required: no. Type: Boolean.
        'reply_to_message_id', // Default: none. Required: no. Type: Integer.
        'allow_sending_without_reply', // Default: false. Required: no. Type: Boolean.
        'reply_markup' // Default: none. Required: no. Type: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply.
    ]

    if (this.requestOptions.messageType === undefined) {
        this.setMessageType(path.basename(__filename).substr(0, path.basename(__filename).length - 3))
    }

    result = this.request(parameters)

    return result
}