

//------------------Variables
// Todo list <ul> id
const newList = document.getElementById('newList');
// First Form Area
const newListFormItem = document.getElementById('todoForm');//Todo Form id

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

//TODO: Local Storage list key variable given an unlikely key name. task.lists becomes the key stored in the Local Storage key value pair
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
//TODO: Local Storage selected list id variable given an unlikely key name. task.selectedListId becomes the value stored in Local Storage in the key value pair
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
//TODO: Lists becomes a variable that sets up an array where the object will live OR gets that list from Local Storage and also turns the list into an object with parse
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
//variable that will represent the id/value from local storage. It will get the value data from Local Storage
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
//variable that will get a list item, key data from Local Storage for deletion
let listToDelete = localStorage.getItem(LOCAL_STORAGE_LIST_KEY)

//==========================================//
//===============FORM ENTRY=================//
//==========================================//
//TODO: Function that is called to scroll to the end of the container block
function scrollToList() {
  // var elmnt = document.getElementById("todoForm");
  var elmnt = document.querySelector(".container3");
  elmnt.scrollIntoView({behavior: "smooth", block: "end"});
}
//TODO: Eventlistener on first todo form where the value is entered into the form and added as a list item when the ENTER KEY is pressed. It calls the function formProcess which creates the list item.
newListFormItem.addEventListener('keypress', e =>{
  if(e.key === "Enter") {
    e.preventDefault();
    formProcess();
    scrollToList();
  }
}) 

//TODO: Eventlistener on first todo form where the value is entered into the form and added as a list item when the BUTTON is clicked. It calls the function formProcess which creates the list item.
newListFormItem.addEventListener('submit', e =>{
  e.preventDefault();
  formProcess();
  scrollToList();
})

//TODO: The form area where once a list item is typed and button is clicked or enter is pressed, the list value gets added to the createList function which holds the object and also pushed to Local Storage
function formProcess(){
  //declare a variable with the text value entered
  let listName = listFormTxt.value;
  // console.log(listFormTxt); //shows textarea element and its attributes
  // console.log(listFormTxt.value) //shows value typed into form
  //if empty return cell and user hits enter do the following after return
  if(listName == null || listName === '') return
  //creates a variable named list with a createList function with the form text value as the parameter
  let list = createList(listName);
  //clears the form text value input area of the form text value so new text can be entered
  listFormTxt.value = null;
  //pushes the list into the array lists or the object stored in local storage
  lists.push(list)
  //call the renderlists function which will create the list items and save them in local storage
  saveAndRender();
  // console.log('form button clicked to submit text');
}


//TODO: List text value is passed as a parameter and returns the object with the text value as a property of name
function createList(name){
  return {
    id: Date.now().toString(),
    name: name,
    completedTasks: false,
    displayTasks: false,
    tasks: []
  }
}

function saveAndRender(){
  save();
  renderLists();
}

//TODO: Sets the key to the LOCAL STORAGE variable we named earlier and the object lists is stored to Local Storage as a string 
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

//TODO: Will stop list from duplicating some list values entered on the <ul> unordered list with the ID name newlist, before we call a forEach function in renderLists()
function clearElement(newList) {
  while (newList.firstChild) {
    newList.removeChild(newList.firstChild)
  }
}

//TODO: Splices list item based on the target id of the list item that holds the delete button. Saves to local storage as new Lists with out deleted list item. //
function deletedLi() {
  for (var i =0; i < lists.length; i++)
    if (lists[i].id === deletedListId) {
      //deletes from the lists
      lists.splice(i,1);
      //Save to Local Storage
      save()
      break;
    }
  //Save to Local Storage and renderLists()
  saveAndRender();
}

//TODO: Builds the entire list section only with the delete and edit buttons as well
function renderLists() {
  //stops duplicates of list items
  clearElement(newList)
  //forEach so each <li> list item is created
  lists.forEach(list => {
    //create li
    const listElement = document.createElement('li');
    //give li an id
    listElement.id = list.id;
    //add a span element
    liSpan = document.createElement('SPAN');
    //TODO: Provides the class needed depending on different outcomes that are saved in LS to cross out and or bold list items
    if(list.displayTasks === false && list.completedTasks === false){
      liSpan.classList.add('spanClass', 'listNoCrossOut');
    }
    if(list.displayTasks === true && list.completedTasks === false){
      liSpan.classList.add('selected', 'listNoCrossOut');
    }
    if(list.displayTasks === false && list.completedTasks === true){
      liSpan.classList.add('spanClass', 'listCrossOut');
    }
    if(list.displayTasks === true && list.completedTasks === true){
      liSpan.classList.add('selected', 'listCrossOut');
    }
    //text inside the span
    liSpan.innerText = list.name;
    //append span to li
    listElement.appendChild(liSpan);
    //remove button created
    const removeBtn = document.createElement('button');
    removeBtn.id = 'removeList';
    removeBtn.innerText = 'x';
    // removeBtn.classList.add('focus-visible-only')
    listElement.appendChild(removeBtn);
    //==============================================================
    //======================Delete button=============================
    //==============================================================
    //--inner event function -- remove li item with x button
    // tied to a function that deletes the list item via id from local storage and the array of objects Lists
    removeBtn.addEventListener('click', e => {
      //give a variable name to the id that will be deleted
      deletedListId = e.target.parentNode.id;
      console.log(list); // The specific list item that belongs to the button
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
      toggleOff();
      console.log(list.name); //editable value
      list.displayTasks = false;
      let editedListId = e.target.parentNode.id;
      //variable to grab the firstChild of the li item button belongs to, this is the span element which holds the text value
      let  editLiText = e.target.parentNode.firstChild;// Span Text Area
      console.log(editLiText); //span element and everything within
      //sets the span to editable
      editLiText.setAttribute("contenteditable", "true");
      //edit text is set to focus so you can see the box glow when in edit mode
      editLiText.focus();
      //make button look pressed
      editButton.style.borderStyle = 'inset';
      editButton.style.fontWeight = 'bolder';
      console.log('edit button should have set off contenteditable and focus')
      console.log('editButton created cause action 2')
      console.log(editLiText)
      //Inner of Inner event function -- Event of pressing enter within editable text causes content to no longer be editable and for focus to be off
      editLiText.addEventListener ("keydown", e => {
        if(e.keyCode === 13) {
          //removes focus on list item
          editLiText.contentEditable = 'false';
          //removes borderstyle to show released edit button
          editButton.style.borderStyle = 'solid';
          console.log(editLiText);
          //variable created for text within editLiText span after enter is pressed
          let newLiText = editLiText.innerText;
          console.log(newLiText); // new text after 
          //loop through object of arrays
          for (var i =0; i < lists.length; i++){
          //if id in object matches the id of the selected li item then make the new text replace the name in the object
            if (lists[i].id === editedListId) {
              list.name = newLiText;
              console.log(list.name)// new text entered after edit
              list.displayTasks = false;
              save();
              renderLists()
            }
          }
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
//If a button is clicked such as edit/delete prevent toggler from being called, else if the text is clicked and it is not in edit more than call function toggler(e) with the event e passed in as a parameter.
newList.addEventListener('click', e => {
  if(e.target.tagName === "BUTTON"){
    e.preventDefault();
    // console.log("a button was clicked will not call toggler")
  } else if ((e.target.tagName === "SPAN" && e.target.contentEditable === 'inherit')||(e.target.contentEditable === 'false')){
    // (console.log("a span was clicked, set off toggler"))
    toggler(e);
  }
}, false);
   

//This function is like a switch which performs certain actions if certain conditions are met and switches back and forth as needed. Here we use it to show a container with its relevant tasks in the display div if the list item gets selected otherwise it should not show a task list in display div. Toggle on function turns on the display div
function toggler(e){
  if(e.target.tagName === "BUTTON"){
    // console.log('button clicked but no action taken')
    e.preventDefault();
  }
  //represents the span where the list text is
  let listItems = newList.querySelectorAll('span');
  //where the task lists will be shown
  var displayDiv = document.getElementById('display');
  let removeBtn = document.getElementById('removeList')
  let editBtn = document.getElementById('editBtn');
  let emptyDiv = displayDiv.innerHTML = '';

  //New TODO: Once the lists are created in renderLists() if a list item is clicked on this for of statement loops through each list item. The if statement, if the target id matches the object list id it makes the object propery displayTasks be true and saves it to the object. Else if id does not match the displayTasks is set to false. It then calls renderLists again so that is updated with the new displayTasks as true. The displayTasks as true in renderLists() will then set off the classlist to be 'selected' making the list item bold. Otherwise it will be set to spanClass and not bold...The clicked list item will also cause a toggleOn() and each instance should have save() so LS is updated every time.
  for(let list of lists){
    //If event target is span, event id matches list id matches and is not in edit mode then make displayTasks true --- Else if make displayTasks false
    if((e.target.nodeName === 'SPAN' && e.target.parentNode.id === list.id && e.target.contentEditable === 'inherit')|| (e.target.contentEditable === 'false')){
      list.displayTasks = true;
      save();
      //This will loop through each of the items not selected and set them to displayTasks False
    } else{
      list.displayTasks = false;
      save();
    }

    //New TODO: This will select the list item that was already set to either displaytasks either T/F and based on that toggleOn() or toggleOff respectively, it will save it to LS.
    if(e.target.nodeName === 'SPAN' && e.target.parentNode.id === list.id && list.displayTasks === true){
      //Giving the selected list.name a variable so that I can pass it into the toggleOn function as a parameter, which will then be passed on to the taskCard()function as a parameter, and then used as the taskLiTitle innerText.
      var selectedText = list.name;
      toggleOn(selectedText);
    }
    
    else if(e.target.nodeName === 'SPAN' && e.target.parentNode.id === list.id && list.displayTasks === false){
      toggleOff();
      // console.log(list.name +' clicked so rest of list items display tasks set to false so toggle off')
      //   console.log('toggle on has been called from toggler and classname should be selected')
    }
    save()
    // For Edit button to not cause a drop down 
    if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'true') {
      for(let list of listItems) {
        // list.className = 'spanClass';
        list.displayTasks = false;
        save();
        // console.log(listItems)
        // console.log('edit button clicked, do not cause a drop down')
      }
      // console.log((list.name +' span was clicked on edit mode do not show Cont'));
      toggleOff();
    }
      renderLists();
  }
}
 
function scrollToTask() {
  var elmnt = document.getElementById("taskContainer");
  elmnt.scrollIntoView({behavior: "smooth", block: "end"});
}
//====================================================
//=============Toggle-On/Off-Functions======================
//====================================================
let displayDiv = document.getElementById('display');
displayDiv.style.display = 'none'
//ToggleOn was called from toggler function and had list.name passed as a parameter as selectedText
function toggleOn(selectedText) {
  displayDiv.style.display = 'block';
  taskCard(selectedText);
  //scroll to bottom of page when the list item is clicked on todo list and toggleOn and taskCard functions are called
  // window.scrollTo(0,1000);
  scrollToTask();
}

function toggleOff() {
  displayDiv.style.display = 'none';
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

//Build the taskCard that will be displayed on toggle if the list item is selected from the todo lists. I passed the selectedText from list.name as a parameter from toggler and into taskCard to be used in taskTitle element.
function taskCard(selectedText){
  // console.log(selectedText)
  let valueTest = typeof selectedText;
  // console.log(valueTest);//string
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
  //loops through the list items and looks at each span to see if selected, turns that span text to uppercase task title underlined
  spans.forEach(function(span){
    // if(span.className === "selected"){
    if(span.innerText === selectedText){
      idInNewList = span.parentNode.id
      // console.log(idInNewList); //id number as text, currently last list id in LS
      for(let list of lists) {
        if(list.displayTasks === true && list.name === selectedText){
          //selectedText was passed down as a parameter into the taskCard(selectedText) function
          taskLiTitle.innerText = selectedText.toUpperCase();
          taskCont.appendChild(taskLiTitle);
        } 
      }
    taskCont.appendChild(taskLiTitle);
    //Add taskCont to dropDown Container which is the div with display
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
        scrollToTask();
        //scroll to bottom of page when enter is pressed on task form
        // window.scrollTo(0,1000);
      }
    })

    

    //eventlistener on Task todo form where the value is entered into the form and added as a Task item when the BUTTON is clicked. It calls the function taskFormProcess which creates the task item.
    taskButton.addEventListener('click', ev5 => {
      ev5.preventDefault();
      taskFormProcess();
      scrollToTask();
      // console.log(newTaskFormItem);
      //scroll to bottom of page when button is clicked on task form
      // window.scrollTo(0,1000);
    });

    function taskFormProcess(){
      // console.log(newTask);//<ul id='newTask' ..This is where problem exists 4.12.2021 it should be pulling the text entered in the task form area
      // console.log(newList);
      //gets value from text area in taskform
      let taskName = taskFormTxt.value;
      //if empty return cell and user hits enter do the following after return
      if(taskName == null || taskName === '') return
      //creates a createList function with the text value as the parameter
      let task = createTaskList(taskName)
      //clears the form text input area of the text value so new text can be entered
      taskFormTxt.value = null;
    
      //Notes: Find out how to organize the below so it does not repeat for every list item
              //==========Keeper Area========//

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
        }
      //The task entered into the form is saved into the array of objects as a new task within the selected list item
      saveAndRender();
      renderTasks();
    };
            //=============New Test Area==============

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
            // console.log('it works')
            // console.log(n)
            // console.log(lists[i])
            // console.log(lists[i].tasks)
            // console.log(lists[i].tasks[n])
            lists[i].tasks.splice([n],1);
            // console.log(lists[i])
            break;
            save();
            renderTasks();
          }
        }
      }
    }

    //================Task Function Test==========================
    //Due to list item remaining crossed off after a new task item was added had to create an extra review of checkboxes. Now the linethrough is removed from a completed list item if a new task is entered which has no checkbox checked.
    function reviewChecks(){
      var cont = document.getElementById('newTask').children;
      console.log(cont);

      for (var i =0; i < lists.length; i++){
        // if(lists[i].id === idInNewList){
        if(lists[i].name === selectedText){
          console.log(lists[i].name + " has been selected during renderTasks")
          //text of list item
          // console.log(lists[i].tasks);

          //Loop through each task within the list items
          for(let n = 0, t = lists[i].tasks.length; n < t; n++){
            //lists all tasks entered
            var tasksInLists = lists[i].tasks[n];
            var arrayOfTasks = lists[i].tasks;
            var listName = lists[i].name;
            var listTask= lists[i].completedTasks;
            var listId = lists[i].id;

             // console.log(listName)
             console.log(lists[i].tasks[n])

             const engageListCrossOut = ()=> {
              // console.log('function engageListCrossOut was tripped')
              //Todo: find specific list item, these variables were declared earlier
              listThings = newList.querySelectorAll('span')
              //List item related to tasks that are all checked off has completedTasks set to true and saved in LS
              for(let listSelection of lists){
                // console.log(listSelection);
                // console.log(listSelection.completedTasks);
                // console.log(listSelection.id);
                if(listSelection.id === listId){
                  // console.log("yes trying to find only list item with this id and setting LS completedTasks to TRUE")
                  //TODO:Sets the Local Storage to True
                  listSelection.completedTasks = true;
                  // console.log(listSelection);
                } 
              }
            }
            //TODO:(Note: Changes LS property t/f) Does the opposite of above sets LS list property completedTasks as false
            const engageListNoCrossOut = ()=> {
              // console.log('function engageListNoCrossOut was tripped')
              for(let listSelection of lists){
                if(listSelection.id === listId){
                  listSelection.completedTasks = false;
                  // console.log(listSelection);
                }
              }
            }

            //TODO: checks if every check box in every task item is checked and therefore the complete is set to true. The every() method returns true if all elements in an array pass a test, provided as an arrow function below, Cheching if taskInLi is all complete === true.
            let taskCompleteChecker = arrayOfTasks.every(taskInLi =>
              taskInLi.complete === true);

            // console.log(taskCompleteChecker)
            //TODO: If statement calls the functions that will store the outcome in LS, either true or false, which will in turn put a linethrough through the parent list item
            if(taskCompleteChecker === false){
              engageListNoCrossOut();
              // console.log("hello it is false")
            } else if(taskCompleteChecker === true){
              engageListCrossOut();
              // console.log("hello it is true")
            }            

            saveAndRender();
          }
        }
      }

    }
    //================Task Function Test End==============


    // console.log(idInNewList)
    function renderTasks(){  
      clearTaskElement(newTask);
      //Loop through list items
      for (var i =0; i < lists.length; i++){
        // if(lists[i].id === idInNewList){
        if(lists[i].name === selectedText){
          console.log(lists[i].name + " has been selected during renderTasks")
          //text of list item
          // console.log(lists[i].tasks);

          //Loop through each task within the list items
          for(let n = 0, t = lists[i].tasks.length; n < t; n++){
            //lists all tasks entered
            var tasksInLists = lists[i].tasks[n];
            var arrayOfTasks = lists[i].tasks;
            var listName = lists[i].name;
            var listTask= lists[i].completedTasks;
            var listId = lists[i].id;

            console.log(listTask)
            listTask = false;

            // console.log(listName)
            console.log(lists[i].tasks[n])


            //=================================================================
            //=========================Functions===============================
            //Mostly used by Checkbox event but made accessible to other areas of renderTasks, specifically to removeTaskBtn event so if a checkbox is checked off on the only task remaining and that task is deleted it can remove the linethrough from the list item once the list has no more tasks.

            //TODO: (Note: Changes LS property t/f) Function that is tripped when all the checkboxes are checked in the tasks items. Trying to use this function to mark the list property completedTasks in LS as true and also set the list span to listCrossOut so it has a linethrough
            const engageListCrossOut = ()=> {
              // console.log('function engageListCrossOut was tripped')
              //Todo: find specific list item, these variables were declared earlier
              listThings = newList.querySelectorAll('span')
              //List item related to tasks that are all checked off has completedTasks set to true and saved in LS
              for(let listSelection of lists){
                // console.log(listSelection);
                // console.log(listSelection.completedTasks);
                // console.log(listSelection.id);
                if(listSelection.id === listId){
                  // console.log("yes trying to find only list item with this id and setting LS completedTasks to TRUE")
                  //TODO:Sets the Local Storage to True
                  listSelection.completedTasks = true;
                  // console.log(listSelection);
                } 
              }
            }
            //TODO:(Note: Changes LS property t/f) Does the opposite of above sets LS list property completedTasks as false
            const engageListNoCrossOut = ()=> {
              // console.log('function engageListNoCrossOut was tripped')
              for(let listSelection of lists){
                if(listSelection.id === listId){
                  listSelection.completedTasks = false;
                  // console.log(listSelection);
                }
              }
            }
            //=================================================================
            //=================================================================
            //create li
            const taskListElement = document.createElement('li');
            //put the id from the object into the task id being rendered
            taskListElement.id = tasksInLists.id;
            taskLiSpan = document.createElement('SPAN');

            //Looks through each task and checks the LS. If it is not checked off it should be set as complete === false so the class list should be 'noCrossOut' making the task not have a line-through or cross out. This checks every task.
            if(tasksInLists.complete === false){
              taskLiSpan.classList = 'noCrossOut';
            } else if (tasksInLists.complete === true){
              taskLiSpan.classList = 'crossOut';
            }
            let task = tasksInLists.name        
            // console.log(task)
            //text inside the span
            taskLiSpan.innerText = tasksInLists.name;
            //append span to lis
            taskListElement.appendChild(taskLiSpan);
            //HAVE TO LOOP THROUGH LIST ITEMS THEN GO THROUGH TASK
            //add form txt to span
          
            //clear text area
            const clearTaskTxt = document.getElementById('taskFormTxt');
            const removeTaskBtn = document.createElement('button');
            removeTaskBtn.classList = 'removeList';
            removeTaskBtn.innerText = 'x';
            taskListElement.appendChild(removeTaskBtn); 
            //Create the edit button 
            const editTaskButton = document.createElement('button');
            editTaskButton.id = 'editList';
            editTaskButton.innerText = 'Edit';
            taskListElement.appendChild(editTaskButton);
            //Create the checkbox
            const checkBox = document.createElement('input');
            checkBox.classList ='complete';
            checkBox.setAttribute('type', 'checkbox');
            checkBox.checked = tasksInLists.complete
            taskListElement.appendChild(checkBox);


            //--inner event function -- remove task item with x button
            removeTaskBtn.addEventListener('click', ev5 => {
              // ev5.target.parentNode.remove();
              //give a variable name to the task id that will be deleted
              deletedTaskId = ev5.target.parentNode.id;
              console.log(deletedTaskId);          
              //////for loop through each task array with the purpose of finding the id in the array    
              // let counter = 0;
              for(var t = 0; t < arrayOfTasks.length; t++){
                let taskObjIds = arrayOfTasks[t].id;
                console.log(arrayOfTasks[t].name)
                // if(arrayOfTasks[t].tasks === []){
                //   console.log('it is empty')
                // }
                //console.log(taskObjIds);
                //filter through each task array with function checkId to pull the idTask.id if it matches the evt.parent.id deletedTaskId then splice the task in the array from the object stored in LS
                let taskToDelete = arrayOfTasks.filter(checkId)
                function checkId(idTask){
                  console.log(idTask.id);
                  if(idTask.id === deletedTaskId){
                    // console.log(lists[i].name);
                    // console.log(arrayOfTasks[t].complete)
                    // arrayOfTasks[t].complete = false;
                    // console.log(arrayOfTasks[t].complete)
                    // console.log(lists)
                    arrayOfTasks.splice([n],1)
                  }
                }
                if(arrayOfTasks.length == "0"){
                  engageListNoCrossOut();
                  // console.log('find list item change to completedtasks false')
                }
                break;
              }
              ev5.target.parentNode.remove();
              
              saveAndRender();
              // deletedTask(task);
            });

            //Inner event function -- text entered in span within list to be editable
            editTaskButton.addEventListener('click', ev6 => {
              let  editTaskLiText = ev6.target.parentNode.firstChild
              editTaskLiText.contentEditable = true;
              //edit text is set to focus so you can see the box glow when in edit mode
              editTaskLiText.focus();
              editTaskButton.style.borderStyle = 'inset';
              editTaskButton.style.fontWeight = 'bolder';
              console.log(editTaskLiText)
              

              //Inner of Inner event function -- able to edit then press enter to no longer focus off of enter keydown
              editTaskLiText.addEventListener ("keydown", ev7 => {
                if(ev7.keyCode === 13) {
                  ev7.preventDefault();
                  console.log(ev7)
                  console.log(ev7.target.parentNode)
                  console.log(ev7.target.parentNode.id)
                  let taskLiId = ev7.target.parentNode.id;

                  console.log(ev7.target.parentNode.firstChild)

                  //removes focus on list item
                  editTaskLiText.contentEditable = false;
                  //removes borderstyle to show released edit button
                  editTaskButton.style.borderStyle = 'none'; 
                  // editTaskButton.style.fontWeight = 'none';
                  // editTaskButton.style.color = 'red';
                  let newTaskLiText = editTaskLiText.innerText;
                  console.log(newTaskLiText);
                  // console.log(lists[i].name);
                  // lists[i].name = newTaskLiText;
                  for(var v = 0; v < arrayOfTasks.length; v++){
                    console.log(arrayOfTasks[v].id)
                    let taskObjNames = arrayOfTasks[v].name;
                    if(taskLiId === arrayOfTasks[v].id){
                      console.log(arrayOfTasks.id)
                      console.log(taskObjNames);
                      //  taskObjNames = newTaskLiText;
                      arrayOfTasks[v].name = newTaskLiText;
                      console.log(taskObjNames)
                      save();
                      renderTasks();
                      renderLists();
                    }
                  }
                  // save()

              }
            })
          })                   

            //Inner of Inner event function for checkbox to be checked or unchecked and also cause the complete in local storage to be set to true or false
            checkBox.addEventListener('click', ev7 => {
              //Look at the parent task list item where you clicked the checkbox and look at the first child which is the span which has the cross out class and the name of the task as text. Other children are the other buttons such as remove and edit and check of course
              let editTaskOnCheck = ev7.target.parentNode.firstChild;
              console.log(editTaskOnCheck);
            
              let thisTaskId = ev7.target.parentNode.id;
              // console.log(thisTaskId);
             
              //TODO: Function sets attribute noCrossOut as a class when called and removes crossOut class
              const disengageCrossOut = ()=> {
                // console.log('function disnengageCrossOut was tripped')
                editTaskOnCheck.removeAttribute('class', 'crossOut');
                editTaskOnCheck.setAttribute('class', 'noCrossOut');
                // tasksInLists.complete = false;
                // console.log(tasksInLists)
                // saveAndRender();
                // renderTasks();
              }
              //TODO: Note(Changes Classes) Function sets attribute CrossOut as a class when called and removes noCrossOut class
              const engageCrossOut = ()=> {
                // console.log('function engageCrossOut was tripped')
                editTaskOnCheck.removeAttribute('class', 'noCrossOut');
                editTaskOnCheck.setAttribute('class', 'crossOut');
              }
              
              //TODO: Note(Changes Classes) Loops through tasks, then finds matching id of selected checkbox event and task, also checks if it has a class noCrossOut or crossOut. Depending on that calls function engageCrossOut() or disengageCrossOut() and also stores the change in LS as complete T/F
              let taskFinder = arrayOfTasks.find(taskInLi => {
                if(taskInLi.id === thisTaskId && editTaskOnCheck.classList.contains("noCrossOut")){
                  // console.log("check it")
                  engageCrossOut();
                  taskInLi.complete = true;
                  // saveAndRender();
                } else if(taskInLi.id === thisTaskId && editTaskOnCheck.classList.contains("crossOut")){
                  // console.log("uncheck it")
                  disengageCrossOut();
                  taskInLi.complete = false;
                  //saveAndRender();
                }
              }) 
              //TODO: checks if every check box in every task item is checked and therefore the complete is set to true. The every() method returns true if all elements in an array pass a test, provided as an arrow function below, Cheching if taskInLi is all complete === true.
              let taskCompleteChecker = arrayOfTasks.every(taskInLi =>
                taskInLi.complete === true);

              // console.log(taskCompleteChecker)
              //TODO: If statement calls the functions that will store the outcome in LS, either true or false, which will in turn put a linethrough through the parent list item
              if(taskCompleteChecker === false){
                engageListNoCrossOut();
                // console.log("hello it is false")
              } else if(taskCompleteChecker === true){
                engageListCrossOut();
                // console.log("hello it is true")
              }            

              saveAndRender();
            })
            reviewChecks();
            taskUl.appendChild(taskListElement);
            
          }
        }
      }
    }
  }
  })
}