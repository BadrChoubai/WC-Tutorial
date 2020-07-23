class Confirmlink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm(`You will be redirected to ${this.getAttribute("href")}`)) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("wc-a-confirmation", Confirmlink, { extends: "a" });
