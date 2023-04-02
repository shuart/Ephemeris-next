var dict = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5,
    f:6,
    g:7,
    h:8,
    i:9,
    j:10,
    k:11,
    l:12,
    m:13,
    n:14,
    o:15,
    p:16,
    q:17,
    r:18,
    s:19,
    t:20,
    u:21,
    v:22,
    w:23,
    x:24,
    y:25,
    z:26,
}

var nameToGradient= function (firstname, lastname) {
    var numbers=[]
    if (firstname &&  lastname) {
        numbers[0] = Math.floor(    nameToNumber(firstname.toLowerCase())      )
        numbers[1] = Math.floor(    nameToNumber(lastname.toLowerCase())      )
    }else{
        var middle = Math.floor(firstname.length/2)
        numbers[0] = Math.floor(    nameToNumber(firstname.toLowerCase().substring(0,middle))     )
        numbers[1] = Math.floor(    nameToNumber(firstname.toLowerCase().substring(middle,middle*2-1))      )

    }
    
    
    // return `linear-gradient(217deg, rgba(${numbers[0]-(numbers[1]/2)},${numbers[0]/2-(numbers[1])},${numbers[1]*2-numbers[0]},1), rgba(${numbers[1]+(numbers[0]/2)},${numbers[0]/2},${0},1)`
    return `linear-gradient(217deg, hsl(${numbers[0]+numbers[1]/2}, 100%, 50%),hsl(${numbers[1]-numbers[0]/2}, 100%, 50%))`
    
}

var nameToNumber= function (name) {
    var number=0
    for (let i = 0; i < name.length; i++) {
        if (dict[name[i]]) {
            number += dict[name[i]]
        }
        
    }

    var mean = number/(name.length*26)*255

    return mean
    
}

export {nameToGradient}