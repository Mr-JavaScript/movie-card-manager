methods = ()=> {
  fadeIn = (len, timing = "out")=> `fade-in ${len}ms forwards ease-${timing}`
  fadeInFrom = (len, dir, timing = "out")=> `fade-in-from-${dir} ${len}ms forwards ease-${timing}`
  anim = (len, name, ease = "in")=> `animate-${name} ${len}ms ease-${ease} forwards`
  setRootProperty = (prop, val)=> docEl.style.setProperty ("--"+prop, val)

  isInViewport = (element)=> {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )

}

  timedAnimations = function () {

    let animations = []
    let index = 0
    let temp = []

    let lastDelay = 0, lastAnimation, lastIndex = 0

    let checkTemp = ()=> {

      if (!temp [1]) temp [1] = lastAnimation
      if (!temp [2]) temp [2] = lastDelay

      if (!(temp [0] && temp [1] && temp [2])) return
      
      animations [index] = temp
      temp = []
      lastIndex = ++ index      

    }

    let run = (index, cb)=> {

      let p = new Promise ((res, rej)=> {
  
        if (index + 1 != animations.length) res ()
        else rej ()
  
      })

      p.then (()=> {

        if (!animations [index]) return

        select = animations [index] [0]
        anim = animations [index] [1]
        ms = animations [index] [2]

        if (!select && !anim && !ms) {
          lastAnimation = undefined
          lastDelay = undefined
          lastIndex = 0
          animations = []
          index = 0
          return
        }

        setTimeout (()=> {

          let selectors = select.split (" && ")

          for (const selector of selectors) $ (selector).style.animation = anim

          run (++index, cb)
      
        }, ms)

      })
      .catch (()=> cb ())      

      
      return index == animations.length
    }

    return {
      wait (ms) {

        lastDelay = ms
        temp [2] = ms

        checkTemp ()
        return this

      },
      do (selector, animation) {

        lastAnimation = animation

        temp [0] = selector
        temp [1] = animation

        checkTemp ()
        return this

      },
      init (cb) {

        console.log (animations);

        animations.push ([false, false, false])

        run (0, cb)

        // p.then (()=> cb ())

      }
    }
  }

  readTextFile = (file, callback)=> {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
    }
    rawFile.send(null)
  }
  round = Math.round
  floor = Math.floor
  rand = Math.random

  attributeString = (obj, prop_array)=> {
    let str = ""
    if (prop_array [0] == "*") {
      for (const prop in obj) str += ` ${prop}="${obj [prop]}"`
    }
    else prop_array.forEach (prop=> str+= ` ${prop}="${obj [prop]}"`); return str
  }
  

  el = (selector, elem = document.querySelector("body > my-app"))=> elem.shadowRoot.querySelector(selector)

  html =str=> str.raw
}

methods ()