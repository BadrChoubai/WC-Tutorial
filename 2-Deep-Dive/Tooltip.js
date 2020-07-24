const template = document.createElement("template");

class ToolTip extends HTMLElement {
  static get observedAttributes() {
    return ["tooltip-text"];
  }

  constructor() {
    super();
    this._tooltipContainer;
    this._toolTipIcon;
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
          position: absolute;
          z-index: 1;
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
    this._toolTipIcon = this.shadowRoot.querySelector("span");

    this._tooltipIcon.style.cursor = "pointer";
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(tooltipIcon);
  }

  disconnectedCallback() {
    this._toolTipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._toolTipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.id = "tooltip-container";
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
