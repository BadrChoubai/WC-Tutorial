class ToggleButton extends HTMLElement {
  constructor() {
    super();
    this._targetElement; // This is passed in as a DOM elements 'id (#)' or 'class (.)'
    this._targetElementHidden = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            button {
                border: none
            }

            button#toggle-button {
                background: #f5f5f3;
                border: solid 4px #f04e23;
                box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.12);
                border-radius: .2em;
                color: #f04e23;
                cursor: pointer;
                font-family: "Avenir";
                font-size: 2rem;
                padding: .2em 1rem;

                transition: box-shadow ease-in-out 200ms;
            }

            button#toggle-button:hover {
                box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.24);
            }

        </style>

        <button id="toggle-button">TOGGLE</button>
    `;
  }

  connectedCallback() {
    if (this.getAttribute("target-element")) {
      this._targetElement = this.parentElement.querySelector(
        `#${this.getAttribute("target-element")}`
      )
        ? this.parentElement.querySelector(
            `#${this.getAttribute("target-element")}`
          )
        : this.parentElement.querySelector(
            `.${this.getAttribute("target-element")}`
          );
    }

    this._targetElement.style.display = this._targetElementHidden
      ? "none"
      : "block";

    this.shadowRoot
      .querySelector("#toggle-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this._hideTargetElement();
      });
  }

  _hideTargetElement() {
    this._targetElementHidden = !this._targetElementHidden;
    this._targetElement.style.display = this._targetElementHidden
      ? "none"
      : "block";
  }
}

customElements.define("wc-toggle-button", ToggleButton);
