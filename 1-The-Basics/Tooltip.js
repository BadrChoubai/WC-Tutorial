const template = document.createElement("template");

class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div#tooltip-container {
          background-color: #fefefe;
          border: 1px solid #fff;
          border-radius: .8rem;
          box-shadow: 0 .3rem .8rem rgba(0,0,0,.12);
          display: inline;
          font-size: .6em;
          margin-left: 1rem;
          padding: .8em;
        }
      </style>
      <slot>Default</slot>
      <span> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("tooltip-text")) {
      this._tooltipText = this.getAttribute("tooltip-text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");

    tooltipIcon.style.cursor = "pointer";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
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
