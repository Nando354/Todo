
//------------------Variables
const newList = document.getElementById('newList');
const newListFormItem = document.getElementById('form')
const listFormInp = document.getElementById('listAddButton')




//---------------------------------

let listArrs = [];
let listObj = {};



//-----------------Event Listeners

//Set up Todo List Form Textarea to add value to ul, add remove and edit buttons

newListFormItem.addEventListener('submit', e => { 
  e.preventDefault();
  // console.log(liSpanClassNode)
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

  //--inner event function -- remove li item with x button
  removeBtn.addEventListener('click', function(ev){
    ev.target.parentNode.remove();
  });

  //ul append li with button to remove
  newList.appendChild(li)
  //add edit button, button to be pressed when editing
  const editButton = document.createElement('button');
  editButton.classList = 'editList';
  editButton.innerText = 'Edit';
  //add edit button to li
  li.appendChild(editButton);

  //Inner event function -- text entered in span within list to be editable
  editButton.addEventListener('click', function(ev2){
    let  editLiText = ev2.target.parentNode.firstChild
    editLiText.contentEditable = true;
    //edit text is set to focus so you can see the box glow when in edit mode
    editLiText.focus();
    editButton.style.borderStyle = 'inset';
    //Inner of Inner event function -- able to edit then press enter to no longer focus off of enter keydown
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

  //Notes: Create todo details title from todo list then add the list fields
  //1. create a card for every li item
  //2. edit every task li item title
  //3. Do not process title change when edit button is clicked
  //Now i get the title but it stays Need to figure out how to reset it when it is edited but leave it clickable too, thinking maybe a new card pops up every time there is a change. So create new card.
  // When the list item is clicked this needs to happen
  // 1. create a card for every li item
  // 2. do not create a new card during li item edit mode only on return and if value is different from original
  // 3. title update on card according to li item

  //-----------Task List Details---
  
 
  
  // liSpan.addEventListener('click', setCard);

  // set title of list on list Details
  // liText.addEventListener('click', setTitle);

  //Inner function -- SET UP TASK CARD
  liSpan.addEventListener('click', function(ev4){


    //Create container div
    const taskCont = document.createElement('div');
    taskCont.classList.add('container', 'container4');

    //-----TASK TITLE
    //Create h2 task title
    let taskLiTitle = document.createElement('h2');
    taskLiTitle.id = "title"
    taskLiTitle.innerText = listFormTxt;
    taskCont.appendChild(taskLiTitle);

    //TASK FORM DIV
    //Create task form Div
    const taskFormDiv = document.createElement('div');
    taskFormDiv.classList.add = 'taskForm';
    taskCont.appendChild(taskFormDiv);

    //-----TASK FORM
    //Create task form
    const taskForm = document.createElement('form');
    taskForm.setAttribute('action', '#');
    taskForm.classList.add = 'form';
    taskFormDiv.appendChild(taskForm);
   
    //Create textarea
    let taskText = document.createElement('TEXTAREA');
    taskText.id = 'taskFormTxt';
    taskForm.appendChild(taskText);

    //Create input button
    const taskButton = document.createElement('button');
    taskButton.id = 'taskAddButton';
    taskButton.setAttribute('type', 'submit')
    taskButton.setAttribute('value', '+')
    taskButton.innerText = '+';
    taskForm.appendChild(taskButton);
    //End TASK FORM DIVDFD

    //Create tasks div
    const taskDiv = document.createElement('div')
    taskDiv.classList.add = 'tasks';
    taskCont.appendChild(taskDiv);

    // Create ul
    taskUl = document.createElement('ul');
    taskUl.id = 'newTask';
    taskDiv.appendChild(taskUl);

    //Create li
    taskLi = document.createElement('li');
    taskUl.appendChild(taskLi);

    document.body.appendChild(taskCont)

  })    
})
  



  //Note: Add details to the todo
  // 1. grab the list span class and make it a clickable event area that will allow me to input details in the todo details section.

  // eventListeners();

  // function eventListeners(){

  //   document.querySelector('#newList').addEventListener('click', listDetail);
  // }

  // function listDetail(ev4) {
  //   console.log("hello")
  // }

// function getNodes() {
//   var ch = newList.getElementsByClassName(liSpanClass).childNodes
//   console.log(document.getElementsByClassName('spanClass')[0])
// }





  // liSpanClass.addEventListener('click', ev4 => {
  //   ev4.preventDefault();
  //   console.log(ev4.target)
  //   // console.log(document.getElementById('newTask'));
  // })


//Difference btw innerText, innerHTML



// function eventListeners(){
//     //list submission
//     document.querySelector('#form').addEventListener('submit', newListItem);
//   }
    // //remove from form
    // listArea.addEventListener('click', removeListItem);

 

//-----------------Functions