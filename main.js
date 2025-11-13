window.addEventListener("mousemove", (e)=>{
    if (mousedown){
        switch (tool){
            case tools.pen:
                lines[lines.length-1].push({x:(mousepos.x-canvas.offsetLeft)/scaleFactor,y:(mousepos.y-canvas.offsetTop)/scaleFactor})
                ctx.beginPath()
                const points = lines[lines.length-1]
                ctx.moveTo(points[points.length-2].x, points[points.length-2].y)
                ctx.lineTo(points[points.length-1].x, points[points.length-1].y)
                ctx.strokeStyle = `rgba(${ccolor.r},${ccolor.g},${ccolor.b},${ccolor.a})`
                ctx.lineWidth = pwid
                ctx.stroke()
                break
            case tools.erase:
                const ex = Math.round((mousepos.x-canvas.offsetLeft)/scaleFactor)
                const ey = Math.round((mousepos.y-canvas.offsetTop)/scaleFactor)
                const eraseRadius = Math.ceil(pwid / 2)
                const imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
                for (let y = -eraseRadius; y <= eraseRadius; y++) {
                    for (let x = -eraseRadius; x <= eraseRadius; x++) {
                        if (x * x + y * y <= eraseRadius * eraseRadius) {
                            const px = ex + x
                            const py = ey + y
                            if (px >= 0 && px < imgData.width && py >= 0 && py < imgData.height) {
                                const index = (py * imgData.width + px) * 4
                                imgData.data[index] = 255
                                imgData.data[index + 1] = 255
                                imgData.data[index + 2] = 255
                                imgData.data[index + 3] = 0
                            }
                        }
                    }
                }
                ctx.putImageData(imgData,0,0)
                break
        }
    }
})
ctx.strokeStyle = "black"
ctx.lineWidth = 2
ctx.lineCap = "round"
function loop(){
    requestAnimationFrame(loop)
}
loop()