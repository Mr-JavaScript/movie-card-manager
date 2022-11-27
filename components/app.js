class MyApp extends HtmlComponent {

  constructor () {
    super ({name:"my-app"})
    this.card_data = undefined
    this.selected_cards = undefined
    this.current_deck = undefined
    this.displayer = undefined
    this.signaler = new Signaler ("my-app")
  }
  connectedCallback () {

    readTextFile("./data/cards.json", (text)=> {
      this.card_data = JSON.parse(text)
      this.render ()
    })
    
  }
  cards () {
    return this.query ("card-displayer").query ("card-element", true) // true = queryAll
  }
  signals () {
    let $cards, len, data, card_data = this.card_data
    let card_test_array = [...card_data, ...card_data, ...card_data]

    this.onSignal ("new-cards", view=> {

      let data = view == "all-cards"? 
      card_test_array : this.selected_cards
      return data
      
    })

    this.onSignal ("pick-cards", card_pick_num=> {

      // console.log("triggered", {card_pick_num});

      if (card_pick_num == "*") data = card_test_array
      else {

        $cards = this.cards (), len = this.card_data.length;
    
        this.selected_cards = data =[]

        for (let ii = 0; ii < card_pick_num; ii++) {
          const card_data = this.card_data [floor (rand ()*len)]
          ++card_data ["times-selected"]
          this.selected_cards.push (card_data)
        }

        data = this.selected_cards

      }

      this.sendSignal ("view-change", null, "app-variables")
      this.sendSignal ("new-cards", data, "card-displayer")

    })

    this.onSignal ("add-blur-to-card-displayer", ()=> {
      this.sendSignal ("add-foreground-blur", null, "card-displayer")
    })

    this.onSignal ("remove-blur-from-card-displayer", ()=> {
      this.sendSignal ("remove-foreground-blur", null, "card-displayer")
    })

    this.onSignal ("check-viewed-card", card_a=> {
      let card_b = this.sendSignal ("get-viewed-card", null, "card-displayer")
      return card_a == card_b
    })
    // this.onSignal ("display-selected-cards", cards=> {
    //   this.displayer.cards = [cards, "selected"]
    // })

  }
  render () {
    this.shadowRoot.innerHTML = /* html */`
      <style>
      @import "../css/hero.css";
        :host {
          position: absolute;
          width: 100%; height: 100%;
          background: linear-gradient(-45deg, var(--gray-3), var(--gray-2), var(--gray-1), var(--gray-2), var(--gray-3));
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      </style> 

      <nav-bar selected="genres"></nav-bar>
      <card-displayer></card-displayer>
      <app-variables pick-amount="3"></app-variables>
    `

    let components = Array.from (this.shadowRoot.children).splice (1)
    
    this.signaler.connectComponent (this)

    components.forEach (comp=> {
      this.signaler.connectComponent (comp)
      this.sendSignal ("app-loaded", null, comp.name)
    })

    // console.log (this.signaler._reciever)
  }
}

customElements.define ('my-app', MyApp)