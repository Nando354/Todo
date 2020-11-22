

//------------------Variables
const newList = document.getElementById('newList');
const newListFormItem = document.getElementById('todoForm')

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
  //append span to li
  li.appendChild(liSpan);
  //add text typed into form to go in the span as innerText
  liSpan.innerText = listFormTxt;
  //declare text in span
  let textInSpan = liSpan.innerText;
  //add classname to span
  liSpan.classList = 'spanClass'
  //clear text area
  const clearTxt = document.getElementById('listFormTxt')
  clearTxt.value="";
  //Create the remove button
  const removeBtn = document.createElement('button');
  removeBtn.id = 'removeList';
  removeBtn.innerText = 'x';
  li.appendChild(removeBtn);
    //==============================================================
    //======================Delete button=============================
    //==============================================================

  //--inner event function -- remove li item with x button
  removeBtn.addEventListener('click', e => {
    //removes list item
    console.log(e.target);
    e.target.parentNode.remove();
    console.log('remove button clicked');
  });
  
  //ul append li with button to remove
  newList.appendChild(li)
  //add edit button, button to be pressed when editing
  const editButton = document.createElement('button');
  editButton.id = 'editList';
  editButton.innerText = 'Edit';
  //add edit button to li
  li.appendChild(editButton);

  //Inner event function -- Allows text entered in span within list to be editable -- Event of pressing edit button causes list item to have a focus and border highlight when editable

  //==============================================================
  //==============================================================
  //====================Edit Button===============================
  //==============================================================
  // editButton.addEventListener('click', deBolden, false);
  editButton.addEventListener('click', e => {
    // hideCont();
    console.log(e.target);
    let  editLiText = e.target.parentNode.firstChild;
    console.log(editLiText); //span
    editLiText.contentEditable = 'true';
    //edit text is set to focus so you can see the box glow when in edit mode
    editLiText.focus();
    //===================================================================
    // editLiText.style.fontWeight = 'bold';
    //===================================================================
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
      }
    })
  })
})

    //===============================Toggler==============================

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
      if(e.target.nodeName === 'SPAN' && e.target.contentEditable === 'true'){
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
    newList.addEventListener('click', toggler, false)

    //==============================================================
    //======================Toggle Functions========================================
    //==============================================================
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

  function taskCard(){

    let dropDownCont = document.getElementById('display');

    //Create container div
    const taskCont = document.createElement('div');
  
    taskCont.id='taskContainer';

    taskCont.className='container';
    
    //---------------Task Title from todo list item--------------
    let taskLiTitle = document.createElement('h2');
    taskLiTitle.class= "title";

    let spans = newList.querySelectorAll("span");

    spans.forEach(function(span){
      if(span.className === "selected"){
        let spanTextNeeded = span.innerText;
        taskLiTitle.innerText = spanTextNeeded;
        taskCont.appendChild(taskLiTitle);
      } 
    });

    //=======Create Task Area========//

    taskCont.appendChild(taskLiTitle);

    //TASK FORM DIV
    //Create task form Div
    const taskFormDiv = document.createElement('div');
    taskFormDiv.classList.add = 'taskFormDiv';
    taskCont.appendChild(taskFormDiv);

    //-----TASK FORM
    //Create task form
    const taskForm = document.createElement('form');
    taskForm.setAttribute('action', '#');
    taskForm.classList.add = 'taskForm';
    taskFormDiv.appendChild(taskForm);
   
    //Create task textarea
    let taskText = document.createElement('TEXTAREA');
    taskText.id = 'taskFormTxt';
    taskForm.appendChild(taskText);
    

    //Create task input button
    const taskButton = document.createElement('button');
    taskButton.id = 'taskAddButton';
    taskButton.setAttribute('type', 'submit')
    taskButton.setAttribute('value', '+')
    taskButton.innerText = '+';
    taskForm.appendChild(taskButton);
    
    //Create tasks div
    const taskDiv = document.createElement('div')
    taskDiv.classList.add = 'tasks';
    taskCont.appendChild(taskDiv);
    
    // Create task ul
    taskUl = document.createElement('ul');
    taskUl.classList.add = 'newTask';
    taskDiv.appendChild(taskUl);

    //Add taskCont to dropDown Container
    dropDownCont.appendChild(taskCont);
    
    //----Button to add task details entered into taskform
    taskButton.addEventListener('click', ev5 => {
      ev5.preventDefault();
      //gets value from text area in taskform
      let taskFormTxt = document.getElementById('taskFormTxt').value;
      //Create task li
      taskLi = document.createElement('li');
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
    })
  }

  //Note 11-17
  //Make font bigger and text areas etc
 