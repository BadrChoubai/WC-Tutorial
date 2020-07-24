class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
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
          background: #fefdfb;
          color: #0a171c;
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

          -webkit-box-shadow: 0 .3rem .8rem rgba(0,0,0,.12);
          -moz-box-shadow: 0 .3rem .8rem rgba(0,0,0,.12);
          box-shadow: 0 .3rem .8rem rgba(0,0,0,.12);
          
        }

        #modal > header {
          border-bottom: .2rem solid rgba(88,93,96,0.05);
          padding-left: 1rem;
        }

        #actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        #actions > ::slotted(button) {
          border: none;
          border-radius: .2em;
          color: #fff;
          font-size: 1em;
          cursor: pointer;
          margin: 1rem .8rem;
          padding: .4em 1.6em;
        }

        #actions ::slotted(button[slot="cancel-button"]) {
          background: #ed3b3b;
        }
        
        #actions ::slotted(button[slot="confirm-button"]) {
          background: #34a853;
        }

        #modal > #main {
          padding: 0 2rem;
          margin-bottom: 2rem;
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
          <slot name="cancel-button" id="cancel-button">Cancel</slot>
          <slot name="confirm-button" id="confirm-button">Confirm</slot>
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

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(event) {
    this.hide();
    const confirmEvent = new Event("confirm", {
      bubbles: true,
      composed: true,
    });
    event.target.dispatchEvent(confirmEvent);
  }
}

customElements.define("wc-modal", Modal);
