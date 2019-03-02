(function () {
  let template = document.createElement('template');
  template.innerHTML = `
  <div class="flash-card">
    <span class="flash-card-title"></span>
    <span class="flash-card-text"></span>
    <div class="flash-card-label"></div>
    <button class="flash-card-back">back</button>
  </div>
  <style>
  .flash-card {
    background-color: rgba(0,0,0,.05);
    width: 200px;
    border-radius: 10px;
    border: 2px;
    box-shadow: 0px 0px 5px 2px #ccc;

    margin: 0;
    padding: 0;

    position:relative;

    display: flex;
    justify-content:center;
    align-content:center;
    flex-direction:column; 
    text-align: center;
  }
  .flash-card-title {
    font-size: 50px;
    padding-top: 10px;
  }
  .flash-card-text {
    font-size: 25px;
    padding-bottom: 10px;
  }
  .flash-card-label:hover {
    cursor: pointer;
  }
  .flash-card-label {
    color: blue;
    font-size: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .flash-card-back:hover {
    cursor: pointer;
  }
  .flash-card-back {
    color: blue;
    font-size: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  </style>`;

  customElements.define('flash-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      this.update();
      const back = this.shadowRoot.querySelector(".flash-card-back");
      back.onclick = (e) => {
        this.back();
        this.update();
        e.stopPropagation();
      }
      const label = this.shadowRoot.querySelector(".flash-card-label");
      label.onclick = (e) => {
        this.type = this.altType;
        this.update();
        e.stopPropagation();
      }
    }
    update() {
      const title = this.shadowRoot.querySelector(".flash-card-title");
      const label = this.shadowRoot.querySelector(".flash-card-label");
      const text = this.shadowRoot.querySelector(".flash-card-text");
      title.textContent = this.getAttribute(this.type) || "";
      text.textContent = this.getAttribute("pinyin") || "";
      label.textContent = this.altType.substring(0,4) + ".";
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
