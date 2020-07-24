const template = document.createElement("template");

class ToolTip extends HTMLElement {
  static get observedAttributes() {
    return ["tooltip-text"];
  }

  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div#tooltip-container {
          background-color: #fefefe;
          border: 1px solid #fff;
          border-radius: .8rem;
          box-shadow: 0 .3rem .8rem rgba(0,0,0,.12);
          display: inline;
          font-size: inherit;
          margin-left: 1rem;
          padding: .8em;
          position: inherit;
          z-index: 1;
        }

        :host {
          position: relative;
        }
      </style>

      <slot>Default</slot>
      <span class="icon">?</span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "tooltip-text") {
      this._tooltipText = newValue;
    }
  }

  connectedCallback() {
    if (this.hasAttribute("tooltip-text")) {
      this._tooltipText = this.getAttribute("tooltip-text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");

    this._tooltipIcon.style.cursor = "pointer";
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this._render();
  }

  disconnectedCallback() {
    this._toolTipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._toolTipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("#tooltip-container");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.id = "tooltip-container";
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("wc-tooltip", ToolTip);
