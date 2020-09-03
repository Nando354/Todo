
//------------------Variables
const newList = document.getElementById('newList');
const newListFormItem = document.getElementById('form')
const listFormInp = document.getElementById('listAddButton')




//---------------------------------

let listArrs = [];
let listObj = {};



//-----------------Event Listeners



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
  //inner event function remove li item
  removeBtn.addEventListener('click', function(ev){
    // console.log(document.getElementsByClassName('removeList')[0]);
    // console.log(ev);
    // console.log(document.getElementsByClassName('spanClass')[0])
    // document.getElementsByClassName('removeList')[0].parentNode.remove();
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

  //Notes: Create todo details title from todo list then add the list fields

  //Now i get the title but it stays Need to figure out how to reset it when it is edited but leave it clickable too, thinking maybe a new card pops up every time there is a change. So create new card.
  //

  //-----------List Details---
  const liText = document.getElementsByClassName('spanClass')[0];

  // liText.addEventListener('click', function(ev4){
  //   //Note: make it click only once
  //   //Create h2 title
  //   let taskLiTitle = document.createElement('h2');
  //   // //put list item as title in h2
  //   taskLiTitle.innerText = document.getElementsByClassName('spanClass')[0].innerHTML;
  //   document.getElementById('newTask').appendChild(taskLiTitle);
  // })


  
  // set title of list on list Details 
  liText.addEventListener('click', setTitle);

  function setTitle(){
    //Create h2 title
    let taskLiTitle = document.createElement('h2');
    // //put list item as title in h2
    taskLiTitle.innerText = document.getElementsByClassName('spanClass')[0].innerHTML;
    document.getElementById('newTask').appendChild(taskLiTitle);
  }

  setTimeout(function(){
    liText.removeEventListener('click', setTitle)
  }, 2000)

  


 

  

  
  
    // getElementById('newTask').appendChild(li);
    // li.appendChild(liSpan);
    // liSpan.innerText = taskFormTxt;
    // //add classname to span
    // liSpan.classList = 'taskClass'
    // //clear text area
    // const clearTaskTxt = document.getElementById('taskFormTxt')
    // clearTaskTxt.value="";
    // //Create the remove button
    // const removeTaskBtn = document.createElement('button');
    // removeTaskBtn.classList = 'removeTaskList';
    // removeTaskBtn.innerText = 'x';
    // li.appendChild(removeTaskBtn);
  })


  // function getNodes() {
    // var ch = newList.getElementsByClassName(liSpanClass).childNodes
    // console.log(liText)
  // }
  // getNodes()




  // })



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




  




 