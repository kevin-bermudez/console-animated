const cursor = require('./ansi/ansi')(process.stdout)
cursor.hide();

const tales = [
[
    '  o',
    ' /|\\',
    '/ | \\',
    '  |',
    ' / \\'
],
[
'  o',
'\\/|\\/',
'  |',
'  |',
' / \\'
]
];

const delay = s => new Promise(resolve => setTimeout(resolve, 1000))

const print = (element) => {
    console.clear();
    element.forEach(line => {
        // process.stderr.write('')
        console.log(line)
        // process.stderr.write(line)
    });
    
    // process.stdout.write('\x1b')
    // manageConsole.prompt('');
}

let times = 10000;
let animate = 0;
let delta = 0;

const main = async () => {
    const date = new Date();
    const time = date.getTime();

    let currentTime = {
        mili : time,
        seconds : time / 1000
    }
    // console.clear();
    while(times > 0){
        const date = new Date();
        const time = date.getTime();
        const timeInSeconds = time / 1000;
        
        // console.log(timeInSeconds - currentTime.seconds);
        
        currentTime.mili = time;
        currentTime.seconds = timeInSeconds;
        
        print(tales[animate]);
        animate = animate === 0 ? 1 : 0;
        times--;
        await delay(1000/16);
    }
}

main()
.finally(result => console.log(result))


//   o
//  /|\
// / | \
//   |
//  / \