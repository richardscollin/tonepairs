(function () {
  let template = document.createElement('template');
  template.innerHTML = `
  <div class="flash-card-wrapper">
    <div class="flash-card">
      <a href="#" class="flash-card-title"></a>
      <span class="flash-card-text"></span>
      <span class="flash-card-english"></span>
      <div class="flash-card-label"></div>
    </div>
    <div class="flash-card-ui">
      <button class="flash-card-back nav-icon">
        <svg viewBox="0 0 100 100"><polygon points="0 50, 80 100, 80 0"/></svg>
      </button>
      <span class="flash-card-index-label"></span>
      <button class="flash-card-next nav-icon">
        <svg viewBox="0 0 100 100"><polygon transform="rotate(180, 50, 50)" points="0 50, 80 100, 80 0"/></svg>
      </button>
    </div>
  </div>
  <style>
  .flash-card {
    position:relative;
    width: 300px;
    height: 175px;

    background-color: rgba(0,0,0,.05);
    border-radius: 10px;
    border: 2px;
    box-shadow: 0px 0px 5px 2px #ccc;

    margin: 0;
    padding: 0;
    display: flex;
    justify-content:center;
    align-content:center;
    flex-direction:column; 
    text-align: center;
  }
  .flash-card-title {
    margin-top: 10px;
    font-size: 75px;

    text-decoration: none;
    color: black;
  }
  .flash-card-text {
    margin-bottom: 10px;
    font-size: 25px;
  }
  .flash-card-english {
    margin-bottom: 10px;
    font-size: 25px;
  }
  .flash-card-label:hover {
    cursor: pointer;
  }
  .flash-card-label {
    position: absolute;
    bottom: 10px;
    left: 10px;

    color: blue;
    font-size: 10px;
  }
  .flash-card-ui {
    margin-top: 10px;
    height: 50px;

    display: flex;
    justify-content:center;
    align-content: center;
    align-items: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none;
  }
  .flash-card-index-label {
    margin: 0 15px;
  }
  .nav-icon::-moz-focus-inner {
    border: none;
  }
  .nav-icon:focus {
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 0 2px black;
    outline: 0;
  }
  .nav-icon {
    width: 50px;
    height: 50px;

    background-color: #ccc;
    border-radius: 50%;
    border: none;
  }
  </style>`;

  customElements.define('flash-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      this.update();
      const next = this.shadowRoot.querySelector(".flash-card-next");
      next.onclick = (e) => {
        this.next();
        this.update();
        e.stopPropagation();
      };
      const back = this.shadowRoot.querySelector(".flash-card-back");
      back.onclick = (e) => {
        this.previous();
        this.update();
        e.stopPropagation();
      };
      const label = this.shadowRoot.querySelector(".flash-card-label");
      label.onclick = (e) => {
        this.type = this.altType;
        this.update();
        e.stopPropagation();
      };
    }
    update() {
      const title = this.shadowRoot.querySelector(".flash-card-title");
      const label = this.shadowRoot.querySelector(".flash-card-label");
      const text = this.shadowRoot.querySelector(".flash-card-text");
      const english = this.shadowRoot.querySelector(".flash-card-english");
      const indexLabel = this.shadowRoot.querySelector(".flash-card-index-label");
      indexLabel.textContent = `${this.index + 1}`
      title.textContent = this.getAttribute(this.type) || "";
      text.textContent = this.pinyin;
      english.textContent = this.english;
      let encoded = encodeURIComponent(this.getAttribute(this.type));
      title.href = `plecoapi://x-callback-url/s?q=${encoded}&mode=df&hw=${encoded}`;
      label.textContent = this.altType.substring(0,4) + ".";
    }
    next() {
      this.index = Math.min(this.index + 1, deck.length - 1);
      this.fill();
    }
    previous() {
      this.index = Math.max(this.index - 1, 0);
      this.fill();
    }
    fill() {
      let card = deck[this.index];
      this.simplified = card[0];
      this.traditional = card[1];
      this.pinyin = card[2];
      this.english = card[3];
    }
    get index() {
      return parseInt(this.getAttribute("index") || "0");
    }
    set index(value) {
      this.setAttribute("index", value);
    }
    get type() {
      return this.getAttribute("type") || "";
    }
    set type(value) {
      this.setAttribute("type", value);
    }
    get altType() {
      return this.type == "traditional" ? "simplified" : "traditional";
    }
    get traditional() {
      return this.getAttribute("traditional") || "";
    }
    set traditional(value) {
      this.setAttribute("traditional", value);
    }
    get simplified() {
      return this.getAttribute("simplified") || "";
    }
    set simplified(value) {
      this.setAttribute("simplified", value);
    }
    get pinyin() {
      return this.getAttribute("pinyin") || "";
    }
    set pinyin(value) {
      this.setAttribute("pinyin", value);
    }
    get english() {
      return this.getAttribute("english") || "";
    }
    set english(value) {
      this.setAttribute("english", value);
    }
  });
})();
