class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("i");
    tooltipIcon.classList.add("fa", "fa-question");
    tooltipIcon.style.cursor = "pointer";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "toolTip Text";

    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
