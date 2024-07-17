import icons from 'url:../../img/icons.svg';

import View from './view';

class PageinationView extends View {
  _parenEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parenEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generatMarkUp() {
    const currentPage = this._data.page;
    const NumPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    //page 1  and other page
    if (currentPage === 1 && NumPages > 1) {
      return `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //page last
    if (currentPage === NumPages && NumPages > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }

    //other page
    if (currentPage < NumPages && NumPages > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>;
      `;
    }

    //page1, no other page
    return '';
  }
}

export default new PageinationView();
