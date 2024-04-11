const logo = document.getElementById('logo')
const prepSpan = document.getElementById('prep-span')
const nav = document.getElementById('nav');
const navWidth = nav.offsetWidth;
const title = document.getElementById('title');
const main=document.getElementById('main')
gsap.to(prepSpan,{
    duration:1,
    opacity:1,
    color:"#28a745",
    delay:1
})

gsap.to(logo,{
    delay:2,
    x:navWidth/2,
    duration:2,
    ease:'power1.inOut',
    rotation:360,
    fill:'white'
})

gsap.to(title,{
    delay:2,
    duration:0.5,
    opacity:0
})

gsap.to(main,{
    delay:2,
    duration:2,
    color:'red',
    backgroundColor:'rgb(209 250 229)'
})
// gsap.to(logo,{backgroundColor:'red',duration:3}) 