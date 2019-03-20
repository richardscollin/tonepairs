<template id="banner-template">
  <div class="x-banner">
    <h2 class="left"></h2>
    <a
      class="right"
      target="_blank"
      rel="noreferrer"
    >About</a>
  </div>
</template>

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
</style>

<script>
window.addEventListener('load', () => {
  customElements.define('x-banner', class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.update();
    }
    update() {
      let template = document.querySelector('#banner-template').content.cloneNode(true);
      const left = template.querySelector('.left');
      const right = template.querySelector('.right');
      left.textContent = this.getAttribute('title') || "";
      right.href = this.getAttribute('href') || "#";
      right.textContent = "About";

      this.appendChild(template);
    }
  });
});
</script>
