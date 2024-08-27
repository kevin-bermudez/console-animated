const { executeAnimation } = require("../core/execute-animation");

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
/**
 
  o 
'-|-'
/\|/\
 
 */

executeAnimation(squat,{
    duration: 2,
    repeats: 10,
    fps: 16
})