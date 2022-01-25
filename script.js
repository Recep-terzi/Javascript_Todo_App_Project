// UI vars

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

// load items
loadItems();

eventListeners();
function eventListeners()
{
    // submit event
    form.addEventListener("submit",addNewItem);
    // delete an item
    taskList.addEventListener("click",deleteItem);

    btnDeleteAll.addEventListener("click",deleteAllItems);
}

function createItem(text)
{
     // create li
     const li = document.createElement("li");
     li.className='list-group-item list-group-item-secondary';
     li.appendChild(document.createTextNode(text));
 
     // create a
     const a = document.createElement("a");
     a.className = "delete-item float-right";
     a.setAttribute=("href","#");
     a.innerHTML=('<i class ="fas fa-times"></i>')
 
     // a append to li
     li.appendChild(a);
     // li append to taskList
     taskList.appendChild(li);
}
function addNewItem(e)
{
    if(input.value === '')
    {
        alert("Görev Giriniz.");
    }
   
    createItem(input.value);

    setItemToLocalStorage(input.value);

    // clear input
    input.value = "";

    // call event listeners
    e.preventDefault();
}

function deleteItem(e)
{
    if(e.target.className === "fas fa-times")
    {
        e.target.parentElement.parentElement.remove();

        // delete item from localstroge
        deleteItemFromLocalStorage(e.target.parentElement.parentElement.textContent);


    }
    e.preventDefault();
}

function deleteAllItems(e)
{
    taskList.innerHTML='';
    localStorage.clear();
    e.preventDefault();
}

function loadItems()
{
    items = getItemsFromLocalStorage();
    items.forEach(function(item){
        createItem(item);
    })
}

function getItemsFromLocalStorage(){
    if(localStorage.getItem('items') == null)
    {
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLocalStorage(text)
{
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemFromLocalStorage(text)
{
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index){
        if(item === text)
        {
            items.splice(index,1);
        } 
    });
    localStorage.setItem('items',JSON.stringify(items));
}