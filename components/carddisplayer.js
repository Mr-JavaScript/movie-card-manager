class CardDisplayer extends HtmlComponent {

  constructor () {
    super ({name:"card-displayer", debug: true})
    this.just_created = true
    this.card_data = undefined
    this.card_html = undefined
    this.operations_order = ["toggleListView", "getCardData", "addCards"]
  }
  get list () {
    return this.query ("ul")
  }
  connectedCallback () {

    this.render ()
    // this.generateCards ()

  }
  observedAttributes () {
    return ["view"]
  }
  getCardData () {
    console.log(this);
    this.sendSignal ("new-cards", this.attr ("view"))
  }
  toggleListView (cb) {

    let view = this.attr ("view")

    if (view == "selected" || !view) 
      view = "all-cards", this.list.scrollLeft = this.fromState ("list-scrollLeft") || 0;
      
    else 
      view = "selected", this.updateState ("list-scrollLeft", this.list.scrollLeft)

    this.list.className = view
    this.attr ("view", view)
    if (cb) cb ()

  }
  newCardsHandler (cards) {

    this.has_cards = true
    this.card_data = cards
    this.card_html = cards.map (card=> this.cardHTML (card)).join ("")

  }
  addCards (cards) {

    let width

    if (cards) this.newCardsHandler (cards)
    this.just_created = false;
    
    this.list.innerHTML = this.card_html
    if (cards.length <= 4) this.list.style.width = `${cards.length * 17.4}%`
    else width = "90%"
    this.list.style.width = width

    if (this.attr ("view") == "all-cards") this.list.scrollLeft = this.fromState ("list-scrollLeft")
   
  }
  signals () {

    this.onSignal ("app-loaded", ()=> {
      this.sendSignal ("pick-cards", "*")
    })

    this.onSignal ("new-cards", cards=> {

      this.toggleListView ()

      if (!this.just_created) this.removeAllCards (()=> {

        setTimeout (()=> this.addCards (cards), 600)
  
      })
      else this.addCards (cards)

    })

    this.onSignal ("current-view", ()=> this.attr ('view'))

    this.onSignal ("view-change", ()=> {})

  }
  cardHTML (card){;
    return `<card-element ${attributeString (card, ["*"])}></card-element>`
  }
  displaySelected (cards) {
    console.log(cards);
    this.selected_cards = cards
    this.attr ("display-which", "selected")
    setTimeout (()=> this.render (), 500)
  }
  cardElements () {
    return this.query ("card-element", true)
  }
  removeAllCards (cb) {
    let count = 0, index = 0, cards = Array.from (this.cardElements ())

    let last_card = cards.slice (-1) [0]

    last_card.addEventListener ("animationstart", e=> {

      console.log ({ message: "animtion started" })

    })
    
    last_card.addEventListener ("animationend", e=> {

      console.log ({ message: "animtion ended" })

    })

    let delay = 100
    let delay_sum = (delay * cards.length)
    cb (delay_sum)

    let args = ["hide-card", "change-view 1.3s ease-out forwards"]

    let stagger = (_cb = ()=> {})=> {
      if (index == cards.length) return _cb ()
      let card_elem = cards [index]
      card_elem.removeAnimation ()
      setTimeout (()=> stagger (_cb), delay); ++ index
    }

    stagger (()=> {
      // this.style.animation = "change-view 2s ease-out forwards"
    })
  }
  render () {   
    
    let style = /*css*/`
    :host {
      position: absolute;
      width: 100%; height: 100%;
      overflow: hidden;
    }
    @keyframes change-view {
      0% {
        width: inherit; height: inherit;
      }
      50% {
        opacity: 0; width: inherit; height: inherit;
      }
      100% {
        opacity: 1;
        height: 70%; min-width: 548px;
        top: 50%; left: 50%; border-radius: 15px;
        box-shadow: 0px 4px 5px 1px rgb(0 0 0 / .5);
        transform: translate(-50%, -50%);
        background: var(--card-tint);
      }
    }
    ul {
      position: absolute;
      left: 50%; top: 43%;
      transform: translate(-50%, -50%);


      display: flex; overflow-x: scroll;
      gap: 7rem;
      justify-content: space-between;
      align-items: center; margin: 0px; padding: 0rem 9rem;
      transition: width .5s ease-out, opacity .4s ease-out, height .4s ease-out, border-radius .4s ease-in, background 3s ease-in;
    }
    ul.all-cards {
      width: 90%; height: 55rem;
    }
    ul.selected {
      overflow-x: hidden;
      position: absolute;
      border-radius: 15px;
      padding: 5rem 9rem; background: var(--card-tint);     
    } 
    @keyframes selected-list-view {
      to {
        
      }
    }
    ul::-webkit-scrollbar {
      width: .5em;
      height: 0px;
      scale: .5;
      background-color: rgb(0 0 0 / 0);
    }
    
    ul::-webkit-scrollbar-track {
      box-shadow: 0 0 6px 1px rgb(15 15 15 / .5);
      opacity: .7;
    }
    
    ul::-webkit-scrollbar-thumb {
      background-color: var(--gray-1);
      outline: none;  border-radius: 15px;
      opacity: .7;
      height: 5px;
    }`

    this.shadowRoot.innerHTML = /* html */`
      <style>
        ${style}
      </style>
      <ul></ul>
    `

    this.addEventListener("wheel", function (e) {
      this.list.scrollLeft += e.deltaY;
    });
  }
}

customElements.define('card-displayer', CardDisplayer)