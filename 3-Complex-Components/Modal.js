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
          z-index: 10;
        }

        #modal {
          background: salmon;
          height: 20rem;
          left: 50%;
          margin-left: -300px;
          margin-top: 2rem;
          position: fixed;
          width: 600px;
          z-index: 100;
          border-radius: 1rem;
          -webkit-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal"></div>
    `;
  }
}

customElements.define("wc-modal", Modal);
