import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button class="btn-inline btn--pagination">Pages: ${numPages}</button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next btn--pagination_start">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          
      `;
    }
    // Other page
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn-inline btn--pagination">Remains: ${
            numPages - curPage
          }</button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';

    // *Refactor try*
    // let direction;
    // let arrowDirection;
    // let page;

    // if (curPage === 1 && numPages > 1) {
    //   direction = 'next';
    //   arrowDirection = 'right';
    //   page = curPage + 1;
    // }
    // if (curPage === numPages && numPages > 1) {
    //   direction = 'prev';
    //   arrowDirection = 'left';
    //   page = curPage - 1;
    // }
    // if (curPage < numPages) {
    //   return `
    //   <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page ${curPage - 1}</span>
    //       </button>
    //       <button class="btn--inline pagination__btn--next">
    //         <span>Page ${curPage + 1}</span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //       </button>
    //   `;
    // }

    // return `
    //   <button class="btn--inline pagination__btn--${direction}">
    //         <span>Page ${page}</span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-${arrowDirection}"></use>
    //         </svg>
    //       </button>
    //   `;
  }
}

export default new PaginationView();
