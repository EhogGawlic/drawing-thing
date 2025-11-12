/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas")
canvas.width = 1920
canvas.height = 1080
const ctx = canvas.getContext("2d")
// ensure sscroll exists (might be declared elsewhere)
if (typeof sscroll === "undefined") globalThis.sscroll = 0
let scaleFactor = 1
// sensitivity (pixels per wheel delta unit / per scroll px)
const SCROLL_RESIZE_FACTOR = 0.5

// check for scrolls or drags
window.addEventListener("mousedown", ()=>{
    mousedown = true
    if (tool == tools.pen){
        lines.push([{x:(mousepos.x-canvas.offsetLeft)/scaleFactor,y:(mousepos.y-canvas.offsetTop)/scaleFactor,wid:pwid,color:ccolor}])
    }
    smpos.x = mousepos.x
    smpos.y = mousepos.y
    scpos.y = canvas.offsetTop;                 // position relative to offsetParent
    scpos.x = canvas.offsetLeft;
    if (tool == tools.fill && mousepos.x > canvas.offsetLeft && mousepos.y > canvas.offsetTop && mousepos.x < canvas.offsetLeft+1980*scaleFactor&& mousepos.y < canvas.offsetTop+1080*scaleFactor){
        
        fill(Math.round((mousepos.x-canvas.offsetLeft)/scaleFactor),Math.round((mousepos.y-canvas.offsetTop)/scaleFactor),ccolor)
    }
})
window.addEventListener("mouseup", ()=>{
    mousedown = false
    dragging = false
})
window.addEventListener("mousemove", (e)=>{
    mousepos.x = e.clientX
    mousepos.y = e.clientY
    if (mousedown){
        dragging = true
        if (tool !== tools.restyle) return
        const movement = {
            x: mousepos.x - smpos.x+scpos.x,
            y: mousepos.y - smpos.y+scpos.y
        }
        canvas.style.top = movement.y + "px"
        canvas.style.left = movement.x + "px"
    }

    pmpos.x = mousepos.x
    pmpos.y = mousepos.y
})


window.addEventListener("wheel", (e)=>{
    e.preventDefault()
    const delta = -e.deltaY // wheel up -> positive
    const change = delta * SCROLL_RESIZE_FACTOR
    const currentW = canvas.offsetWidth
    const currentH = canvas.offsetHeight
    const newW = Math.max(50, currentW + change)
    const newH = newW * (currentH / currentW) // maintain aspect ratio
    canvas.style.width = newW + "px"
    canvas.style.height = newH + "px"
    scaleFactor = newW / canvas.width
}, { passive: false })