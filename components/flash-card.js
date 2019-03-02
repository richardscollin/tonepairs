(function () {
  let template = document.createElement('template');
  template.innerHTML = `
  <div class="flash-card-wrapper">
    <div class="flash-card">
      <span class="flash-card-title"></span>
      <span class="flash-card-text"></span>
      <div class="flash-card-label"></div>
    </div>
    <div class="flash-card-ui">
      <button class="flash-card-back nav-icon"><span>◀</span></button>
      <span class="flash-card-index-label"></span>
      <button class="flash-card-next nav-icon"><span>▶</span></button>
    </div>
  </div>
  <style>
  .flash-card {
    position:relative;
    width: 200px;
    height: 125px;

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
    font-size: 50px;
  }
  .flash-card-text {
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
    align-items: baseline;
  }
  .flash-card-index-label {
    margin: 0 15px;
  }
  .nav-icon {
    width: 30px;
    height: 30px;
    font-size: 20px;

    background-color: #ccc;
    border: none;
    box-shadow: 0px 0px 1px 3px #ccc;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flash-card-back > span {
    position: relative;
    bottom: .1em;
    right: .1em;
  }
  .flash-card-next > span {
    position: relative;
    bottom: .1em;
    left: .1em;
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
      const card = this.shadowRoot.querySelector(".flash-card");
      card.onclick = next.onclick = (e) => {
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
      const indexLabel = this.shadowRoot.querySelector(".flash-card-index-label");
      indexLabel.textContent = `${this.index + 1}`
      title.textContent = this.getAttribute(this.type) || "";
      text.textContent = this.getAttribute("pinyin") || "";
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
    }
    get index() {
      return parseInt(this.getAttribute("index"));
    }
    set index(value) {
      this.setAttribute("index", value);
    }
    get type() {
      return this.getAttribute("type");
    }
    set type(value) {
      this.setAttribute("type", value);
    }
    get altType() {
      return this.type == "traditional" ? "simplified" : "traditional";
    }
    get traditional() {
      return this.getAttribute("traditional");
    }
    set traditional(value) {
      this.setAttribute("traditional", value);
    }
    get simplified() {
      return this.getAttribute("simplified");
    }
    set simplified(value) {
      this.setAttribute("simplified", value);
    }
    get pinyin() {
      return this.getAttribute("pinyin");
    }
    set pinyin(value) {
      this.setAttribute("pinyin", value);
    }
  });
})();
