

//------------------Variables
// Todo list <ul> id
const newList = document.getElementById('newList');
// First Form Area
const newListFormItem = document.getElementById('todoForm');//Todo Form id
// const newTaskFormItem = document.getElementById('taskFormTxt');

// const newTaskFormItem = document.getElementById('taskContainer');


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
//lists becomes a variable that sets up an array where the object will live OR gets that list from Local Storage and also turns the list into an object with parse
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
//variable that will represent the id from local storage
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
//variable that will get a list item from Local Storage
let listToDelete = localStorage.getItem(LOCAL_STORAGE_LIST_KEY)



//Not doing anything
newList.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    // if(e.target.tagName.toLowerCase() === 'button') {
    // console.log(e.target.id)
    // console.log('button was clicked');
    // selectedListId = e.target.id
    // console.log(e.target.id);
    // console.log(selectedListId);
    // console.log(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
  }
})

//==========================================//
//===============FORM ENTRY=================//
//==========================================//
//eventlistener on first todo form where the value is entered into the form and added as a list item when the ENTER KEY is pressed. It calls the function formProcess which creates the list item.
newListFormItem.addEventListener('keypress', e => {
  // e.preventDefault();
  if(e.key === "Enter") {
    e.preventDefault();
    formProcess();
    //scroll to bottom of page when enter is pressed on list form
    window.scrollTo(0,1000);
  }
}) 

//eventlistener on first todo form where the value is entered into the form and added as a list item when the BUTTON is clicked. It calls the function formProcess which creates the list item.
newListFormItem.addEventListener('submit', e => {
  e.preventDefault();
  formProcess();
  //scroll to bottom of page when button is clicked on list form
  window.scrollTo(0,1000);
})


function formProcess(){
  //declare a variable with the text value entered
  let listName = listFormTxt.value;
  console.log(listFormTxt); //shows textarea element and its attributes
  // console.log(listFormTxt.value) //shows value typed into form
  //if empty return cell and user hits enter do the following after return
  if(listName == null || listName === '') return
  //creates a variable named list with a createList function with the form text value as the parameter
  let list = createList(listName);
  //clears the form text value input area of the form text value so new text can be entered
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
//  console.log('form button clicked to submit text');
}


//list text value is passed as a parameter and returns the object with the text value as a property of name
function createList(name){
  return {
    id: Date.now().toString(),
    name: name,
    completedTasks: false,
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

//=========Works and removes last object from lists array of objects - Saves to local storage as new Lists with out deleted list item ======//
function deletedLi() {
  for (var i =0; i < lists.length; i++)
    if (lists[i].id === deletedListId) {
        // console.log("hell yeah it is deleted");
        // console.log(i);
        //lists.shift()
        //deletes from the lists
        lists.splice(i,1);
        //console.log(lists);
        //Save to Local Storage
        save()
        break;
    }
        //localStorage.removeItem(LOCAL_STORAGE_LIST_KEY)
        // console.log(lists);
        //Save to Local Storage and renderLists()
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
    console.log("this is where we are testing the crossout list")
    console.log(list.completedTasks);
    //add a class to the span element
    if(list.completedTasks === false){
    liSpan.classList.add('spanClass', 'listNoCrossOut');
    } else if (list.completedTasks === true){
      liSpan.classList.add('spanClass', 'listCrossOut');
    }
    //text inside the span
    liSpan.innerText = list.name;
    //append span to li
    listElement.appendChild(liSpan);
    // span class becomes 'selected' if the id in Local Storage (variable selectedListId) matches the id of the list item.
    if(list.id === selectedListId) {
      listElement.classList.add('selected');
    }
    //remove button created
    const removeBtn = document.createElement('button');
    removeBtn.id = 'removeList';
    removeBtn.innerText = 'x';
    listElement.appendChild(removeBtn);

    //==============================================================
    //======================Delete button=============================
    //==============================================================
    //--inner event function -- remove li item with x button
    // tied to a function that deletes the list item via id from local storage and the array of objects Lists
    removeBtn.addEventListener('click', e => {
      // console.log(e.target.parentNode.id);// id#
      //give a variable name to the id that will be deleted
      deletedListId = e.target.parentNode.id;
      // let deletedListItem = JSON.parse(list)
      console.log(list); // The specific list item that belongs to the button
      // console.log('remove button clicked');
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
      // console.log(list.name); //editable value
      let editedListId = e.target.parentNode.id;
      // console.log(editedListId); //id of editable list item
      // console.log(e.target); // button 
      //variable to grab the firstChild of the li item button belongs to, this is the span element which holds the text value
      let  editLiText = e.target.parentNode.firstChild;
      // console.log(editLiText); //span element and everything within
      let test = typeof editLiText; 
      // console.log(test);//Ans: object type
      //sets the span to editable
      editLiText.contentEditable = 'true';
      //edit text is set to focus so you can see the box glow when in edit mode
      editLiText.focus();
      //make button look pressed
      editButton.style.borderStyle = 'inset';
      // console.log(editButton.style.borderStyle)

      //Inner of Inner event function -- Event of pressing enter within editable text causes content to no longer be editable and for focus to be off
      editLiText.addEventListener ("keydown", e => {
        if(e.keyCode === 13) {
          //removes focus on list item
          editLiText.contentEditable = 'false';
          //removes borderstyle to show released edit button
          editButton.style.borderStyle = 'none';
          // console.log(editLiText);
          //variable created for text within editLiText span after enter is pressed
          let newLiText = editLiText.innerText;
          // console.log(newLiText); // new text after 
          //loop through object of arrays
          for (var i =0; i < lists.length; i++)
          // // console.log(lists[i].id);
          // // console.log();
          //if id in object matches the id of the selected li item then make the new text replace the name in the object
          if (lists[i].id === editedListId) {
            // console.log("hell yeah it is edited");
            //    console.log(editLiText);
            //    console.log(i);
            //   //  list.name = newLiText
            //    console.log(list.name);
            //    console.log(selectedListId);
            //    let newText = editLiText 
            //    console.log(newText);
            //  lists.splice(i, 1, newLiText)
            //name is now the new typed text entered during edit mode and now in the variable newLiText
            list.name = newLiText;
            // console.log(selectedListId);//null
            save();
            // console.log(list.name)// new text entered after edit
          }
          // console.log(lists);
        }
      })
    })
    //The new updated list appended to li
    newList.appendChild(listElement)
  })
}
//---End of renderLists() Function----//

//==================Array of Objects End==============================
//==================Array of Objects End==============================
//==================Array of Objects End==============================
// //We have the original todo list and we then have the task lists - todo list items are bold so you know which one is selected. We also created a pop out display container with tasklist checkboxes

//This function is like a switch which performs certain actions if certain conditions are met and switches back and forth as needed. Here we use it to show a container with its relevant tasks in the display div if the list item gets selected otherwise it should not show a task list in display div. Toggle on function turns on the display div
function toggler(e){
  //represents the span where the list text is
  let listItems = newList.querySelectorAll('span');
  //where the task lists will be shown
  var displayDiv = document.getElementById('display');
  let removeBtn = document.getElementById('removeList')
  let editBtn = document.getElementById('editBtn');
  let emptyDiv = displayDiv.innerHTML = '';
  
  //For span to show the display container when clicked and show the display container after edit mode not during
  //contenteditable is default and is editable if its immediate parent is editable
  if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'inherit'|| e.target.contentEditable === 'false') {
    //loop throught the spans
    for(let list of listItems){
      if(list.className = 'spanClass') {
        // console.log('there is a selected item already');
      }
    }
    e.target.className = 'selected'
    // console.log('span was clicked by itself and container should show, class now selected');
    toggleOn();
  } 
  //For Edit button to not cause a drop down 
  if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'true') {
    for(let list of listItems) {
      list.className = 'spanClass'
    }
    // console.log(('span was clicked on edit mode do not show Cont'));
    toggleOff();
  }
  //For edit button to not coause a drop down on click of span while selecting text to edit it
  if(e.target.style.borderStyle === 'inset') {
    for(let list of listItems) {
      list.className = 'spanClass'
    }
    // console.log('edit button was clicked do not show Cont');
    
    toggleOff();
  }
}
//----End of Toggler Function -------//

//Allows toggler to work by calling it as an eventlistener in ul newList id
newList.addEventListener('click', toggler, false)

//====================================================
//=============Toggle-On-Off-Functions======================
//====================================================
let displayDiv = document.getElementById('display');

function toggleOn() {
  taskCard();
//  console.log('do we enter renderTasks here');
  displayDiv.style.display = 'block';
  // console.log('toggle on');
  //scroll to bottom of page when the list item is clicked on todo list
  window.scrollTo(0,1000);
}

function toggleOff() {
  displayDiv.style.display = 'none';
  // console.log('toggle off');
}

//==============================================================
//======================TaskCard Function=======================
//==============================================================



//Function for a task value to be a parameter passed into the object as a property of name
function createTaskList(name){
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
  }
}

//Build the taskCard that will be displayed on toggle if the list item is selected from the todo lists
function taskCard(){
  // clearTaskElement(newTask)
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
  // console.log(newList);
  //loops through the list items and looks at each span to see if selected, turns that span text to uppercase task title
  spans.forEach(function(span){
    if(span.className === "selected"){
      //grabs the text in span and makes it all uppercase
      let spanTextNeeded = span.innerText.toUpperCase();
      //places the text in span into the h2 element taskLiTitle
      taskLiTitle.innerText = spanTextNeeded;
      taskCont.appendChild(taskLiTitle);
      // console.log(spanTextNeeded);//Text selected
      //pulls the id of the parent list item into a variable
      idInNewList = span.parentNode.id
      // console.log(idInNewList); //id number as text
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
  // console.log(taskDiv);
  // Create task ul
  taskUl = document.createElement('ul');
  // taskUl.classList.add = 'newTask';
  taskUl.id = 'newTask'
  taskDiv.appendChild(taskUl);
  // console.log(taskUl);
  // console.log(newTask);
  // console.log(newList);
  renderTasks();

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

  //create a const to get the element by ID, have to create it here so that the element is in existence when I call it
  const newTaskFormItem = document.getElementById('taskForm');

  //eventlistener on Task todo form where the value is entered into the form and added as a Task item when the ENTER KEY is pressed. It calls the function taskFormProcess which creates the task item.
  newTaskFormItem.addEventListener('keypress', ev5 => {
    if(ev5.key === "Enter") {
      ev5.preventDefault();
      taskFormProcess();
      //scroll to bottom of page when enter is pressed on task form
      window.scrollTo(0,1000);
//      let taskDivArea = document.getElementById('display');
//      taskDivArea.scrollTop = taskDivArea.scrollHeight;
//      console.log(taskDivArea)
    }
  })

  //eventlistener on Task todo form where the value is entered into the form and added as a Task item when the BUTTON is clicked. It calls the function taskFormProcess which creates the task item.
  taskButton.addEventListener('click', ev5 => {
    ev5.preventDefault();
    taskFormProcess();
    console.log(newTaskFormItem);
    //scroll to bottom of page when button is clicked on task form
    window.scrollTo(0,1000);
 
  });


  function taskFormProcess(){
    // console.log(newTask);//<ul id='newTask' ..This is where problem exists 4.12.2021 it should be pulling the text entered in the task form area
    // console.log(newList);
    //gets value from text area in taskform
    let taskName = taskFormTxt.value;
    // let taskFormTxt = document.getElementById('taskFormTxt').value;
    // console.log(taskName);
    // storeTaskName(taskName);
    // console.log(taskFormTxt.value);
    // console.log(spans); //Shows all spans with one that is selected as well
    //if empty return cell and user hits enter do the following after return
    if(taskName == null || taskName === '') return
    //creates a createList function with the text value as the parameter
    let task = createTaskList(taskName)
    //clears the form text input area of the text value so new text can be entered
    taskFormTxt.value = null;
    // clearTaskElement(newTask);
    // spans.forEach(function(span){
    //   if(span.className === "selected"){
    //     console.log('hello');
    //     console.log(idInNewList);//Selected id

  // } 
    // });


    // console.log(lists);
    // console.log(idInNewList);
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

        //Save the task typed in the Task form in the task array within the list
      if (lists[i].id === idInNewList) {
          // console.log('Putana it works'); //works
          // console.log(lists[i]);
          // console.log(task);//{id: "1612413073416", name: "e2r2"} task entered
          let typedTask = task
          // console.log(typedTask);//{id: "1612413073416", name: "e2r2"} task entered
          //pushes selected task to array tasks
          let selectedList = lists[i].tasks.push(typedTask);
          // console.log(selectedList);//Ans: 1
          // console.log(task.name);
      }
      // }
      // console.log(task.name); //works {id: #####, name: $%$%$%$%}
      // console.log(task.id);
    
      //The task entered into the form is saved into the array of objects as a new task within the selected list item
      saveAndRender();
      renderTasks();
  };
            //=============New Test Area==============
  // console.log(newTask);
  // console.log(newTask.firstChild);
  //Stops the task list from duplicating the first task item in the UL for the task lists which has the ID newTask
  function clearTaskElement(newTask) {
    while (newTask.firstChild) {
      newTask.removeChild(newTask.firstChild)
    }
  }        
  
  
  function deletedTask() {
    for (var i = 0; i < lists.length; i++){
      for(let n = 0, t = lists[i].tasks.length; n < t; n++){
        if(lists[i].tasks[n].id === deletedTaskId){
          console.log('it works')
          console.log(n)
          console.log(lists[i])
          console.log(lists[i].tasks)
          console.log(lists[i].tasks[n])
          lists[i].tasks.splice([n],1);
          console.log(lists[i])
          break;
          save();
          renderTasks();
        }
      }
    }
  }
  //Create the remove button
  // const removeTaskBtn = document.createElement('button');
  // const editTaskButton = document.createElement('button');
  // for (var i =0; i < lists.length; i++)

  // function deletedTask() {
  //   for(var i = 0; i < lists[i].tasks; i++){
  //     console.log(i);
  //   }
  // }

        //Notes: Add tasks into the ul below from the local storage so they display when the list item is selected

        //==========================================
  function reviewChecks(){
      var cont = document.getElementById('newTask').children;
      console.log(cont);
  }

  function renderTasks(){  
    // var ex = document.getElementById('newTask').firstChild.innerHTML;
    // console.log(ex);
    //Calls the function that stops first task list item from duplicating in the displayed ul
    clearTaskElement(newTask);
    // for(const prop in lists){
    //   console.log(lists[prop]);
    //   console.log(lists.name);

    // for(let i = 0, l = lists.tasks.length; i < l; i++){
    //   let obj = lists.tasks[i];
    //   console.log(obj.name);
    // }
    //Loop through list items
    for (var i =0; i < lists.length; i++){
      if(lists[i].id === idInNewList){
        // console.log("hello mate");
        // console.log(lists[i]);
        console.log(lists[i].name)//text of list item
        // console.log(lists[i].tasks);

        //Loop through each task within the list items
        for(let n = 0, t = lists[i].tasks.length; n < t; n++){
          // console.log('hi');
          //lists all tasks entered
          var tasksInLists = lists[i].tasks[n];
          var arrayOfTasks = lists[i].tasks;
          var listName = lists[i].name;
          var listTask= lists[i].completedTasks;
          var listId = lists[i].id;
//          console.log(Array.isArray(arrayOfTasks));//true
//          console.log(tasksInLists);
//          console.log(tasksInLists.id);
//          console.log(arrayOfTasks);
//          console.log(n)
//          console.log(Array.isArray(tasksInLists));//false
//          console.log(typeof(tasksInLists));//object
//          console.log(tasksInLists);//{id: "1621009449631", name: "Inner22", complete: false}
          // console.log(tasksInLists.name);
          // console.log(n);
          // console.log(tasksInLists.id);
          // console.log(tasksInLists.parentNode);
          // console.log(newTask);
//          console.log(lists[i].tasks[n].id);// #id of task
//          console.log(lists[i].tasks[n].complete);
          
                
                
          // tasksInLists.forEach(List => {tasksIn
          //Give the task id a variable name
          // let selectedTaskId = tasksInLists.id;
          // console.log(selectedTaskId);
          //tasksInLists.forEach(function(taskInList){
          //console.log('yo')
          //});
          
          // tasksInLists.forEach(tasksInList => {

          // if(selectedTaskId = selectedList.parentNode.id){

            // }
            // console.log(lists);
            // console.log(newTask);
            // clearTaskElement(newTask);
            // console.log(task.id);
            // console.log(idInNewList);
            //Looping through each list item
            // lists.forEach(list => {
            //create li
            const taskListElement = document.createElement('li');
            //put the id from the object into the task id being rendered
            taskListElement.id = tasksInLists.id;
          
            //add a span element
            // TaskiSpan = document.createElement('SPAN');
            // //add a class to the span exlement
            // liSpan.classList.add('spanClass');
            // //text inside the span
            // liSpan.innerText = list.name;
            // //append span to li
            // listElement.appendChild(liSpan);
            // if(list.id === selectedListId) {
            //   listElement.classList.add('selected');
            //Create task li
            // taskLi = document.createElement('li');
            //Create task id
            // taskLi.id = list.id
            // console.log(list.id);
            //Create task Span
            taskLiSpan = document.createElement('SPAN');
//            let completeFinder = arrayOfTasks.find(taskInLi => {
//                if(taskInLi.complete === true){
//                  taskLiSpan.classList = 'crossOut';
//                  console.log(taskInLi.name);
//                } else if(taskInLi.complete === false){
//                  taskLiSpan.classList = 'noCrossOut';
//                  console.log(taskInLi.name);
//                }
//              })
//            arrayOfTasks.forEach(taskForChecks => {
//              console.log(taskForChecks);
//              if(taskForChecks.id === tasksInLists.id && taskForChecks.complete === true){
//                taskLiSpan.classList = 'crossOut';
//                console.log(taskForChecks.name);
//                console.log(taskForChecks.complete);
//              } else if(taskForChecks.complete === false){
//                  taskLiSpan.classList = 'noCrossOut';
//                  console.log(taskForChecks.name);
//                  console.log(taskForChecks.complete);
//              }
//            });
            //Looks through each task and checks the LS. If it is not checked off it should be set as complete === false so the class list should be 'noCrossOut' making the task not have a line-through or cross out. This checks every task.
            if(tasksInLists.complete === false){
              taskLiSpan.classList = 'noCrossOut';
            } else if (tasksInLists.complete === true){
              taskLiSpan.classList = 'crossOut';
            }
//            //add classname to task span
//            taskLiSpan.classList = 'noCrossOut'  
//            taskLiSpan.classList = 'noCrossOut';
//            console.log(tasksInLists.complete)
          
//            if(tasksInLists.complete = false){
//              console.log("it is set to false")
////              taskLiSpan.classList = 'noCrossOut';
//            } else if (tasksInLists.complete = true){
//              console.log("it is set to true")
////              taskLiSpan.classList = 'crossOut';
//            }
            let task = tasksInLists.name        
            //text inside the span
            taskLiSpan.innerText = tasksInLists.name;
            //append span to lis
            taskListElement.appendChild(taskLiSpan);
            //HAVE TO LOOP THROUGH LIST ITEMS THEN GO THROUGH TASK
            //add form txt to span
            // console.log(list.tasks);// works pulls all tasks
            // taskLiSpan.innerText = lists.tasks.name;//Udefined
            // console.log(taskName.name)//Undefined
          
            //clear text area
            const clearTaskTxt = document.getElementById('taskFormTxt');
            // clearTaskTxt.value="";
            // //Create the remove button
            // const removeTaskBtn = document.createElement('button');
            const removeTaskBtn = document.createElement('button');
            removeTaskBtn.classList = 'removeList';
            removeTaskBtn.innerText = 'x';
            taskListElement.appendChild(removeTaskBtn); 
            //Create the edit button 
            const editTaskButton = document.createElement('button');
            editTaskButton.id = 'editList';
            editTaskButton.innerText = "Edit";
            taskListElement.appendChild(editTaskButton);
            //Create the checkbox
            const checkBox = document.createElement('input');
            checkBox.classList ='complete';
            checkBox.setAttribute('type', 'checkbox');
            checkBox.checked = tasksInLists.complete
            taskListElement.appendChild(checkBox);
        
            // })
  

            //==========================================


            //Below is commented out for testing purpose
            //Create task li
            // taskLi = document.createElement('li');
            // //Create task id
            // // taskLi.id = list.id
            // // console.log(list.id);
            // //Create task Span
            // taskLiSpan = document.createElement('SPAN');
            // //add classname to task span
            // taskLiSpan.classList = 'taskSpanClass'  
            // //append span to lis
            // taskLi.appendChild(taskLiSpan);
            // //add form txt to span
            // taskLiSpan.innerText = taskFormTxt;
            // console.log(taskFormTxt)
            // //append li to ul
            // taskUl.appendChild(taskLi);
            // //clear text area
            // const clearTaskTxt = document.getElementById('taskFormTxt');
            // clearTaskTxt.value="";
            // //Create the remove button
            // const removeTaskBtn = document.createElement('button');
            // removeTaskBtn.classList = 'removeList';
            // removeTaskBtn.innerText = 'x';
            // taskLi.appendChild(removeTaskBtn);  

            //// createTaskList(taskFormTxt);
            //// console.log(taskFormTxt);
            //// saveAndRender();
            //--inner event function -- remove task item with x button
            removeTaskBtn.addEventListener('click', ev5 => {
              ev5.target.parentNode.remove();
              //give a variable name to the task id that will be deleted
              deletedTaskId = ev5.target.parentNode.id;
              console.log(deletedTaskId);
              console.log('remove button clicked')
//              console.log(tasksInLists.id)//gives last id in tasks
              
              console.log(arrayOfTasks);
//              console.log(arrayOfTasks.id)
//              let taskObjIds = arrayOfTasks.id;
//                console.log(taskObjIds);
//                let idInTaskObjDelete = taskObjIds.filter(checkId)
//                function checkId(idTask) {
//                  return idTask === deletedTaskId;
//                }
//                console.log(taskObjIds);
//              
////          //for loop through each task array with the purpose of finding the id in the array    
              for(var t = 0; t < arrayOfTasks.length; t++){
//                console.log(arrayOfTasks[t]);
//                console.log(arrayOfTasks[t].id);
//                if(arrayOfTasks[t].id === deletedTaskId)
//                  console.log(arrayOfTasks[t]);
//                  break;
                let taskObjIds = arrayOfTasks[t].id;
//                console.log(taskObjIds);
                //filter through each task array with function checkId to pull the idTask.id if it matches the evt.parent.id deletedTaskId then splice the task in the array from the object stored in LS
                let taskToDelete = arrayOfTasks.filter(checkId)
                function checkId(idTask){
//                  console.log(idTask.id);
                  if(idTask.id === deletedTaskId){
                    console.log(idTask.id)
                    console.log(idTask.name)
                    console.log(n)
                    console.log(arrayOfTasks[n]);
                    arrayOfTasks.splice([n],1)
//                    break;
                    save();
                    renderTasks();
//                    console.log(lists[i])
//                    console.log(lists[i].tasks)
//                    console.log(lists[i].tasks[n])
//                    lists[i].tasks.splice([n],1);
                  }
//                  return idTask.id === deletedTaskId
                }
                
//                console.log(taskToDelete);
//                console.log(taskToDelete.id);
                break;
//                save();
//                renderTasks();
//                let idInTaskObjDelete = taskObjIds.filter(checkId)
//                function checkId(idTask) {
//                  return idTask === deletedTaskId;
//                }
//                console.log(taskObjIds);
              }
              
              //should turn tasksInLists.name into a variable like task
//              if(tasksInLists.id === deletedTaskId){
//                console.log('it works')
//                console.log(n)
//                console.log(lists[i])
////                console.log(lists[i].tasks)
//                console.log(lists[i].tasks[n])
//                arrayOfTasks.splice([n],1);
//              }
              saveAndRender();
//              deletedTask(task);
            });

            //ul append li 
            // taskUl.appendChild(taskList);
            // //add edit button, button to be pressed when editing
            // const editTaskButton = document.createElement('button');
            // editTaskButton.classList = 'editList';
            // editTaskButton.innerText = 'Edit';
            // //add edit button to li
            // taskLi.appendChild(editTaskButton);
            // //add checkbox
            // const checkBox = document.createElement('input');
            // checkBox.classList ='complete';
            // checkBox.setAttribute('type', 'checkbox');
            // taskLi.appendChild(checkBox);

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

            //Inner of Inner event function for checkbox to be checked or unchecked and also cause the complete in local storage to be set to true or false
            checkBox.addEventListener('click', ev7 => {
              //Look at the parent task list item where you clicked the checkbox and look at the first child which is the span which has the cross out class and the name of the task as text. Other children are the other buttons such as remove and edit and check of course
              let editTaskOnCheck = ev7.target.parentNode.firstChild;
              console.log(editTaskOnCheck);
              // var innerTaskList = newTask.querySelectorAll('li');
              // if(checkBox.checked === true) {
              //   console.log(editTaskOnCheck);
              //   editTaskOnCheck.style.textDecoration = 'line-through';

              // } else{
              //   editTaskOnCheck.style.textDecoration = 'none'
              //   console.log('testing checkbox if checked not true');
              // }
              // console.log(ev7.target.parentNode.id);
              //ID of the task list item
              let thisTaskId = ev7.target.parentNode.id;
              console.log(thisTaskId);
              //id# of each task
              // console.log(ev7.target);
              // console.log(checkBox);
              // console.log(tasksInLists);
              // let findTask = arrayOfTasks.find(taskSearch => innerTaskList.id === ev7.target.id)
              // console.log(findTask);
              // tasksInLists.isArray;
            
             
              

              //going through the <li> innerTaskList, the innerList is a <li> item within innerTaskList
              // innerTaskList.forEach(innerList => {
              //   console.log(innerList);
              //   let testing = typeof(innerList)
              //   console.log(testing);


              //   // console.log(innerList.id);//uses last id of tasks
              //   // console.log(innerList.complete);//undefined
              //   if(innerList.id === thisTaskId && checkBox.checked === false){
              //     // console.log("hleoo");
              //     console.log(innerList.id);

              // let taskFinder = function(tasking){
              //   for(var key in tasking){
              //     if(tasking.hasOwnProperty(key)){
              //       console.log(tasking[key]);
              //     }
              //   }
              //   return tasking;
              // }
              
              //Create functions to cross out and uncross the tasks with linethrough, these functions will be called from the taskFinder below
              
              const disengageCrossOut = ()=> {
                console.log('function disnengageCrossOut was tripped')
                editTaskOnCheck.removeAttribute('class', 'crossOut');
                editTaskOnCheck.setAttribute('class', 'noCrossOut');
//                tasksInLists.complete = false;
                console.log(tasksInLists)
//                saveAndRender();
//                renderTasks();
              }
              
              const engageCrossOut = ()=> {
                console.log('function engageCrossOut was tripped')
                editTaskOnCheck.removeAttribute('class', 'noCrossOut');
                editTaskOnCheck.setAttribute('class', 'crossOut');
                console.log(tasksInLists.complete)
//                tasksInLists.complete = "true"
                console.log(tasksInLists)
//                saveAndRender();
//                renderTasks();
              }
              
//              engageCrossOut();
              //use find to look through the array and find the object with the matching ID.. We need to then change the objects so that it is checkmarked and also saved to LS
//              let taskFinder = arrayOfTasks.find(taskInLi => { if(taskInLi.id === thisTaskId && tasksInLists.complete === false && editTaskOnCheck){
////                  console.log(editTaskOnCheck)
//                  console.log('it is not checked already so now it is being set to checked');
//                  engageCrossOut();
//                
//                } else if(taskInLi.id === thisTaskId && tasksInLists.complete === true) {
////              let taskFinder = arrayOfTasks.find(taskInLi => {if(tasksInLists.complete === true) {
////                console.log(editTaskOnCheck)
//                console.log('it is checked already so now it is being set to unchecked');
//                disengageCrossOut();
////                tasksInLists.complete = false;
////                saveAndRender();
//////                renderTasks();
////                  tasksInLists.complete = true;
////                  saveAndRender();
//////                  renderTasks();
////                  console.log(editTaskOnCheck);
//                }
////                console.log(tasksInLists);
//              })
              
              let taskFinder = arrayOfTasks.find(taskInLi => {
                if(taskInLi.id === thisTaskId && editTaskOnCheck.classList.contains("noCrossOut")){
                  console.log("check it")
                  engageCrossOut();
                  taskInLi.complete = true;
//                  saveAndRender();
                } else if(taskInLi.id === thisTaskId && editTaskOnCheck.classList.contains("crossOut")){
                  console.log("uncheck it")
                  disengageCrossOut();
                  taskInLi.complete = false;
//                  saveAndRender();
                }
              })
              console.log(editTaskOnCheck);
//              console.log(taskFinder);
              console.log(tasksInLists);
              // console.log(taskInLi);
              console.log(arrayOfTasks);
              
//              
//              let taskCompleteChecker = arrayOfTasks.forEach(innerCheck =>{
//                console.log(innerCheck);
//              })
              
              //function that is tripped when all the checkboxes are checked in the tasks items. Trying to use this function to mark tasksCompleted in LS as true and also set the span to ListCrossOUt so it has a linethrough
              const engageListCrossOut = ()=> {
                console.log('function engageListCrossOut was tripped')
                //Todo: find specific list item, these variables were declared earlier
                console.log(listName)
                console.log(listTask)
                console.log(lists)
                console.log(listId)
                console.log(newList)
                console.log(typeof(newList))
                listThings = newList.querySelectorAll('span')
                console.log(listThings)
                console.log(arrayOfTasks)
                console.log(idInNewList)
                //List item related to tasks that are all checked off has completedTasks set to true and saved in LS
                for(let listSelection of lists){
//                  console.log(listSelection);
                  console.log(listSelection.completedTasks);
                  console.log(listSelection.id);
                  if(listSelection.id === listId){
                    console.log("yes trying to find only list item with this id")
                    listSelection.completedTasks = true;
                    console.log(listSelection);
                  }
                  
                 
                  
                }
                
//                for(let listSelection of listThings){
//                  if(listSelection.className = 'spanClass') {
//                    console.log('hell yeah')
//                    if(listSelection.id = listId) {
//                      console.log('id matches')
//                      console.log(listId)
//                      console.log(newList);
//                      console.log(lists.name)
//                      for(var i =0; i < lists.length; i++) {
//                        if(lists[i].id === listSelection.id)
//                          console.log('works again')
//                          console.log(lists[i].name)
//                          lists[i].completedTasks = true;
//                          console.log(lists[i].completedTasks);
//                        
//                      }
//                    }
//                  }
//                }
                
//                editTaskOnCheck.removeAttribute('class', 'ListNoCrossOut');
//                editTaskOnCheck.setAttribute('class', 'ListCrossOut');
              }
              
              
              
              
              //checks if every check box in every task item is checked and therefore the complete is set to true
              let taskCompleteChecker = arrayOfTasks.every( taskInLi => taskInLi.complete === true)
              
              console.log(taskCompleteChecker);
              
              if(taskCompleteChecker === true){
                console.log('everycheck box in tasks is complete so set off engageListCrossOut Function')
                engageListCrossOut();
              }
              // tasksInLists.filter (innerTasks => {
              // // tasksInLists.forEach(innerTasks => {
              //   // console.log(innerTasks);
              //   if(innerTasks === thisTaskId && checkBox.checked === false){
              
              //     console.log('it is checked already so uncheck mark it');
              //     editTaskOnCheck.style.textDecoration = 'none';
              //     // checkBox.checked = false;
              //     tasksInLists.complete = false;//works but always changes the last complete only
              //     // innerList.complete = false;
              //     // console.log(tasksInLists);
              //     } else if(innerList.id === thisTaskId && checkBox.checked === true){
              //         console.log(innerList.id);
              //         console.log('it is not checked already so check mark it');
              //         editTaskOnCheck.style.textDecoration = 'line-through';
              //         // checkBox.checked = true;
                      
              //         tasksInLists.complete = true;
              //         // innerList.complete = true;
              //         console.log(tasksInLists);
                      
              //       // }
              //     }
              //     saveAndRender()
              //     renderTasks()
              //   })    
                
             
              //adding the checkbox marked off as true to the object of arrays and specifically to the task array tasksInLists.complete
              // tasksInLists.complete = ev7.target.checked
              // if(checkBox.checked === false){
              //   console.log('not checked');
              // } else{
              //   console.log('it is checked');
              //   editTaskOnCheck.style.textDecoration = 'line-through'
              // }
              //saving this to LS so it stays in memory and does not refresh with checkbox as empty
              // saveAndRender()
              reviewChecks();
              saveAndRender();
//              renderTasks();
            })
          
            console.log("hello I just did a clone to another computer and am testing it")
            // console.log(lists);
            //append li to ul
            taskUl.appendChild(taskListElement);
           
          // }
        }
      }
 
    }
  }
    // }); 
  // })
}

  //Note 11-17
  //Make font bigger and text areas etc
