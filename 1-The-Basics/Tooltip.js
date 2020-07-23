class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = this.getAttribute("tooltip-text");
    this._tooltipType = this.getAttribute("tooltip-type") || "question-circle";
    console.log(this._tooltipType);
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("i");
    tooltipIcon.classList.add("fa");
    tooltipIcon.classList.add(`fa-${this._tooltipType}`);
    console.log(tooltipIcon.classList);

    tooltipIcon.style.cursor = "pointer";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;

    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
