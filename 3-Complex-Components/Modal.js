class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          background: rgba(0, 0, 0, 0.72);
          height: 400px;
          position: absolute;
          left: 50%;
          margin-left: -400px;
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
          text-shadow: 0 .1em 3px #333;
        }

      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h1>Please Confirm</h1>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Confirm</button>
        </section>
      </div>
    `;
  }
}

customElements.define("wc-modal", Modal);
