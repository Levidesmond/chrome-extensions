// The first line creates an empty array called myLeads which will be used later to store website links
let myLeads = [];

//The next four lines of code create variables that store references to different HTML elements on the page
//(an input field, a button, an unordered list, and another button).
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("del-el");
//This next line of code retrieves any previously saved website links from local storage and stores
//them in the leadsFromLocalStorage variable.
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

//If there are any saved website links, they are added to the myLeads array and then displayed on the page
//using the render function.

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
/*  

The next block of code listens for a click event on the second button (tabBtn). 
When clicked, it retrieves the URL of the currently active tab in the user’s 
browser and adds it to the myLeads array. 
The updated array is then saved back to local storage and displayed on the page 
using the render function.

*/
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
/* 
The render function takes an array of website links as an argument and generates HTML code 
that displays each link as a clickable hyperlink in an unordered list.
*/
function render(Leads) {
  let listItems = "";

  for (let i = 0; i < Leads.length; i++) {
    listItems += `
        <li>
            <a target='-blank' href='${Leads}'>
                ${Leads[i]}
            </a>
        </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

/*  
Finally, there’s another event listener that listens for a double-click event 
on the first button (deleteBtn). When double-clicked, it clears all saved website 
links from local storage, empties the myLeads array, 
and updates the display using the render function.
*/

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];

  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value !== "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});
