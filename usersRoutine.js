const shell = require('shelljs')
const readline = require('readline');
const fs = require('fs');

shell.cd('../gam')

shell.exec('gam print users suspended > suspended.csv');

async function readFileByLine(file) {
    const result = []
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        result.push(line)
    }

    return result
}


async function main() {
    let result = await readFileByLine('suspended.csv')
    let resultTrue = result.filter(item => item.includes('True'))
    let resultUser = resultTrue.map(item => item.split(',')[0])
    
    for (let i = 0; i < resultUser.length; i++) {
        shell.exec(`gam delete user ${resultUser[i]}`)
    }
    console.log(`Foi deletado: ${resultTrue.length} usuário(s)!`)
    console.log('Fim!!')
}

main()
