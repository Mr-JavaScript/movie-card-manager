class CardDisplayer extends HtmlComponent {

  constructor () {
    super ({name:"card-displayer", debug: true})
    this.just_created = true
    this.card_data = undefined
    this.card_html = undefined
    this.update_viewed_delay = 50
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
    if (cards.length <= 4) width = `${cards.length * 17.4}%`
    else width = "90%"
    this.list.style.width = width

    if (this.attr ("view") == "all-cards") this.list.scrollLeft = this.fromState ("list-scrollLeft")
    
    setTimeout (()=> this.updateViewedCard (true), 250)
  }
  signals () {

    this.onSignal ("app-loaded", ()=> {
      this.sendSignal ("pick-cards", "*")
    })

    this.onSignal ("new-cards", cards=> {

      if (!this.just_created) this.removeAllCards (()=> {

        
        setTimeout (()=> {

          this.toggleListView ()
          this.addCards (cards)
        
        }, 600)
  
      })
      else 
        this.toggleListView (),
        this.addCards (cards)

    })

    this.onSignal ("current-view", ()=> this.attr ('view'))

    this.onSignal ("view-change", ()=> {})

    this.onSignal ("get-viewed-card", ()=> {
      return this.viewed_card
    })

    this.onSignal ("add-foreground-blur", ()=> {
      this.list.style.filter = "blur(4px)"
    })
    this.onSignal ("remove-foreground-blur", ()=> {
      this.list.style.filter = "blur(0px)"
    })

  }
  cardHTML (card){;
    return `<card-element ${attributeString (card, ["*"])} view=${this.attr ("view")}></card-element>`
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
    let 
      count = 0, 
      index = 0, 
      cards = Array.from (this.cardElements ())

    let last_card = cards.slice (-1) [0]

    last_card.addEventListener ("animationstart", e=> {

      console.log ({ message: "animtion started" })

    })
    
    last_card.addEventListener ("animationend", e=> {

      console.log ({ message: "animtion ended" })

    })

    let
      delay = 100,
      delay_sum = (delay * cards.length)

    

    let stagger = (_cb = ()=> {})=> {
      if (index == cards.length) return _cb ()
      let card_elem = cards [index]
      card_elem.removeAnimation ()
      setTimeout (()=> stagger (_cb), delay); ++ index
    }

    stagger (()=> {

      cb (delay_sum)

    })
  }
  updateViewedCard (pass) {
    if (Date.now () - this.wheel_scrolled_time < this.update_viewed_delay && !pass) return
    let cards = this.cardElements ()
    for (let card of cards) {
      let card_rect = card.getBoundingClientRect ()
      let list_rect = this.list.getBoundingClientRect ()
      
      let screen_center = {
        x: window.innerWidth / 2, y: window.innerHeight / 2
      }
      let sc = screen_center

      if (card_rect.left < sc.x && card_rect.right > sc.x 
      && card_rect.top < sc.y && card_rect.bottom > sc.y) {
        card.attr ("view", "selected")
        card.selected ()

        if (!pass && this.viewed_card != card) 
          this.viewed_card.attr ("view", "all-cards"),
          this.viewed_card.selected ();

        this.viewed_card = card

      }
    }
    clearTimeout (this.scroll_timeout)
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
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) skew(-4deg, -4deg);
      display: flex; overflow-x: scroll;
      gap: 7rem;
      justify-content: space-between;
      align-items: center; margin: 0px; padding: 0rem 9rem;
      backdrop-filter: blur(4px);
      background: linear-gradient(45deg, var(--gray-0) 15%, transparent, var(--gray-0) 85%);  
      transition: 
        width .5s ease-out, 
        opacity .4s ease-out, 
        height .4s ease-out, 
        border-radius .4s ease-in, 
        background 3s ease-in,
        filter .2s ease-in;
    }
    ul.all-cards {
      width: 100%; height: 700px;
    }
    ul.selected {
      transform: translate(-50%, -50%) skew(-4deg, -4deg);
      overflow-x: hidden;
      position: absolute;
      border-radius: 15px;
      padding: 5rem 9rem;    
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
      this.list.scrollLeft += e.deltaY * .5;
      this.wheel_scrolled_time = Date.now ()
      this.scroll_timeout = setTimeout (this.updateViewedCard.bind (this), this.update_viewed_delay)
    });
  }
}

customElements.define('card-displayer', CardDisplayer)