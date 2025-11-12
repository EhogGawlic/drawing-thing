window.addEventListener("mousemove", (e)=>{
    if (mousedown){
        switch (tool){
            case tools.pen:
                lines[lines.length-1].push({x:(mousepos.x-canvas.offsetLeft)/scaleFactor,y:(mousepos.y-canvas.offsetTop)/scaleFactor})

        }
    }
})
ctx.strokeStyle = "black"
ctx.lineWidth = 2
ctx.lineCap = "round"
function loop(){
    for (const line of lines){
        ctx.beginPath()
        ctx.moveTo(line[0].x,line[0].y)
        ctx.lineWidth = line[0].wid
        ctx.strokeStyle = `rgba(${line[0].color.r},${line[0].color.g},${line[0].color.b},${line[0].color.a/255})`
        for (let i=0;i<line.length-1;i++){
            const p2 = line[i+1]
            ctx.lineTo(p2.x,p2.y)
        }
        ctx.stroke()
    }
    requestAnimationFrame(loop)
}
loop()