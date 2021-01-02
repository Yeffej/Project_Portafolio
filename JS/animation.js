const $TitleHero = document.getElementsByClassName("hero-title")[0]
const $spansTH = $TitleHero.querySelectorAll("span") 
let isItReverse = false

const keyFramesWritter = [
    {
        width: "0"
    },
    {
        width: "100%"
    }
]

let propertiesWritter = {
    duration: 4000,
    delay: 500,
    easing: "steps(27)",
    fill: "forwards",
}

// In case that a eraser animation was it necessary though it can be do it by .reverse() 
// const keyFramesEraser = [
//     {
//         width: "100%"
//     },
//     {
//         width: "0"
//     }
// ]
// let propertiesEraser = {
//     duration: 4000,
//     delay: 500,
//     easing: "steps(27)",
//     fill: "forwards",
// }


// if the properties had been the same the code below was it enough.
// for (span of $spansTH) {
//     span.animate(keyFramesWritter, propertiesWritter)
// }

const writter_line1 =  $spansTH[0].animate(keyFramesWritter, propertiesWritter)

propertiesWritter["easing"] = "steps(29)"
const writter_line2 = $spansTH[1].animate(keyFramesWritter, propertiesWritter)
writter_line2.pause()

propertiesWritter["easing"] = "steps(34)"
const writter_line3 = $spansTH[2].animate(keyFramesWritter, propertiesWritter)
writter_line3.pause()

function ToPauseAndReverse(writter, aniTimeStop) {
    let isItPause = false
    const theInterval = setInterval(()=> {
        if(writter.currentTime - 500 >= aniTimeStop && isItPause === false){
            writter.pause()
            writter.reverse()
            isItReverse = true
            setTimeout(() =>{
                writter.finish()
            }, aniTimeStop);
            isItPause = true
            clearInterval(theInterval)
        } 
    }, 50)
}

const ActionLine = writter => {
    if(isItReverse) {
        writter.reverse()
        isItReverse = false   
    }else {
        switch(writter){
            case writter_line1:
                writter_line2.play()
                ToPauseAndReverse(writter_line2, 2050)
                writter_line2.addEventListener("finish", ()=> ActionLine(writter_line2))
                writter_line1.removeEventListener("finish", () => ActionLine(writter_line1))
                break;
            case writter_line2:
                writter_line3.play()
                writter_line2.removeEventListener("finish", ()=> ActionLine(writter_line2))
                break;
            default:
                return;
        }
    }   
}

writter_line1.addEventListener("finish", () => ActionLine(writter_line1))
// writter_line1.addEventListener("finish", () => {
//     console.log(event)
//     ActionLine(writter_line1)
// })



