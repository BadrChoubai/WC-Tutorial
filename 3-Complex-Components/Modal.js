class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          background: rgba(0, 0, 0, 0.72);
          height: 400px;
          position: absolute;
          left: 50%;
          margin-left: -400px;
          opacity: 0;
          pointer-events: none;
          width: 800px;
          z-index: 10;
        }

        #modal {
          background: salmon;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          left: 50%;
          margin-left: -300px;
          margin-top: 2rem;
          opacity: 0;
          pointer-events: none;
          position: fixed;
          width: 600px;
          z-index: 100;

          -webkit-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.75);
        }

        #modal > header {
          color: #fefefe;
          text-shadow: 1px 1px 1px #333;
          padding-left: 1rem;
        }

        #actions {
          border-top: solid 1px #333;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        #actions > button {
          margin: 1rem .8rem;
          cursor: pointer;
        }

        #modal > #main {
          color: #fefefe; 
          padding: 0 2rem;
          margin-bottom: 2rem;
          text-shadow: 0 .1em 3px #333;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <header>
         <slot name="header"></slot>
        </header>
        <section id="main">
          <slot name="message"></slot>
        </section>
        <section id="actions">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Confirm</button>
        </section>
      </div>
    `;

    const cancelButton = this.shadowRoot.querySelector("#cancel-button");
    const confirmButton = this.shadowRoot.querySelector("#confirm-button");

    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel() {
    this.hide();
  }

  _confirm() {
    this.hide();
  }
}

customElements.define("wc-modal", Modal);
