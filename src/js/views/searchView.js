class SearchView {
  _parenEl = document.querySelector('.search');

  getQuery() {
    const query = this._parenEl.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }

  clearInput() {
    this._parenEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handlerFun) {
    this._parenEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handlerFun();
    });
  }
}

export default new SearchView();
