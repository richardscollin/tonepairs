(function () {
  let template = document.createElement('template');
  template.innerHTML = `
  <div class="x-banner">
    <h2 class="left"></h2>
    <a class="right" target="_blank" >About</a>
  </div>
  <style>
  .x-banner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;

    background: black;
    box-shadow: 0px 0px 5px 2px #ccc;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    margin: 15px;
    color: white;
  }

  .right {
    color: white;
    margin: 15px;
    text-decoration: none;
  }

  </style>`;

  customElements.define('x-banner', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      this.update();
    }
    update() {
      const left = this.shadowRoot.querySelector('.left');
      const right = this.shadowRoot.querySelector('.right');
      left.textContent = this.getAttribute('title') || "";
      right.href = this.getAttribute('href') || "#";
      right.textContent = "About";
    }
  });
})();
