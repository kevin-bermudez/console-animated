const cursor = require('../ansi/ansi')(process.stdout)

const print = (element) => {
    console.clear();
    element.forEach(line => {
        console.log(line);
    });
}

const adjustAnimationToFps = (animation,{
    durationInSeconds,
    fps
}) => {
    const totalFramesForAnimation = durationInSeconds * fps;
    const currentFramesAnimation = parseInt(animation.length);

    let animationFrames = [...animation];
    if(currentFramesAnimation < totalFramesForAnimation){
        const framesOfFrame = Math.floor( totalFramesForAnimation / currentFramesAnimation );
        animationFrames = [];

        animation.forEach((step,index) => {
            for(let index = 1;index <= framesOfFrame;index++){
                animationFrames.push(step);
            }

            if(index === animation.length && animationFrames.length < totalFramesForAnimation){
                animationFrames.push(step);
            }
        })
    }
    console.log(animationFrames.length)
    return animationFrames;
}

const executeAnimation = (animation,{
    duration,
    repeats,
    fps
}) => {
    cursor.hide();
    const initialDate = new Date();
    let initialTime = initialDate.getTime();
    let currentFrame = 1;
    const durationFrame = 1000 / fps;

    let secondsCounter = 0;
    let repeatsCounter = 1;

    const adjustedAnimation = adjustAnimationToFps(animation,{
        durationInSeconds: duration,
        fps
    })

    while(repeatsCounter <= repeats){
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const delta = currentTime - initialTime;
        // console.log('delta is',delta)
        if(delta <= durationFrame * currentFrame){
            continue;
        }
        
        // console.log('control',control);
        // framesLog[currentFrame].fin = currentTime;
        currentFrame++;
        // framesLog.push(durationFrame * currentFrame)
        // framesLog[currentFrame] = {init:currentTime};
        // console.log('new frame',currentFrame)
        if((currentFrame % fps) === 0){
            secondsCounter++;
            // continue;
        }
    
        // console.log('frame animation',(currentFrame * control) - 1)
        // console.log('frame:',currentFrame);
        // console.log((currentFrame * control) - 1);
        // console.log('new',currentFrame)

        print(adjustedAnimation[currentFrame - 1]);
        // console.log('seconds',secondsCounter);
        if(secondsCounter >=duration || !adjustedAnimation[currentFrame]){
            const initialDate = new Date();
            initialTime = initialDate.getTime();
            currentFrame = 1;
            secondsCounter = 0;
            repeatsCounter++;
        }
    }
}

module.exports.executeAnimation = executeAnimation;