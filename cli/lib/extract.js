const fs = require('fs')

const raw = fs.readFileSync('./dump.json')
const lines = raw.toString().split('\n')

const emails = []
lines.filter(line => line !== '').forEach(line => {
    try {
        const res = JSON.parse(line)
        if (res.personal_info !== undefined && res.personal_info.email !== undefined) {
            if (!emails.includes(res.personal_info.email)) {
                emails.push(res.personal_info.email)
            }
        }
    } catch (err) {
        console.error(err)
        console.log(`"${line}"`)
    }
})

fs.writeFileSync('./emails.txt', emails.join('\n'))