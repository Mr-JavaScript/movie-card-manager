class NavBar extends HtmlComponent {

  constructor () {
    super ({name:"nav-bars"})
    this.links = ["CATEGORIES", "MOVIES", "GENRES"]
  }
  onload () {
    this.watchAttr ("selected", ()=> this.render ())
  }
  createLink (link) {
    let selected = this.attr ("selected").toUpperCase () == link
    return selected? `<li><a class="selected">${link}</a></li>` : `<li><a>${link}</a></li>`
  }
  openAddCardForm (e) {
    e.preventDefault ()
    this.query ("form").classList.toggle ("hidden")
  }
  render () {
    let links = this.links.map (link=> this.createLink (link)).join ("");

    let style = /* css */`
      :host {
        position: absolute;
        top: 1rem;
        right: 0px;
        width: 480px;
        z-index: 2;
      }
      nav {
        position: relative;
      }
      .nav-contents {
        display: flex; background-color: var(--gray-1);
        border-bottom-left-radius: 15px;
        box-shadow: 0px 4px 5px .5px var(--gray-0);
        overflow: hidden;
      }
      nav a {
        font-size: 1.1em;
        text-align: center;
        color: white;
        opacity: .5;
        text-decoration: none;
        cursor: pointer;
      }
      nav a.selected {
        font-size: 1.15em;
        opacity: 1; font-weight: bold;
      }
      nav a:hover {
        opacity: .9;
        font-weight: bold;
      }
      nav ul {
        display: flex;
        list-style: none;
        justify-content: space-between;
        width: 100%;
        padding: 0px;
        padding: 0px 1.5rem;
        align-items: center;
      }
      nav li {
        height: fit-content;
      }
      nav > div {
        display: grid;
        place-items: center;
        background-color: var(--gray-0);
      }
      nav li:hover {
        transform: scale(1.1);
      }
      #nav-bar-add-card-anchor {
        font-size: 2em;
        padding: 0rem 1rem;
      }
      #nav-bar-add-card-anchor:hover {
        opacity: 1;
        font-weight: bold;
        transform: scale(1.1);
      }
      form {
        padding-top: 1rem;
        top: 8rem; right: 1rem;
        background-color: var(--gray-1);
        border-radius: 0px 15px 0px 15px;
        position: absolute;
        width: 540px;
        display: flex;
        height: fit-content;
        flex-direction: column;
        box-shadow: 0px 4px 5px .5px var(--gray-0);
        transition: opacity .2s ease-out, transform .4s ease-out;
      }
      form .section {
        padding: 0 2rem; 
        display: flex; flex-direction: column;
      }
      form .section label {
        font-weight: bold;
        margin: 0 0 1rem 0rem;
      }
      form .section input {
        padding-left: 1rem; color: white;
        margin: 0 0 2rem 0rem;
      }
      form .radios {
        margin: 0 0 1rem 0rem;
        display: flex; justify-content: space-between; align-items: center; text-align: center;
      }
      form .section .radios label {
        margin: 0px;
        font-size: .75em;
      } 
      form input {
        background-color: rgb(0 0 0 / 0);
        border: 1px solid rgb(255 255 255 / .1);
        border-radius: 0 15px 0 15px;
        font-size: 1.5em; font-weight: normal;
      }

      form input[type=button] {
        color: white; width: 100%;
        border: none; font-weight: 100; font-size: 1.25em;
        background-color: var(--gray-0); cursor: pointer;
      }
      form .input {
        width: 100%; overflow: hidden; border-radius: 0px 15px 0px 15px;
        padding: 0px; margin: 0px; position: relative;
      }
      form .input::before {
        content: "";
        position: absolute;
        top: 0%; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent 25%, rgb(255 255 255 / .5), transparent 75%);
        transition: left .2s ease-in, top .1s ease-out;
      }

      form .input:hover::before {
        left: 100%;
      }

      form input[type=radio] {
        margin: 0px;
      }
      form.hidden {
        opacity: 0;
        transform: translateX(100%);
      }
      form .url {
        font-size: .75em;
      }
    `

    this.shadowRoot.innerHTML = /* html */`

      <style>
        ${style}
      </style>

      <nav>
        <div class="nav-contents">
          <div><a id="nav-bar-add-card-anchor" href="">+</a></div>

          <ul>${links}</ul>
        </div>

        <form action="#" class="hidden">
          <div class="section">
            <label for="MOVIE">MOVIE</label>
            <input type="text">
          </div>
          <div class="section">
            <label for="QUOTE">QUOTE</label>
            <input type="text">
          </div>
          <div class="section">
            <label for="CHARACTER">CHARACTER</label>
            <input type="text">
          </div>
          <div class="section">
            <label for="ABILITY">ABILITY</label>
            <input type="text" placeholder="name">
            <input type="text" placeholder="description">
          </div>
          <div class="section">
            <label for="CATEGORY">CATEGORY</label>
            <div class="radios wrapper">
              <input type="radio" name="category" value="attack">
              <label for="attack">attack</label><br>
              <input type="radio" name="category" value="defense">
              <label for="defense">defense</label><br>
              <input type="radio" name="category" value="support">
              <label for="support">support</label><br>
            </div>
          </div>
          <div class="section url">
            <input type="text" placeholder="poster url / location">
          </div>
          <div class="input">
            <input type="button" value="submit">
          </div>
        </form>

      </nav>
    `

    this.query ("#nav-bar-add-card-anchor").onclick = this.openAddCardForm.bind (this)
  }
}

customElements.define('nav-bar', NavBar)