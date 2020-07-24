class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          background: rgba(0, 0, 0, 0.75);
          height: 50vh;
          position: absolute;
          left: 50%;
          margin-left: -400px;
          width: 800px;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal"></div>
    `;
  }
}

customElements.define("wc-modal", Modal);
