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

executeAnimation(handsUp,{
    duration: 2,
    repeats: 2,
    fps: 16
})