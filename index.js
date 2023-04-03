module.exports = function ChatGPT(apikey, options = {}) {
    const Server = require('MSXML2.ServerXMLHTTP')
    const url = 'https://api.openai.com/v1/chat/completions'
    const token = 'Bearer ' + apikey
    const model = 'gpt-3.5-turbo'

    return function chat(user, params = {}) {
        Server.open('POST', url, true)
        Server.setRequestHeader('Content-Type', 'application/json')
        Server.setRequestHeader('Authorization', token)

        const { system, assistant } = Object.assign({}, options, params)
        const messages = []
        if (system != null) messages.push({ role: 'system', content: system })
        if (assistant != null) messages.push({ role: 'assistant', content: assistant })
        messages.push({ role: 'user', content: user })

        Server.send(JSON.stringify({ model, messages }))

        const State = ['UNINITIALIZED', 'LOADING', 'LOADED', 'INTERACTIVE', 'COMPLETED']
        const spiner = ['|', '/', '-', '\\']
        let count = 0
        let state

        while ((state = State[Server.readyState]) != 'COMPLETED') {
            const progress = spiner[count % spiner.length]
            console.weaklog('%s %s %s', user, progress, state)
            WScript.Sleep(50)
            count++
        }
        return JSON.parse(Server.responseText).choices[0].message.content
    }
}