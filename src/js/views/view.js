import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generatMarkUp();
    if (!render) return markup;
    this._clear();
    this._parenEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generatMarkUp();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // console.log('newDom', newDom);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    // console.log('newEle', newElement);
    const currentElement = Array.from(this._parenEl.querySelectorAll('*'));
    // console.log('cureEle', currentElement);
    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];

      //update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //update change attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parenEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._parenEl.innerHTML = '';
    this._parenEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;

    this._clear();
    this._parenEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;

    this._clear();
    this._parenEl.insertAdjacentHTML('afterbegin', markup);
  }
}
