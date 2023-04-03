# chatGPT

chatGPT と対話します。

## usage

事前に *API key* を取得する必要があります。

```javascript
let ChatGPT
try {
    ChatGPT = require('ChatGPT')
} catch (e) {
    ChatGPT = require('./index')
}

const { resolve, bubbleUp } = require('pathname')
const { readFileSync, existsFileSync } = require('filesystem')

let json
bubbleUp(process.cwd(), (path) => {
    const spec = resolve(path, 'account.json')
    if (!existsFileSync(spec)) return false
    json = JSON.parse(readFileSync(spec, 'auto'))
    return 'open_ai' in json
})

const apikey = json.open_ai

const gpt = ChatGPT(apikey, { system: 'あなたは優秀な先生です。' })

console.log(() => gpt('2桁の掛け算を効率的に習得するには？'))
```