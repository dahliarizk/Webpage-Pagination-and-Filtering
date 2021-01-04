const studentsPerPage = 9;
const studentlist = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');
const h2 = document.querySelector('h2');


//this function creates an array of first and last names to be used for matching with search input in search bar.
function createNamesList(list){
  let names = [];
  for (let i = 0; i < list.length; i++) {
    names.push(list[i].name['first'] + ' ' + list[i].name['last'])
  }
  return names;
}

let searchNames = createNamesList(data);

//this HTML insertion creates the search bar as the header content.
header.innerHTML = '';
header.insertAdjacentHTML('beforeend',
   `<h2>Students</h2>
    <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>`)


//this function searches the SearchNames array when the search button is clicked.
//it pushes matches into new array called 'matches'. the following if/else clause
//takes the matches array and displays results accordingly. it then needs an
//additional event listener for any buttons generated for search results to page
//through the matches array, not the data array.
function searchStudents(list) {
  let input = document.querySelector('input')
  const searchImg = document.querySelector('img');
  searchImg.addEventListener('click', (e) => {
  let matches = []
  let page;
  for (let i = 0; i < searchNames.length; i++) {
        if (input.value.length > 0 && searchNames[i].toLowerCase().includes(input.value.toLowerCase())){
          matches.push(list[i]);
        }
      }
  if (matches.length === 0) {
      studentlist.innerHTML =
        `<h3>Your search did not return any results. Please try again. </h3>`
        input.value = '';
      linkList.innerHTML = '';
  } else if (matches.length > 0) {
      showPage(matches, 1);
      addPagination(matches);
      input.value = '';
    }

  linkList.addEventListener('click', (e) => {
    const buttons = document.querySelectorAll('button');
    if (e.target.tagName === 'BUTTON') {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
  } e.target.classList.add('active');
      const page = e.target.textContent;
      showPage(matches, page)
    }
  });
});
};


//this function appends HTML to the studentlist variable by looping through the list array.
//this adds dynamic data according to the key-value pairs of each student object.
function showPage(list, page) {
  const startIndex = (page * studentsPerPage) - studentsPerPage;
  const endIndex = (page * studentsPerPage);
  studentlist.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      studentlist.insertAdjacentHTML('beforeend', `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src='${list[i].picture['thumbnail']}' alt="Profile Picture">
          <h3>${list[i].name['first'] + " " + list[i].name['last']}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">${list[i].registered['date']}</span>
        </div>
      </li>`
          )
        }
      }
    };

//this function adds the pagination buttons by appending one button as an li to each set of
//*studentsPerPage*. sets the first button as 'active'.
    function addPagination(list) {
      const numberOfButtons = Math.ceil(list.length / studentsPerPage)
      //let li = document.createElement('li');
      linkList.innerHTML = '';
      for (let i = 0; i < numberOfButtons; i++ ){
        linkList.insertAdjacentHTML('beforeend', `
        <li>
          <button type="button" class= >${i+1}</button>
        </li>`)
      }
    linkList.firstElementChild.firstElementChild.className = 'active'
  };

//event listener for paging through the selected set of students when one of the buttons is clicked.
    linkList.addEventListener('click', (e) => {
      const buttons = document.querySelectorAll('button');
      if (e.target.tagName === 'BUTTON') {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('active');
    } e.target.classList.add('active');
        const page = e.target.textContent;
        showPage(data, page)
      }
    });

searchStudents(data);
showPage(data,1);
addPagination(data);
