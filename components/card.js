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
    this.className = "hide-card"
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
    }hover
    `
  }
  onHoverCSS () {
    return /* css */`
    .card-element:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 10px 1px rgb(0 0 0);
    }
    .card-element:hover .emblem{
      <!-- opacity: .7; -->
      transition: opacity .2s ease-in;
      animation: pulse 1s 200ms ease-out infinite;
    }
    .card-element:hover .emblem svg circle {
      box-shadow: 1px 1px 30px rgba(100 100 100 / 1);
    }
    .card-element:hover .light-half{
      fill:rgb(200 200 200);
    }
    .card-element:hover .tint {
      transform: translate(-50%, -50%);
    }
    .card-element:hover .times-selected {
      opacity: .9; transform: scale(.8);
      box-shadow: 1px 1px 30px rgba(15 15 15 / 1);
    }
    .card-element:hover .content {
      padding-top: 12.5rem;
    }
    .card-element:hover .movie-title h1{

    }
    .card-element:hover .quote {
      height: 0px;
      opacity: 0;
    }
    .card-element:hover .character {
      opacity: 0;
    }
    .card-element:hover .ability-name {
      position: static;
      padding: 1rem 1rem;
      opacity: 1;
      background-color: var(--gray-0);
      width: fit-content;
      margin-left: auto;
      transform: translate(1rem, 1px);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      <!-- bottom: .5rem; -->
    }
    .card-element:hover .ability-name p {
      opacity: .5;
    }
    .card-element:hover .ability {
      opacity: 1;
      padding: 1rem 1rem;
      background-color: rgb(15 15 15);
    }`
  }
  render () {
    let attr = this.attr.bind (this)
    let poster = attr ("poster")

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          min-width: 260px; height: fit-content;
          max-width: 260px; height: fit-content;
          transition: transform .4s ease-in, opacity .4s ease-out;
        }
        :host(.hide-card) {
          opacity: 0; transform: translateX(-400px) scale(.6); 
        }
        .card-element {         
          min-height: 540px;
          width: 100%; height: 100%;
          position: relative; 
          transform: scale(1);
          transition: transform .2s ease-in, box-shadow .2s ease-out, opacity .2s ease-out;
          box-shadow: 0px 4.5px 5px .5px var(--gray-0);
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
          padding: 1rem;
          background-color: var(--gray-0);
          transition: opacity .2s ease-out, height .3s ease-in;
        }
        .ability {
          font-size: 1.25em;
          opacity: 0;
          transition: opacity .2s ease-out;
        }
        .ability-name {
          opacity: 0; font-size: 1em; font-weight: bold;
        }
        .ability-type {
          position: absolute;
          width: 0px;
          right: 0px; top: 1.3rem;
          background-color: var(--gray-0);
          transition: width .3s ease-out, opacity .3s ease-out;
          overflow: hidden;
          border-bottom-left-radius: 15px;
          z-index: 0;
        }
        .ability-type p {
          text-align: center; padding: .5rem 1rem; font-size: .75rem;

        }
        .card-element:hover .ability-type {
          width: 40%;
        }
        h1 {
          font-size: 2rem;
        }
        p, q {
          margin: 0px;
        }

        .times-selected p {

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
          background: var(--card-tint);
          margin: 0px;
          transition: transform .3s ease-out;
        }
        .content {
          width: 100%; height: 100%; padding-top: 19rem; transition: padding-top .2s ease-out;
          z-index: 2;
        }
        .content > * {
          z-index: 4;
        }
        .text-shape {
          width: 110%;
          transform: translateX(-1.8rem);
          border-top-right-radius: 15px;
          border-bottom-left-radius: 15px;
          box-shadow: 0px 5px 5px 1px var(--gray-0);
          <!-- transform: translateX(-10px); -->
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
        .flash-container {
          position: absolute; overflow: hidden;
          width: 100%; height: 100%; z-index: 0; border-radius: 0px 15px 0px 15px;
        }
        .flash-container::before {
          content: "";
          position: absolute;
          top: -100%; left: 0px;
          width: 100%; height: 100%;
          background: linear-gradient(135deg, transparent 25%, rgb(255 255 255 / .5), transparent 75%);
          transition: left .2s ease-in, top .3s ease-out;
        }
        .card-element:hover .flash-container::before {
          top: 100%;
        }

        .ontop {
          z-index: 5;
        }

        ${this.onHoverCSS ()}

        ${this.keyFrameCSS ()}
      </style>

      <div class="card-element border jump-2">

        <img class="poster border" src="${poster}" alt="">
        <div class="tint-container">
          <div class="tint border"></div>
        </div>

        <div class="flash-container"></div>

        <div class="content">
          <div class="on-top times-selected"><p>${attr ("times-selected")}</p></div>
          
          <div class="on-top quote text-shape"><q>${attr ("quote")}</q></div>
          <div class="on-top character"><p>${attr ("character")}</p></div>
          <div class="on-top ability-name"><p>${attr ("ability-name")}</p></div>
          <div class="on-top ability text-shape"><p>${attr ("ability")}</p></div>
        </div>

        <div class="ability-type"><p>${attr ("type")}</p></div>
        <div class="emblem">${emblems [attr ("type")]?.html}</div>

      </div>
    `
    let content = `<div class="content">
      <div class="on-top times-selected"><p>${attr ("times-selected")}</p></div>
      
      <div class="on-top quote text-shape"><q>${attr ("quote")}</q></div>
      <div class="on-top character"><p>${attr ("character")}</p></div>
      <div class="on-top ability-name"><p>${attr ("ability-name")}</p></div>
      <div class="on-top ability text-shape"><p>${attr ("ability")}</p></div>
    </div>`

    let move_title_section = `<div class="movie-title">
      <h1>${attr ("movie")}</h1>
    </div>`
  }

}

customElements.define ('card-element', CardElement)