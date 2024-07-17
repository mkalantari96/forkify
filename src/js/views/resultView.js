import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parenEl = document.querySelector('.results');
  _errorMessage = 'no recipes found for your query! please try again';
  _message;

  _generatMarkUp() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
