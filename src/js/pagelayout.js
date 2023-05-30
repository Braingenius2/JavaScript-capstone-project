import showCards from './showcards.js';
import addHeader from './addheader.js';
import addFooter from './addFooter.js';


const pageLayout = () => {
  const mainContainer = document.querySelector('.main-container');

  addHeader();
  showCards(mainContainer);
  addFooter();
};

export default pageLayout;