class CardElement extends HtmlComponent {

  constructor () {
    super ("card-element")
    this.card_data = undefined
  }
  onload () {
    this
      .watchAttr ("times-selected", ()=> this.render ())
  }
  getAllData () {
    return {
      movie: this.attr ("movie"),
      character: this.attr ("character"),
      quote: this.attr ("quote"),
      ability: this.attr ("ability")
    }
  }
  afterRender () {
    setTimeout (()=>{
      
      this.query (".card-element").style.scale = 1
      this.query (".card-element").style.opacity = 1
    
    }, 100)
  }
  selected () {
    
    let int = parseInt (this.attr ("times-selected"))
    // console.log(int, this.attr ("movie"))
    this.attr ("times-selected", int + 1)
    this.remove ()

  }
  removeAnimation () {
    this.classList.remove ("selected")
    this.classList.add ("hide-card")
  }
  keyFrameCSS () {
    return /*css*/`
    @keyframes pulse {
      0% {
        opacity: .5;
      }
      50% {
        opacity: .9; transform: scale(.7);
      }
      100% {
        opacity: .5; transform: scale(1);
      }
    }
    @keyframes animated-box-shadow {
      0% {
        box-shadow: 4.5px 4.5px 5px 0px var(--gray-3);
      }
      100% {
        box-shadow: 4.5px 4.5px 10px 2.5px var(--gray-3);
      }
    }`
  }
  onHoverCSS () {
    return /* css */`
    :host(:hover), :host(.selected){
      transform: scale(1.1) skew(0deg, 0deg);
    }
    .card-element.selected, .card-element:hover {
      backface-visibility: hidden;
      box-shadow: var(--box-shadow-light);
      background: var(--card-bg-gradient);
    }
    :host(.selected) .card-element {
    }
    :host(.selected) .poster, :host(:hover) .poster {
      margin: auto; width: 98%; height: 98%;
    }
    :host(.selected) .emblem, :host(:hover) .emblem{
      transition: opacity .2s ease-in;
      animation: pulse 1s 200ms ease-out infinite;
    }
    :host(.selected) .emblem svg circle, :host(:hover) .emblem svg circle {
      box-shadow: 1px 1px 30px rgba(100 100 100 / 1);
    }
    :host(.selected) .light-half, :host(:hover) .light-half{
      fill:rgb(200 200 200);
    }
    :host(.selected) .tint, :host(:hover) .tint {
      transform: translate(-50%, -50%);
    }
    :host(.selected) .times-selected, :host(:hover) .times-selected {
      opacity: .9; transform: scale(.8);
      box-shadow: 1px 1px 30px rgba(25 25 25 / 1);
    }
    :host(.selected) .content, :host(:hover) .content {
      padding-top: 12.5rem;
    }
    :host(.selected) .movie-title h1, :host(:hover) .movie-title h1{

    }
    :host(.selected) .quote, :host(:hover) .quote {
      height: 0px;
      opacity: 0; display: none;
    }
    :host(.selected) .character, :host(:hover) .character {
      opacity: 0;
    }
    :host(.selected) .ability-name, :host(:hover) .ability-name {
      position: static;
      padding: 1rem 1rem;
      opacity: 1;
      background-color: rgb(15 15 15 / .8);
      box-shadow: var(--box-shadow-black);
      width: fit-content;
      margin-left: auto;
      transform: translate(1rem, 5px);
      backdrop-filter: blur(4px);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      text-shadow: var(--neon-text);
    }
    :host(.selected) .ability-name p, :host(:hover) .ability-name p, :host(.selected) .ability p, :host(:hover) .ability p {
      opacity: 1; font-weight: bold;
    }
    :host(.selected) .ability, :host(:hover) .ability {
      box-shadow: var(--box-shadow-black);
      opacity: 1; width: 110%;
      padding: 1rem 1rem; display: block;
      background-color: rgb(15 15 15 / .8);
      backdrop-filter: blur(4px);
    }
    :host(.selected) .ability-type, :host(:hover) .ability-type {
      width: 40%; font-weight: bold;
      background-color: rgb(15 15 15 / .8);
      box-shadow: var(--box-shadow-black);
    }
    :host(.selected) .flash-container, :host(:hover) .flash-container {
      opacity: 1;
    }
    :host(.selected) .flash-container::before, :host(:hover) .flash-container::before {
      top: 100%; opacity: 1;
    }`
    
  }
  borderCss () {
    return /*css*/``

  }
  selected (operation = "add") {
    if (this.classList.contains ("selected") && this.attr ("view") == "selected") return
    this.classList.toggle ("selected")
    this.classList.toggle ("outline-tracers")
    this.query (".card-element").classList.toggle ("selected")
  }
  render () {
    let attr = this.attr.bind (this)
    let poster = attr ("poster")

    let style = /*css*/`
    :host {
      min-width: 260px; height: 540px; transform: scale(1) skew(-2deg, 0deg);
      max-width: 260px; position: relative;
      transition: transform .1s ease-in, opacity .4s ease-out;
      --box-shadow-light: 4.5px 4.5px 5px 0px var(--gray-3);
      --box-shadow-black: 4.5px 4.5px 2.5px 0px var(--gray-0);
      --neon-text: 0 0 0.1em #fff, 0 0 0.2em #fff, 0 0 0.3em #fff, 0 0 0.2em #ee7752, 0 0 0.4em #23d5ab, 0 0 0.6em #23d5ab, 0 0 .8em #23d5ab, 0 0 1.2em #23d5ab;
      --card-bg-gradient: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      --ability-name-bg-gradient: linear-gradient(45deg, rgb(231 60 126 / .25), rgb(238 119 82 / .5), rgb(35 213 171 / .5), rgb(35 166 213 / .25));
    }
    :host(.hide-card) {
      transition: transform .4s ease-in, opacity .4s ease-out;
      opacity: 0; transform: translateX(-400px) scale(.6) skew(-2deg, 0deg);
    }
    .card-element {
      height: 99%;
      position: relative; 
      background-color: var(--gray-0);
      background-size: 520px 1080px;
      transition: transform .1s ease-in, box-shadow .2s ease-out, opacity .2s ease-out, background .2s ease-out;
      box-shadow: 3.5px 3.5px 5px .5px var(--gray-2);
      border: 4px solid var(--gray-0);
      border-style: groove solid;
      opacity: 0;
      scale: .5;
    }
    
    .poster {
      position: absolute;
      width: 100%; height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: 50%;
      left: 50%; top: 50%; transform: translate(-50%,-50%);
      transition: width .2s ease-in, height .2s ease-in;
      backdrop-filter: blur(4px);
      z-index: -1;
    }
    .times-selected {
      position: absolute;
      right: -1.75rem;
      top: -2.5rem;
      font-size: 1.5rem;
      font-weight: bold;
      background-color: black;
      border-radius: 50%;
      width: 3.5rem; height: 3.5rem;
      display: grid;
      place-items: center;
      margin: 0px;
      background:linear-gradient(to bottom, rgb(15 15 15 / .8) 0%, rgb(15 15 15) 50%, rgb(15 15 15 / .8) 100%);
      opacity: .5;
      transition: opacity .3s ease-out, transform .3s ease-in, box-shadow .3s ease-out;
    }
    .character {
      text-align: end;
      opacity: .5;
      transition: position .4s ease-out, bottom .2s ease-out, opacity .1s ease-out;
      position: absolute;
      bottom: -.75rem;
      right: 0px;
      font-weight: bold;
    }
    .quote {
      font-size: 1.5em;
      padding: 1rem; width: 110%;
      background-color: rgb(15 15 15 / 1);
      backdrop-filter: blur(4px);
      transition: opacity .2s ease-out, height .3s ease-in;
    }
    .ability {
      font-size: 1.25em;
      opacity: 0; width: 0%; display: none;
      transition: opacity .2s ease-out;
    }
    .ability-name {
      opacity: 0; font-size: 1em; font-weight: bold;
    }
    .ability-type {
      position: absolute;
      width: 0px;
      right: 0px; top: 1.3rem;
      background-color: rgb(15 15 15);
      backdrop-filter: blur(4px);
      transition: width .3s ease-out, opacity .3s ease-out;
      overflow: hidden;
      border-bottom-left-radius: 15px;
      z-index: 0;
    }
    .ability-type p {
      text-align: center; padding: .5rem 1rem; font-size: .75rem;

    }
    h1 {
      font-size: 2rem;
    }
    p, q {
      margin: 0px;
    }

    .movie-title, .quote, .character, .ability {
      z-index: 2;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    
    .tint {
      position: absolute;
      width: 200%; height: 200%;
      top: 0px; left: 0px;
      margin: 0px;
      transition: transform .3s ease-out;
    }
    .content {
      width: 100%; padding-top: 19rem; transition: padding-top .2s ease-out;
      z-index: 2;
    }
    .content > * {
      z-index: 4;
    }
    .text-shape {
      transform: translateX(-1.8rem);
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
      box-shadow: 0px 5px 5px 1px var(--gray-0);
    }
    .border {
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    .emblem {
      position: absolute;
      right: -1.25rem;
      top: 1.05rem; 
      z-index: 2;
      width: 2.5rem;
      height: 2.5rem;
      opacity: .5;
    }
    .light-half {
      transition: fill .4s ease-out;
      fill:rgb(100 100 100);
    }
    .tint-container {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
    }

    .ontop {
      z-index: 5;
    }
    `

    this.shadowRoot.innerHTML = /* html */`
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Monoton&effect=neon">
      <style>
        
        @import "../css/hero.css";
        @import "../css/utils.css";
        
        ${style}

        ${this.onHoverCSS ()}

        ${this.borderCss ()}

        ${this.keyFrameCSS ()}
      </style>

      <div class="card-element border jump-2">

        <img class="poster border" src="${poster}" alt="">
        <div class="tint-container">
          <div class="tint border"></div>
        </div>

        <div class="flash-container"></div>

        <div class="content">
          <div class="times-selected"><p>${attr ("times-selected")}</p></div>
          
          <div class="quote text-shape"><q>${attr ("quote")}</q></div>
          <div class="character"><p>${attr ("character")}</p></div>
          <div class="ability-name"><p>${attr ("ability-name")}</p></div>
          <div class="ability text-shape"><p>${attr ("ability")}</p></div>
        </div>

        <div class="ability-type"><p>${attr ("type")}</p></div>
        <div class="emblem">${emblems [attr ("type")]?.html}</div>

      </div>
    `

    if (this.attr ("view") == "selected")
      setTimeout(() => {
        this.selected ()
      }, 500);

    this.onclick = ()=> this.selected ()
    // const elem = this.query (".card-element")
    // elem.onmouseenter = ()=> elem.classList.add ("selected")
    // elem.onmouseleave = ()=> {
    //   console.log (this instanceof HtmlComponent)
    //   elem.classList.remove ("selected")
    // }
  }

}

customElements.define ('card-element', CardElement)