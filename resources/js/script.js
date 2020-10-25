
//------------------Variables
const newList = document.getElementById('newList');
const newListFormItem = document.getElementById('todoForm')
// const listFormInp = document.getElementById('listAddButton')



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
  removeBtn.classList = 'removeList';
  removeBtn.innerText = 'x';
  li.appendChild(removeBtn);

  //--inner event function -- remove li item with x button
  removeBtn.addEventListener('click', ev => {
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

  //Inner event function -- Allows text entered in span within list to be editable -- Event of pressing edit button causes list item to have a focus and border highlight when editable
  
  editButton.addEventListener('click', ev2 => {
    let  editLiText = ev2.target.parentNode.firstChild;
    editLiText.contentEditable = true;
    //edit text is set to focus so you can see the box glow when in edit mode
    editLiText.focus();
    //===================================================================
    // editLiText.style.fontWeight = 'bold';
    //===================================================================
    //make button look pressed
    editButton.style.borderStyle = 'inset';

    //--------------------------------------
    //Note: create way of preventing clicking in list text from doing anything during content editable
    //--------------------------------------

    //Inner of Inner event function -- Event of pressing enter within editable text causes content to no longer be editable and for focus to be off
    editLiText.addEventListener ("keydown", ev3 => {
      if(ev3.keyCode === 13) {
        //removes focus on list item
        editLiText.contentEditable = false;
        //removes borderstyle to show released edit button
        editButton.style.borderStyle = 'none';
      }
    })
  })
})
 
  

    //===============================Bold==============================
  

    //todo list items are bold so you know which one is selected also created a pop out display container with the tasklist checkboxes
    function bolden(e){
      let listItems = newList.querySelectorAll('span');
      var displayDiv = document.getElementById('display');
      let emptyDiv = displayDiv.innerHTML = '';
      
      //Allows only 1 bold item at a time bc it iterates through each list item to check if any one is bold so it can unbold all and change className back to spanClass
      listItems.forEach(function(listItem){
        //if any are bold even one clicked previously make them all normal
        if(listItem.style.fontWeight = 'bold'){
          listItems.forEach(function(listItem){
            listItem.style.fontWeight = 'normal'
            listItem.className = 'spanClass'
          })
        }
      })
      // If statement - turns anything selected to be bold and changes class name to 'Selected and the display id visible but empties it then adds the taskCard details
      if(e.target.style.fontWeight === 'normal'|| !e.target.style.fontWeight) {
        e.target.style.fontWeight = 'bold';
        e.target.className = 'selected';
        displayDiv.style.display = "block";
        emptyDiv
        taskCard();
      //If it is already bold turns the fontweight normal keeps diplay id visible also empties it
      }else if (e.target.style.fontWeight === 'bold') {
        e.target.style.fontWeight = 'normal';
        // e.target.className = 'preSelected';
        displayDiv.style.display = "block";
        // let divCon = document.getElementById('display');
        emptyDiv
      }

    }
    newList.addEventListener('click', bolden, false)

   



    //==============================================================
    //End TASK FORM DIVDFD

  //======================Task List Details================================
  function taskCard(){

    let dropDownCont = document.getElementById('display');

    //Create container div
    const taskCont = document.createElement('div');
  
    taskCont.id='taskContainer'
    
    //---------------Task Title from todo list item--------------
    let taskLiTitle = document.createElement('h2');
    taskLiTitle.class= "title";

    let spans = newList.querySelectorAll("span");

    spans.forEach(function(span){
      // console.log(span.className);
      if(span.className == "selected"){
        let spanTextNeeded = span.innerText;
        taskLiTitle.innerText = spanTextNeeded;
        taskCont.appendChild(taskLiTitle);
      } else{
        
      }
    });

    //==========================================

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
    })
  }

 