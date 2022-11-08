class TimedAnimator {

  constructor () {

    this.limit = 0
    this.ticks = -1
    this.order = []

    this.timer = {

      now: undefined,
      last: 0,
      delta: 0,
      accum: 0

    }

    this._delay = {
      curr: 1000,
      last: 0
    }

    this.observers = {}

  }

  updateLimit (obj) {
    this.limit += obj.delay
  }

  hanldeSelector (obj) {

    let selectors = obj.to.split (" && ")

    let elements = []

    selectors.forEach (_$=> {

      if (_$ instanceof HTMLElement) elements.push (_$)
      else
      if (typeof _$ == "string") elements.push ($(_$))

    })

    return elements

  }

  delay (ms) {
    this._delay.curr = ms
    return this
  }

  updateDelay (obj) {
    this._delay.last = this._delay.curr
    this._delay.curr = obj.delay
  }

  handleDelay (obj) {
    if (typeof obj.delay != "number") obj.delay = this._delay.curr
    this.updateDelay (obj)
    this.updateLimit (obj)
  }

  do (obj, delay) {

    obj.delay = delay

    if (obj.to && obj.do) {

      const elem = this.hanldeSelector (obj)
      this.handleDelay (obj)
      this.order.push ([elem, obj])

    } return this

  }

  timerUpdate (obj) {

    const {timer: tt} = obj

    if (!tt.accum) tt.accum = 0

    let bool, now = Date.now ()

    tt.last = tt.now || now
    tt.now = now

    tt.delta = tt.now - tt.last

    tt.accum += tt.delta

    if ( (bool = tt.accum >= obj.delay) ) tt.accum = tt.now = undefined

    return bool

  }

  run (index = 0) {

    const [elems = [], obj] = this.order [index] || []

    // console.log(this.order, index);

    if ((elems.length == 0 || !obj)) return

    setTimeout (()=> {

      elems.forEach (elem=> elem.style.animation = obj.do)

      this.run (++ index)
      
    }, obj.delay)


  }

}


timedAnimationsOrig = function () {

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