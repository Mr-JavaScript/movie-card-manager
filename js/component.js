class Component {

  constructor (state) {

    this.id = ID ()

    this.state = state || {}

    this.memo = {
      last: {},
      current: {}
    }

    this.initialized = true

    this.init (state.html)

  }

  data (key, value) {

    if (!this.element) {
      console.log("no element to attach data to")
      return
    }



  }

  remove () {

    let ii, comp

    this.element.remove ()

    for (const comp of Components)

      if (comp.id == this.id)
      {
        
        ii = index
        break
        
      }

    if (ii) comp = Components.splice (ii, 1)

    if (comp) comp.element.remove ()

  }

  updateState () {

  }

  html () {

    return HTML (`<div data-id="${this.id}"></div>`)

  }

  init (html = this.html) {

    if (!html) {
      
      this.element = "no -> 'this.html()' function"
      return

    }

    if (typeof html === 'string') this.element = HTML (html)
    else this.element = html ()

    this.dataset = this.element.dataset

    Components.push (this)

  }

}

const Components = []