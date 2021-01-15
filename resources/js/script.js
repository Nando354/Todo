

//------------------Variables
const newList = document.getElementById('newList');//Todo list <ul> id
const newTask = document.getElementById('newTask');//Task list <ul> id
const newListFormItem = document.getElementById('todoForm');//Todo Form id
// const newTaskFormItem = document.getElementById('taskForm');

//===================Date==============
shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let d = new Date();
let dStr = d.toISOString(); //format: 2020-09-11T16:10:56.611Z
let dStrShort = d.toISOString().substring(0, 10); // format: 2020-09-11

function newDateForm(today){
  today = d;
  let dStrShort = d.toISOString().substring(0, 10); // format: 2020-09-11
  let mnth = shortMonths[dStrShort.substring(5, 7)-1];
  let dia = dStrShort.substring(8, 10)
  let ano = dStrShort.substring(0, 4);
  return mnth+" "+dia+", "+ano
}
let constantDate = document.getElementById('time');
let showDate = constantDate.innerHTML = newDateForm();

//==================Array of Objects to Create======================
//=======================Add Local Storage==========================
//How you want the array/object to look
// let lists = [{
//   id: Date.now().toString(),
//   name: name,
//   tasks: []
// }];

//Local Storage list key variable given an unlikely key name
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
//Local Storage selected list id variable given an unlikely key name
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
//lists becomes a variable that sets up an array where the object will live OR gets that list from Local Storage and also turns the list into an object with pasrse
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
//variable that will represent the id from local storage
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let listToDelete = localStorage.getItem(LOCAL_STORAGE_LIST_KEY)

newList.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    // if(e.target.tagName.toLowerCase() === 'button') {
    // console.log(e.target.id)
    console.log('button was clicked');
    // selectedListId = e.target.id
    console.log(e.target.id);
    // console.log(selectedListId);
    // console.log(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
  }
})

//==========================================//
//===============FORM ENTRY=================//
//==========================================//
//eventlistener on todo form where the value is entered
newListFormItem.addEventListener('submit', e => {
  e.preventDefault();
  //declare a variable with the text value 
  let listName = listFormTxt.value;
  console.log(listFormTxt);
  //if empty return cell and user hits enter do the following after return
  if(listName == null || listName === '') return
  //creates a createList function with the text value as the parameter
  let list = createList(listName);
  //clears the form text input area of the text value so new text can be entered
  listFormTxt.value = null;
  //pushes the list into the array lists or the object stored in local storage
  lists.push(list)
  // saveAndRender()
  // console.log(lists);// Ans: object as an array
  // console.log(list.id); //Ans; the id reference number
  // console.log(list.name);// Ans: text value entered
  // console.log(list); // Ans: Object by itself not in the array
  //call the renderlists function which will create the list items and save them in local storage
  saveAndRender();
  console.log('form button clicked to submit text');
}) 

//list text value is passed as parameter and returns the object with the text value as a property of name
function createList(name){
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  }
}

function saveAndRender() {
  save();
  renderLists();
}

//sets the key to the variable we named earlier and the object lists is stored to Local Storage as a string 
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

//Will stop list from duplicating some list values entered on the <ul> unordered list with the ID name newlist, before we call a forEach function in renderLists()
function clearElement(newList) {
  while (newList.firstChild) {
    newList.removeChild(newList.firstChild)
  }
}

//=========Works and removes last object from lists array======//
function deletedLi() {
  for (var i =0; i < lists.length; i++)
    if (lists[i].id === deletedListId) {
        console.log("hell yeah it is deleted");
        // console.log(i);
        //lists.shift()
        lists.splice(i,1);
        //console.log(lists);
        save()
        break;
    }
        //localStorage.removeItem(LOCAL_STORAGE_LIST_KEY)
        console.log(lists);
        saveAndRender();
}

function renderLists() {
  //stops duplicates of list items
  console.log(newList.firstChild);
  clearElement(newList)
  // console.log(listToDelete);
  //forEach so each <li> list item is created
  lists.forEach(list => {
    //create li
    const listElement = document.createElement('li');
    //give li an id
    listElement.id = list.id;
    //add a span element
    liSpan = document.createElement('SPAN');
    //add a class to the span element
    liSpan.classList.add('spanClass');
    //text inside the span
    liSpan.innerText = list.name;
    //append span to li
    listElement.appendChild(liSpan);
    if(list.id === selectedListId) {
      listElement.classList.add('selected');
    }
    
    const removeBtn = document.createElement('button');
    removeBtn.id = 'removeList';
    removeBtn.innerText = 'x';
    listElement.appendChild(removeBtn);

    //==============================================================
    //======================Delete button=============================
    //==============================================================
    //--inner event function -- remove li item with x button
    // tied to a function that deletes the list item via id
    removeBtn.addEventListener('click', e => {
      //removes list item
      console.log(e.target.parentNode.id);
      //give a variable name to the id
      deletedListId = e.target.parentNode.id;
      // let deletedListItem = JSON.parse(list)
      console.log(list);
      console.log('remove button clicked');
      deletedLi(list);
    });
  
    //add edit button, button to be pressed when editing
    const editButton = document.createElement('button');
    editButton.id = 'editList';
    editButton.innerText = 'Edit';
    //add edit button to li
    listElement.appendChild(editButton);
    
    ////Inner event function -- Allows text entered in span within list to be editable -- Event of pressing edit button causes list item to have a focus and border highlight when editable
    //==============================================================
    //==============================================================
    //====================Edit Button===============================
    //==============================================================
    editButton.addEventListener('click', e => {
      // hideCont();
      console.log(list.name);
      let editedListId = e.target.parentNode.id;
      console.log(editedListId);
      console.log(e.target);
      let  editLiText = e.target.parentNode.firstChild;
      console.log(editLiText); //text
      let test = typeof editLiText; 
      console.log(test);//object
      editLiText.contentEditable = 'true';
      //edit text is set to focus so you can see the box glow when in edit mode
      editLiText.focus();
      //make button look pressed
      editButton.style.borderStyle = 'inset';
      console.log(editButton.style.borderStyle)

      //Inner of Inner event function -- Event of pressing enter within editable text causes content to no longer be editable and for focus to be off
    editLiText.addEventListener ("keydown", e => {
      if(e.keyCode === 13) {
        //removes focus on list item
        editLiText.contentEditable = 'false';
        //removes borderstyle to show released edit button
        editButton.style.borderStyle = 'none';
        // console.log(editLiText);
        let newLiText = editLiText.innerText;
        console.log(newLiText);
        for (var i =0; i < lists.length; i++)
        // // console.log(lists[i].id);
        // // console.log();
        if (lists[i].id === editedListId) {
           console.log("hell yeah it is edited");
        //    console.log(editLiText);
        //    console.log(i);
        //   //  list.name = newLiText
        //    console.log(list.name);
        //    console.log(selectedListId);
        //    let newText = editLiText 
        //    console.log(newText);
          //  lists.splice(i, 1, newLiText)
          list.name = newLiText;
          console.log(selectedListId);
          save();
          console.log(list.name)
        }
        console.log(lists);
      }
    })
    })
    newList.appendChild(listElement)
  })
}
//---End of renderLists() Function----//

//==================Array of Objects End==============================
//==================Array of Objects End==============================
//==================Array of Objects End==============================
// //todo list items are bold so you know which one is selected also created a pop out display container with the tasklist checkboxes
function toggler(e){
  let listItems = newList.querySelectorAll('span');
  var displayDiv = document.getElementById('display');
  let removeBtn = document.getElementById('removeList')
  let editBtn = document.getElementById('editBtn');
  let emptyDiv = displayDiv.innerHTML = '';
  
  //For span to show container when clicked and show show container after edit mode not during
  if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'inherit'|| e.target.contentEditable === 'false') {
    for(let list of listItems){
      if(list.className = 'spanClass') {
        console.log('there is a selected item already');
      }
    }
    e.target.className = 'selected'
    console.log('span was clicked by itself and container should show, class now selected');
    toggleOn();
  } 
  //For Edit button to not cause a drop down on click of span
  if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'true') {
    for(let list of listItems) {
      list.className = 'spanClass'
    }
    console.log(('span was clicked on edit mode do not show Cont'));
    toggleOff();
  }
  //For edit button to not coause a drop down
  if(e.target.style.borderStyle === 'inset') {
    for(let list of listItems) {
      list.className = 'spanClass'
    }
    console.log('edit button was clicked do not show Cont');
    toggleOff();
  }
}
//----End of Toggler Function -------//

//Allows toggler to work
newList.addEventListener('click', toggler, false)

//====================================================
//=============Toggle-On-Off-Functions======================
//====================================================
let displayDiv = document.getElementById('display');

function toggleOn() {
  taskCard(); 
  displayDiv.style.display = 'block';
  console.log('toggle on');
}

function toggleOff() {
  displayDiv.style.display = 'none';
  console.log('toggle off');
}

//==============================================================
//======================TaskCard Function=======================
//==============================================================





function createTaskList(name){
  return {
    id: Date.now().toString(),
    name: name,
  }
}

function clearTaskElement(newTask) {
  while (newTask.firstChild) {
    newTask.removeChild(newTask.firstChild)
  }
}  

//Create the taskCard that will be displayed on toggle if the list item is selected from the todo lists
function taskCard(){
  let dropDownCont = document.getElementById('display');
  const taskButton = document.createElement('button');
  //Create container div
  const taskCont = document.createElement('div');
  taskCont.id='taskContainer';
  taskCont.className='container';

  //-----------------------------------------------------------
  //----------------------Task Title --------------------------
  //---------------Task Title from todo list item--------------
  //-----------------------------------------------------------
  let taskLiTitle = document.createElement('h2');
  taskLiTitle.class= "title";
  taskLiTitle.style.textDecoration = 'underline';
  let spans = newList.querySelectorAll("span");
  console.log(newList);
  spans.forEach(function(span){
    if(span.className === "selected"){
      //grabs the text in span and makes it all uppercase
      let spanTextNeeded = span.innerText.toUpperCase();
      //places the text in span into the h2 element taskLiTitle
      taskLiTitle.innerText = spanTextNeeded;
      taskCont.appendChild(taskLiTitle);
      console.log(spanTextNeeded);//Text selected
      idInNewList = span.parentNode.id
      console.log(idInNewList); //id number as text
    } 
  });

  taskCont.appendChild(taskLiTitle);
  //Add taskCont to dropDown Container
  dropDownCont.appendChild(taskCont);

  //=======Create Task Area========//
  //Create tasks div
  const taskDiv = document.createElement('div')
  taskDiv.class= 'tasks';
  taskCont.appendChild(taskDiv);
  console.log(taskDiv);
  
  // Create task ul
  taskUl = document.createElement('ul');
  // taskUl.classList.add = 'newTask';
  taskUl.id = 'newTask'
  taskDiv.appendChild(taskUl);
  console.log(taskUl);

  //==========================================================//
  //-----TASK FORM============================================//
  //==========================================================//

  //TASK FORM DIV
  //Create task form Div
  const taskFormDiv = document.createElement('div');
  //Task Classlist
  // taskFormDiv.classList.add = 'taskFormDiv';
  //Create task form
  const taskForm = document.createElement('form');
  taskForm.setAttribute('action', '#');
  // taskForm.classList.add = 'taskForm';
  taskForm.id = 'taskForm';
  taskFormDiv.appendChild(taskForm);

  //Create task textarea
  let taskText = document.createElement('TEXTAREA');
  taskText.id = 'taskFormTxt';
  
  taskForm.appendChild(taskText);
  //Create a placeholder
  taskText.setAttribute('placeholder', "Add A Task To List")
  
  //Create task input button
  taskButton.id = 'taskAddButton';
  taskButton.setAttribute('type', 'submit')
  taskButton.setAttribute('value', '+')
  taskButton.innerText = '+';
  taskForm.appendChild(taskButton);
  taskCont.appendChild(taskFormDiv);

  //==========================================//
  //===============FORM ENTRY=================//
  //==========================================//

   //----Button to add task details entered into taskform
  taskButton.addEventListener('click', ev5 => {
    ev5.preventDefault();
    console.log(newTask);
    console.log(newList);
    //gets value from text area in taskform
    let taskFormTxt = document.getElementById('taskFormTxt').value;
    console.log(taskFormTxt);
    console.log(spans); //Shows all spans with one that is selected as well
    //if empty return cell and user hits enter do the following after return
    if(taskFormTxt == null || taskFormTxt === '') return
    //creates a createList function with the text value as the parameter
    let task = createTaskList(taskFormTxt);
    //clears the form text input area of the text value so new text can be entered
    taskFormTxt.value = null;
    // clearTaskElement(newTask);
    // spans.forEach(function(span){
    //   if(span.className === "selected"){
    //     console.log('hello');
    //     console.log(idInNewList);//Selected id

    //   } 
    // });


    console.log(lists);
    console.log(idInNewList);
    //Notes: Find out how to organize the below so it does not repeat for every list item
            //==========Keeper Area========//

    // lists.forEach(list => {
    //   // console.log(list);//{id: name of 1st list item}
    //   console.log(lists);
    //   console.log(list.id);// first list ID number
    //   console.log(idInNewList);//List ID not Task ID  
    //   console.log(spans);
    //   console.log(newTask);
    //   console.log('Turtle Power');
    
     
      // const selectedList = lists.find(list => list.id === selectedListId)
      // console.log(selectedList);
      for (var i =0; i < lists.length; i++)
      // console.log(lists[i].id);//works gives all id of selected list item
    
        if (lists[i].id === idInNewList) {
          console.log('Putana it works'); //works
          console.log(lists[i]);
          console.log(task);
          let selectedTask = task
          console.log(selectedTask);
          let selectedList = lists[i].tasks.push(selectedTask);
          console.log(selectedList);
        
        }
      // }
    // });
            //=============New Test Area==============
    
        console.log(task); //works {id: #####, name: $%$%$%$%}
    
        saveAndRender();
        //Create task li
        taskLi = document.createElement('li');
        //Create task id
        // taskLi.id = list.id
        // console.log(list.id);
        //Create task Span
        taskLiSpan = document.createElement('SPAN');
        //add classname to task span
        taskLiSpan.classList = 'taskSpanClass'  
        //append span to lis
        taskLi.appendChild(taskLiSpan);
        //add form txt to span
        taskLiSpan.innerText = taskFormTxt;
        console.log(taskFormTxt)
        //append li to ul
        taskUl.appendChild(taskLi);
        //clear text area
        const clearTaskTxt = document.getElementById('taskFormTxt');
        clearTaskTxt.value="";
        //Create the remove button
        const removeTaskBtn = document.createElement('button');
        removeTaskBtn.classList = 'removeList';
        removeTaskBtn.innerText = 'x';
        taskLi.appendChild(removeTaskBtn);  
        // createTaskList(taskFormTxt);
        // console.log(taskFormTxt);
        // saveAndRender();
        //--inner event function -- remove li item with x button
        removeTaskBtn.addEventListener('click', ev5 => {
          ev5.target.parentNode.remove();
        });

        //ul append li 
        taskUl.appendChild(taskLi);
        //add edit button, button to be pressed when editing
        const editTaskButton = document.createElement('button');
        editTaskButton.classList = 'editList';
        editTaskButton.innerText = 'Edit';
        //add edit button to li
        taskLi.appendChild(editTaskButton);
        //add checkbox
        const checkBox = document.createElement('input');
        checkBox.classList ='complete';
        checkBox.setAttribute('type', 'checkbox');
        taskLi.appendChild(checkBox);

        //Inner event function -- text entered in span within list to be editable
        editTaskButton.addEventListener('click', ev6 => {
          let  editTaskLiText = ev6.target.parentNode.firstChild
          editTaskLiText.contentEditable = true;
          //edit text is set to focus so you can see the box glow when in edit mode
          editTaskLiText.focus();
          editTaskButton.style.borderStyle = 'inset';

          //Inner of Inner event function -- able to edit then press enter to no longer focus off of enter keydown
          editTaskLiText.addEventListener ("keydown", ev7 => {
            if(ev7.keyCode === 13) {
              ev7.preventDefault();
              //removes focus on list item
              editTaskLiText.contentEditable = false;
              //removes borderstyle to show released edit button
              editTaskButton.style.borderStyle = 'none'; 
              }
            })
        })

        //Inner of Inner event function for checkbox
        checkBox.addEventListener('click', ev7 => {
          let editTaskOnCheck = ev7.target.parentNode.firstChild;
          if(checkBox.checked === true) {
            console.log(editTaskOnCheck);
            editTaskOnCheck.style.textDecoration = 'line-through';
          } else {
            editTaskOnCheck.style.textDecoration = 'none'
          }
        })
    // }); 
  })
}

  //Note 11-17
  //Make font bigger and text areas etc
