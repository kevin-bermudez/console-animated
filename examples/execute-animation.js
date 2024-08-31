const { executeAnimation, print } = require("../core/execute-animation");

const handsUp = [
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

const squat = [
    [
        '  o',
        ' /|\\',
        '/ | \\',
        ' / \\',
        '/   \\'
    ],
    [
        '',
        '',
        '  o', 
        '\'-|-\'',
        '/\\|/\\'
    ],
    [
        '  o',
        ' /|\\',
        '/ | \\',
        ' / \\',
        '/   \\'
    ]
]

const walkRight = {
    frames : [
        [
            '  o',
            ' /|\\',
            '/ | \\',
            ' / \\',
            '/_  \\_'
        ],
        // [
        //     '     o', 
        //     '   _/\\/',
        //     ' / /',
        //     ' _/\\',
        //     '|   |_' 
        // ],
        [
            '  o',
            ' /|\\/',
            '/ |_',
            ' /  \\_',
            '/_'
        ],
        [
            '    o',
            '   /|\\/',
            '  | |',
            ' \\_/ \\',
            '      \\_'
        ]
    ],
    transformers : [
        (line,context) => {
            return ' '.repeat(context.repeatsCounter) + line;
        }
    ]
}
  
/**
     o 
  _ /\/
 / /
 _/|
   |_ 
 o
  /|\/
 | | 
 _/ \
'    \_
 
 */

executeAnimation(walkRight,{
    duration: 1,
    repeats: 10,
    fps:100
})
// print(walkRight.frames[1])