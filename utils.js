const tools = Object.freeze({
    pen: "PeN",
    fill: "fIlL",
    restyle: "RS",
    shape: "sHaPe",
    erase: "ERasE"
}) // totally enum

let tool = tools.pen,
    mousedown = false,
    dragging = false,
    sscroll = 0,
    lines = [],
    pwid=2,
    ccolor={r:0,g:0,b:0,a:255}
const mousepos = {x:null,y:null},
      pmpos = mousepos,
      smpos = {x:null,y:null},
      scpos = {x:200,y:0}
function getColor(x,y, imgdata){
    const index = (y * imgdata.width + x) * 4
    return {
        r: imgdata.data[index],
        g: imgdata.data[index + 1],
        b: imgdata.data[index + 2],
        a: imgdata.data[index + 3]
    }
}
function fill(x,y,color){
    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const scol = getColor(x,y,imgData)
    const queue = [{x,y}]
    let iterations = 0
    if (scol.r === color.r && scol.g === color.g && scol.b === color.b && scol.a === color.a) return
    while (queue.length > 0 && iterations < 500000){ 
        const {x,y} = queue.shift()
        const currentColor = getColor(x,y,imgData)
        if (currentColor.r === scol.r && currentColor.g === scol.g && currentColor.b === scol.b && currentColor.a === scol.a) {
            const index = (y * imgData.width + x) * 4
            imgData.data[index] = color.r
            imgData.data[index + 1] = color.g
            imgData.data[index + 2] = color.b
            imgData.data[index + 3] = color.a

            if (x > 0) queue.push({x: x - 1, y})
            if (x < imgData.width - 1) queue.push({x: x + 1, y})
            if (y > 0) queue.push({x, y: y - 1})
            if (y < imgData.height - 1) queue.push({x, y: y + 1})
        }
    iterations++
    }

    ctx.putImageData(imgData,0,0)
}
function hexToRgba(hex){
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return {r, g, b, a: 255}
}
function makeFile(name){
    const link = document.createElement('a')
    link.download = name
    link.href = canvas.toDataURL()
    link.click()
}