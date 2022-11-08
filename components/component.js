class HtmlComponent extends HTMLElement {
  #observed = {
    attrs: [],
    callbacks: {}
  }
  constructor ({ name, debug = false, mode = "open"} = {}) {
    super ()
    this.name = name || this.tagName.toLocaleLowerCase ()
    this._events = {}
    this.attachShadow ({ mode })
  }
  onload () {}
  render () {}
  afterRender () {}
  connectedCallback () {
    this.onload ()
    this.render ()
    this.afterRender () 
  }
  observedAttributes () {
    return this.#observed.attrs
  }
  attributeChangedCallback (attr, old_val, new_val) {
    console.log(attr);
    let callback = this.#observed.callbacks [attr]
    if (callback) callback (old_val, new_val)
  }
  watchAttr (attr, cb) {
    this.#observed.attrs.push (attr)
    this.#observed.callbacks [attr] = cb
  }
  attr (attr, val) {
    if (val) this.setAttribute (attr, val)
    else return this.getAttribute (attr)
  }
  query (selector, all) {
    if (all) return this.shadowRoot.querySelectorAll (selector)
    return this.shadowRoot.querySelector (selector)
  }
}