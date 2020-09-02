
//------------------Variables
const newList = document.getElementById('newList');
const newListFormItem = document.getElementById('form')
const listFormInp = document.getElementById('listAddButton')

let listArrs = [];
let listObj = {};



//-----------------Event Listeners
// eventListeners();

// function eventListeners(){
//   //Form Submission
//   document.querySelector('#form').addEventListener('submit', newListItem);
// }

  //Step 1. Submit the form for array of objects to be updated in js 
newListFormItem.addEventListener('submit', e => { 
  e.preventDefault();
  //gets value from text area in form
  const listFormTxt = document.getElementById('listFormTxt').value;
  //Get li element
  const li = document.createElement('li')
  //create span in li
  liSpan = document.createElement('SPAN');
  li.appendChild(liSpan);
  liSpan.innerText = listFormTxt;
  //add classname to span
  liSpan.classList = 'spanClass'
  //clear text area
  const clearTxt = document.getElementById('listFormTxt')
  clearTxt.value="";
  //Create the remove button
  const removeBtn = document.createElement('button');
  removeBtn.classList = 'removeList';
  removeBtn.innerText = 'x';
  li.appendChild(removeBtn);
  //inner event function remove li item
  removeBtn.addEventListener('click', function(ev){
    console.log(document.getElementsByClassName('removeList')[0]);
    console.log(ev);
    // document.getElementsByClassName('removeList')[0].parentNode.remove();
    ev.target.parentNode.remove();
    console.log("hi")
  });
  //ul append li with button to remove
  newList.appendChild(li)
  //add edit button, button to be pressed when editing
  const editButton = document.createElement('button');
  editButton.classList = 'editList';
  editButton.innerText = 'Edit';
  //add edit button to li
  li.appendChild(editButton);
  //Inner event function text entered in span within list to be editable
  editButton.addEventListener('click', function(ev2){
    let  editLiText = ev2.target.parentNode.firstChild
    editLiText.contentEditable = true;
    //edit text is set to focus so you can see the box glow when in edit mode
    editLiText.focus();
    editButton.style.borderStyle = 'inset';
    //able to edit then press enter to no longer focus off of enter keydown
    editLiText.addEventListener ("keydown", function(ev3){
      if(ev3.keyCode === 13) {
        ev3.preventDefault();
        //removes focus on list item
        editLiText.contentEditable = false;
        //removes borderstyle to show released edit button
        editButton.style.borderStyle = 'none';
      }
    })
  })  
  
  //from the focus if you hit enter key the list is no longer in edit mode.



  })
// })


//Difference btw innerText, innerHTML



// function eventListeners(){
//     //list submission
//     document.querySelector('#form').addEventListener('submit', newListItem);
//   }
    // //remove from form
    // listArea.addEventListener('click', removeListItem);

 

//-----------------Functions

//Step 2. Renders the todo list li's in js for ul to show in dom for todo list
function render(){
  //calls function to prevent list items from duplicating
  clearElement(newList)
  listArrs.forEach(listArr => {
    //create li element
    const li = document.createElement('li')
    //assigns id to li
    li.dataset.listId = listArr.id
    //adds class to li
    li.classList.add("liName")
    //adds object name property to li
    li.innerText = listArr.name
    //attaches li to id newlist
    newList.appendChild(li)

  })
}

//remove duplicate items when forEach  used
function clearElement(element){
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}


render();



function createLi(name){
  return { id: Date.now().toString(), name: name, tasks: [] }
}


  

  // function newListItem(e) {
  //   e.preventDefault();
  
  //   //Read text area value entered
  //   const listFormTxt = document.getElementById('listFormTxt').value;
  //   //Place in new list as an li
  //   const li = document.createElement('li');
  //   li.textContent = listFormTxt;
  //   const newList = document.getElementById("newList").appendChild(li);
  //   //Remove  text from form once button is clicked
  //   const clearTxt = document.getElementById("listFormTxt").value =''; 
  // };


 