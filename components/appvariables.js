class AppVariables extends HtmlComponent {

  constructor () {
    super ({name:"app-variables"})
    this.links = ["CATEGORIES", "MOVIES", "GENRES"]
    this.view = "normal"
  }
  onload () {
    this.watchAttr ("pick-amount", ()=> this.render ())
  }
  signals () {

    this.onSignal ("view-change", view=>  {

      // console.log("hey");

      let btn_val, action
      
      if (this.view == "alt")
        btn_val = "pick cards", action = "remove", this.view ="normal";
      else 
        btn_val = "reset", action = "add", this.view ="alt";
      
      this.query ("input[type=button]").value = btn_val
      this.query (".number").classList [action] ("hide")

    })

  }
  pickCards () {

    let amount = this.view == "normal"? this.attr ("pick-amount") : "*"
    this.sendSignal ("pick-cards", amount)
    
  }
  pickAmount () {
    return this.query ("input").value
  }
  update () {
    let pick_amount = this.pickAmount ()
    this.attr ("pick-amount", pick_amount)
  }
  render () {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        #variables {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 240px;
          height: 4rem;
          display: flex;
          border-top-left-radius: 15px;
          overflow: hidden;
        }
        div > div {
          width: 50%;
          display: grid;
          place-items: center;
        }
        input {
          outline: none;
          border: none;
          color: white;
          font-size: 1rem;
          background-color: rgb(0 0 0 / 0);
        }
        .number {
          background-color: var(--gray-0);
          transition: transform .3s ease-in, opacity .3s ease-out;
        }
        .button {
          z-index: 1;
          cursor: pointer;
          background-color: var(--gray-2);
        }
        .number > input {
          width: 70%;
          text-align: right;
          border-bottom: 1px dashed white;
        }
        .number.hide {
          opacity: 0;
          transform: translateX(100%);
          z-index: 0;
        }
      </style>

      <div id="variables">
        <div class="number">
          <input type="number" value=${this.attr ("pick-amount")}>
        </div>
        
        <div class="button">
          <input type="button" value="PICK CARDS">
        </div>
      </div>
    `
    this.query ("input").onchange = this.update.bind (this)
    this.query (".button").onclick = this.pickCards.bind (this)
  }
}

customElements.define('app-variables', AppVariables)