# Techdegree-Project-2
Pagination and Filtering
by Dahlia Rizk

features a showPage function, an addPagination function, and a searchStudents function. 
showPage function displays students on the page by mapping list items to attributes in a data object (located in data.js file)

addPagination function displays buttons with page numbers according to the corresponding students per page. 
accompanying event listener sifts through the students depending on the page button clicked.

searchStudents function examines search input in the search bar, and compares it to array for student names. 
it then displays results according to showPage and addPagination functions. if no results, will display a message. 

