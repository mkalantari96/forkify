import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //updete result
    resultView.update(model.getSearchReusltPage());
    //loading recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    //render

    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //get search query
    const query = searchView.getQuery();

    if (!query) return;
    //load data
    await model.loadSearchResult(query);

    //render Result
    resultView.render(model.getSearchReusltPage(1));
    //render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //render Result
  resultView.render(model.getSearchReusltPage(goToPage));
  //render pagination
  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  model.updateServing(newServing);
  recipeView.update(model.state.recipe);
};

const controlAddRemoveBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  //bookmarks render
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();
    //upload recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //display suscc message
    addRecipeView.renderMessage();

    //render bookmark
    bookmarkView.render(model.state.recipe);

    //change id url
    window.history.pushState(null, '', `#${model.state.recipe}`);
    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateService(controlServing);
  recipeView.addHandlerAddBookmark(controlAddRemoveBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
///////////////////////////////////////
init();
