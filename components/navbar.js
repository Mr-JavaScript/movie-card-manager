class NavBar extends HtmlComponent {

  constructor () {
    super ({name:"nav-bars"})
    this.links = ["genres", "themes"]
    this.sub_links = {
      categories: ["attack", "defense", "support"],
      genres: [
        "action", "adventure", "comedy", 
        "drama", "fantasy", "horror", 
        "musicals", "mystery", "romance",
        "science fiction", "sports", "thriller", "western"
      ],
      themes: [
        "Family drama", "Humanity vs. technology", "Sacrifice",
        "Good vs. evil", "Death", "Perseverance",
        "Coming of age", "Reason vs. faith",
        "Justice", "love"
      ]
    }
  }
  formRadiosHTML (which) {
    let links = this.sub_links [which]
    return links.map (link=> {
      return `<li>
        <input type="radio" name="${which}" value="${link}">
        <label for="${link}">${link}</label><br>
      </li>`
    }).join ("")
  }
  onload () {
    this.watchAttr ("selected", ()=> this.render ())
  }
  createLink (link) {
    let selected = this.attr ("selected") == link
    link = link.toUpperCase ()

    if (selected) {
      this.sub_links.selected = link.toLowerCase ()
      return `<li class="selected"><a>${link}</a></li>`
    }
    return `<li><a>${link}</a></li>`
  }
  createSubLinks () {

    let link = this.query (".nav-contents ul li.selected")
    if (link) {

      this.sub_links.element = link
      this.sub_links.selected = link.textContent.toLowerCase ()

    }else return

    let links = this.sub_links [this.sub_links.selected]

    let html = links.map (link=> {
      return /* html */`<li><a href="#">${link}</a></li>`}).join ("")

    this.query (".nav-sub-link-displayer").innerHTML = `<ul>${html}</ul>`
  }
  openAddCardForm (e) {
    e.preventDefault ()
    this.query ("form").classList.toggle ("hidden")
  }
  render () {
    let sub_link_displayer;
    let links = this.links.map (link=> this.createLink (link)).join ("")

    let main_style = /* css */`
      @import "../css/shared.css";
      @import "../css/hero.css";
      .hidden {
        opacity: 0;
      }
      ul {
        list-style: none;
        padding: 0px; margin: 0px;
      }
      :host {
        position: absolute;
        top: 1rem;
        right: 0px;
        width: 400px;
        z-index: 2;
      }
      nav {
        position: relative;
        z-index: 1;
      }
      .nav-contents {
        display: flex; background-color: var(--gray-1);
        border-bottom-left-radius: 15px;
        box-shadow: 0px 4px 5px .5px var(--gray-0);
        overflow: hidden;
      }
      .nav-contents > ul {
        height: 48px; width: 100%;
        padding: 0px; margin: 0px;
        display: flex;
        list-style: none;
        justify-content: space-around;
        align-items: center;
      }
      .nav-contents > ul li {
        position: relative; overflow: hidden;
        display: grid; place-items: center;
        width: 50%; border-radius: 0px;
        padding: 0px 1.5rem; height: 100%;
      }
      .nav-contents > ul li::after{
        content: ""; position: absolute;
        top: 0px; left: -100%; opacity: 0;
        height: 100%; width: 100%;
        transition: left .2s ease-out, opacity .2s ease-out;
        background: linear-gradient(135deg, transparent 25%, rgb(255 255 255 / .75), transparent 75%);
      }
      ul li.selected::after, ul li.selected:hover::after{
        left: 100%; opacity: 1;
      }
      .nav-sub-link-displayer ul li::marker {
        opacity: .1;
      }
      nav a {
        transition: opacity .2s ease-out;
        font-size: 1.1em;
        text-align: center;
        color: white;
        opacity: .75;
        text-decoration: none;
        cursor: pointer;
      }
      nav li.selected {
        background-color: var(--gray-0);
      }
      nav li.selected a {
        font-size: 1.15em;
        opacity: 1; font-weight: bold;
      }
      nav a:hover {
        opacity: 1;
        font-weight: bold;
      }
      nav > div {
        display: grid;
        place-items: center;
        background-color: var(--gray-0);
      }
      nav li:hover a {
        opacity: .9;
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
      .nav-sub-link-displayer {
        position: absolute;
        top: 3rem; right: -100%;
        width: 360px; box-shadow: 0px 4.5px 5px .5px var(--gray-0);
        z-index: -1; padding: 1rem .5rem;
        border-bottom-left-radius: 15px;
        transition: height .2s ease-in, right .1s ease-out;
        opacity: 0;
      }

      .nav-sub-link-displayer ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 15px;
        text-align: center;
      }

      .nav-sub-link-displayer.active {
        opacity: 1; right: 0;
      }

      .nav-sub-link-displayer ul li {
        width: 180px; opacity: .5;
        padding: .5rem 0rem;
      }
      .nav-sub-link-displayer ul li:hover {
        opacity: 1;
      }
      .translate-right {
        transform: translateX(100%);
      }
      .translate-left {
        transform: translateX(-100%);
      }
      .translate-bottom {
        transform: translateY(100%);
      }
      .translate-top {
        transform: translateY(-100%); opacity: 0;
      }
      @keyframes remove-sub-link-displayer {
        to {
          height: 0px;
        }
      }
    `

    let submit_form_style = /*css*/`
      form {
        top: 9.5rem; right: 1rem; overflow: hidden;
        background-color: var(--gray-0);
        border-radius: 0px 15px 0px 15px;
        position: absolute;
        width: 540px; height: 420px;
        display: flex;
        box-shadow: 0px 4px 10px 1.5px var(--gray-1);
        transition: opacity .2s ease-out, transform .15s ease-in;
        border: 3px solid black;
      }
      form .nav {
        width: 30%;
        display: flex;
        flex-direction: column; background-color: var(--gray-0);
      }
      form .nav-item {
        width: 100%;
        height: 4rem; display: grid; place-items: center;
      }
      form .nav-item.selected {
        background-color: var(--gray-1);
      }
      form .nav-item.selected a {
        font-weight: bold; opacity: 1;
      }
      form .data-container {
        overflow: hidden;
        width: 70%; position: relative;
      }
      form .data-container .top {
        z-index: 3; 
        overflow-y: scroll; overflow-x: hidden;
        height: 93%; max-height: 93%;
        width: 100%;
        background-color: var(--gray-1);
        border-bottom-left-radius: 15px; position: relative;
      }
      form .data {
        padding: 2rem 0rem;
        transition: transform .2s ease-in, opacity .1s ease-in;
        display: flex; justify-content: center;
        flex-direction: column; gap: 1rem;
        width: 100%; height: fit-content; position: absolute;
      }
      form .section {
        padding: 0 2rem; 
        display: flex; flex-direction: column; justify-content: flex-start;
      }
      form .section label {
        font-weight: bold; opacity: 1; font-size: .75em; margin-bottom: 1rem;
      
      }
      form .section label:hover {
        opacity: 1;
      }
      form .radios {
        margin: 0 0 1rem 0rem; overflow-x: scroll;
        display: flex; gap: 1rem; align-items: center; text-align: center;
      }
      form .radios::-webkit-scrollbar {
        height: .5rem;
      }
      form .radios li {
        display: flex; gap: 5px;
      }
      form .section .radios label {
        margin: 0px;
        font-size: .75em;
      } 
      form input, form textarea {
        padding: .5rem 1rem; color: white;
        background-color: rgb(0 0 0 / 0);
        border: 1px solid rgb(255 255 255 / .25);
        font-size: 1.25em; font-weight: normal;
      }
      form input[type=text], form textarea {
        border-radius: 0 15px 0 15px;
      }
      form .input {
        width: 100%; height: 7%; display: grid; place-items: center;
        background-color: var(--gray-0);
        padding: 0px; margin: 0px; position: relative;
      }
      form input[type=button] {
        color: white; width: 100%; height: 100%;
        border: none; font-weight: 100; font-size: 1.25em; cursor: pointer;
        margin: 0px; padding: 0px;
      }
      form .ability-data {
        height: 100%;
      }
      form .ability-data .section {
        height: 100%;
      }
      form .ability-data textarea {
        height: 56%; margin-top: 1rem;
      }
      form .input::before {
        content: "";
        position: absolute;
        top: -40%; left: -100%;
        width: 100%; height: 140%;
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
        opacity: 1;
        transform: translateX(100%);
      }
      form .url {
        font-size: .75em;
      }
    `

    this.shadowRoot.innerHTML = /* html */`

      <style>
        ${main_style}
        ${submit_form_style}
      </style>

      <nav>
        <div class="nav-contents">
          <div><a id="nav-bar-add-card-anchor" href="">+</a></div>

          <ul>${links}</ul>
        </div>
        <div class="nav-sub-link-displayer"></div>

        <form action="#" class="hidden">

          <div class="nav">
            <div class="nav-item selected"><a href="#">MAIN</a></div>
            <div class="nav-item"><a href="#">ABILITY</a></div>
            <div class="nav-item"><a href="#">INDEX</a></div>
          </div>

          <div class="data-container">

            <div class="top">
              <div class="data main-data">
                <div class="section">
                  <label for="MOVIE">MOVIE</label>
                  <input type="text">
                </div>

                <div class="section">
                  <label for="QUOTE">QUOTE</label>
                  <textarea name="" id="" cols="30" rows="5"></textarea>
                </div>

                <div class="section">
                  <label for="CHARACTER">CHARACTER</label>
                  <input type="text">
                </div>

              </div>

              <div class="data ability-data translate-right">

                <div class="section">
                  <label for="ABILITY">ABILITY</label>
                  <input type="text" placeholder="name">
                  <textarea placeholder="description"></textarea>
                </div>

              </div>
              
              <div class="data index-data translate-right">

                <div class="section">
                  <label for="CATEGORY">CATEGORY *</label>
                  <ul class="radios wrapper">
                    ${this.formRadiosHTML ("categories")}
                  </ul>
                </div>

                <div class="section">
                  <label for="GENRE">GENRE *</label>
                  <ul class="radios wrapper">
                    ${this.formRadiosHTML ("genres")}
                  </ul>
                </div>
                
                <div class="section">
                  <label for="THEME">THEME (optional)</label>
                  <ul class="radios wrapper">
                    ${this.formRadiosHTML ("themes")}
                  </ul>
                </div>


                <div class="section url">
                  <label for="background-image">IMAGE</label>
                  <input type="text" placeholder="poster url / location">
                </div>

              </div>
            </div>
            

            <div class="input">
              <input type="button" value="submit">
            </div>
          </div>          
          
        </form>

      </nav>
    `

    this.createSubLinks ()

    this.query ("#nav-bar-add-card-anchor").onclick = this.openAddCardForm.bind (this)

    sub_link_displayer = this.query (".nav-sub-link-displayer")

    links = this.queryAll (".nav-contents ul li")

    links.forEach(link => {

      link.onclick = (e)=> {
        e.preventDefault ()
        if (this.hasClass ("selected", link)) this.removeClass ("selected", link)
        else {
          let last_link = this.sub_links.element

          this.sub_links.element = link
          this.sub_links.selected = link.textContent.toLowerCase ()
          
          if (last_link) this.removeClass ("selected", last_link)
          this.addClass ("selected", link)

          this.createSubLinks ()

          this.addClass ("active", sub_link_displayer)
        }
      }

      link.onmouseenter = ()=> {
        console.log (link)
        if (this.hasClass ("selected", link)) this.addClass ("active", sub_link_displayer)
      }
    })

    links = this.queryAll ("form .nav-item a")

    console.log(links);

    links.forEach(link => {
      link.onclick = (e)=> {
        let elem = e.target
        let currentLink = this.fromState ("current-link-form")
        let currentTab = this.fromState ("currentTab")
        let txt = elem.textContent.toLowerCase ()
        
        elem = elem.parentElement

        this.updateState ("current-link-form", elem)

        elem.classList.add ("selected")
        if (currentLink) currentLink.classList.remove ("selected")

        if (currentTab) {
          currentTab.classList.remove ("selected")
          currentTab.classList.add ("translate-top")
          setTimeout (()=> {
            
            currentTab.classList.add ("hidden")
            currentTab.classList.add ("translate-right")
            setTimeout (()=> {
              currentTab.classList.remove ("translate-top")
              setTimeout (()=> currentTab.classList.remove ("hidden"), 200)
            }, 100)
          
          }, 300)
          
        }
        elem = this.query (`.${txt}-data`)
        this.updateState ("currentTab", elem)
        elem.classList.remove ("translate-right")
      }
      if (link.textContent == "MAIN") link.click ()
    })

    this.query ("nav").onmouseleave = ()=> {
      if (this.hasClass ("selected", sub_link_displayer))
        sub_link_displayer.style.animation = "remove-sub-link-displayer .1s ease-in forwards"
      this.removeClass ("active", sub_link_displayer)
    }

    let form = this.query ("form")
    form.onmouseenter = ()=> {
      form.enterTime = Date.now ()
      form.classList.remove ("hidden")
      this.sendSignal ("add-blur-to-card-displayer")
    }
    form.onmouseleave = ()=> {

      setTimeout (()=> {
        if (Date.now () - form.enterTime >= 1000) 
          this.sendSignal ("remove-blur-from-card-displayer"),  
          form.classList.add ("hidden")
      }, 1500)
    }
  }
}

customElements.define ('nav-bar', NavBar)