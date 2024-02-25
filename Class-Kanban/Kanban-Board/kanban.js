let body = document.querySelector("body")
let addButton = document.querySelector(".add-btn")
let removeButton = document.querySelector(".remove-btn")
let modalContainer = document.querySelector(".modal-cont")
let mainContainer = document.querySelector(".main-cont")
let textAreaCont= document.querySelector(".textArea-cont")
let allPriorityColors = document.querySelectorAll('.priority-color')

let toolboxColors = document.querySelectorAll('.color')

let lockClass = 'fa-Lock'
let unlockClass = 'fa-lock-open'

let addFlag = false;
let removeFlag = false
let colors = ['lightpink','lightgreen','lightblue','black']
let modalPrioritycolor = colors[colors.length - 1]

let ticketsArr = []


//local storage
if (localStorage.getItem('ticketsStorage')) {
  ticketsArr = JSON.parse(localStorage.getItem('ticketsStorage'))
  
    ticketsArr.forEach(function (ticket) {
    createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId)
  })
}



//selecting color from toolbox and filtering it accordingly
for (let i = 0; i < toolboxColors.length; i++){

  toolboxColors[i].addEventListener('click', function () {
    let selectedToolBoxColor = toolboxColors[i].classList[0]

    let filteredTickets = ticketsArr.filter(function (ticket) {
      return selectedToolBoxColor === ticket.ticketColor
    })
    // console.log(filteredTickets)

    //we have to remove all the tickets
    let allTickets = document.querySelectorAll('.ticket-cont')
    for (let j = 0; j < allTickets.length; j++){
      allTickets[j].remove()
    }
    
    filteredTickets.forEach(function (filterTicket) {
      createTicket(filterTicket.ticketColor,
                   filterTicket.ticketTask,
                   filterTicket.ticketId)
    })

  })
}


//selecting the color for ticket in the modal-cont(main-text-box)
allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener('click', function () {
    
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove('active')
    })

    colorElem.classList.add('active')
    modalPrioritycolor = colorElem.classList[0]
    //console.log(modalPrioritycolor)
  })

})



addButton.addEventListener("click", function () {
  addFlag = !addFlag
  
  if (addFlag == true) {
    modalContainer.style.display = 'flex'
    mainContainer.style.display = 'none'
  }
  else {
    modalContainer.style.display = 'none'
   
  }
})



removeButton.addEventListener('click', function () {
  removeFlag = !removeFlag
  if (removeFlag == true) {
    alert("Delete button has been activated")
    removeButton.style.color = 'red'
  }
  else {
    removeButton.style.color = 'white'
  }
})



//generate a ticket

modalContainer.addEventListener('keydown', function (e){
  let keys = e.key

  if (keys === 'Shift') {
    createTicket( modalPrioritycolor, textAreaCont.value )
    modalContainer.style.display = 'none'
    mainContainer.style.display = 'flex'
    textAreaCont.value = ''

  }
})



function createTicket(ticketColor, ticketTask, ticketId) {
  //done to solve problem of dublicacy after clicking on toolbox color duplicate tickets generated
  let id = ticketId || shortid(); // give boolean value , if ticketId is undefined it will call shortid()

  let ticketCont = document.createElement('div')
  ticketCont.setAttribute('class', 'ticket-cont')

  ticketCont.innerHTML =`<div class="ticket-color ${ticketColor} "></div>
      <div class="ticket-id">${id}</div>
      <div class="task-area" contenteditble ='true'>${ticketTask} </div>
      <div class="ticket-lock">
      <i class="fa-solid fa-lock"></i>
      </div>`

  mainContainer.appendChild(ticketCont)

  if (!ticketId) { 
    ticketsArr.push({ ticketColor, ticketTask, ticketId: id })
    localStorage.setItem('ticketsStorage',JSON.stringify(ticketsArr))
  }
  
  handleRemover(ticketCont,id)
  handleLock(ticketCont,id)
  handleColor(ticketCont,id)
}



function handleRemover(ticket,id) {
    ticket.addEventListener('click', function () {
   
    if (!removeFlag) return
    
    let Idx = getTicketIndex(id)
    ticket.remove()
    let deletedElement = ticketsArr.splice(Idx, 1) // delete the whole ticket of particular index
    
    console.log(deletedElement)
    
    localStorage.setItem('ticketsStorage', JSON.stringify(ticketsArr))

  })
}



function handleLock(ticket, id) {
  
  let ticketLockEle = ticket.querySelector('.ticket-lock')
  let tickeTaskArea = ticket.querySelector('.task-area')

  let ticketLockIcon =ticketLockEle.children[0]
  ticketLockEle.addEventListener('click', function () {

    let ticketIndex = getTicketIndex(id)

    if (ticketLockIcon.classList.contains(lockClass)) {
      ticketLockIcon.classList.remove(lockClass)
      ticketLockIcon.classList.add(unlockClass)
      tickeTaskArea.setAttribute('contenteditable','true')
    }
    else {
      ticketLockIcon.classList.remove(unlockClass)
      ticketLockIcon.classList.add(lockClass)
      tickeTaskArea.setAttribute('contenteditable','false')
    }


    ticketsArr[ticketIndex].ticketTask = tickeTaskArea.innerText // updated taskArea
    localStorage.setItem('ticketsStorage',JSON.stringify(ticketsArr))
    
     //console.log('clicked')
    })
}




// to change the band color of the ticket
function handleColor(ticket,id) {
  let ticketColorBand = ticket.querySelector('.ticket-color')
  
  ticketColorBand.addEventListener('click', function () {
      
    let ticketIndex = getTicketIndex(id)
      
      //console.log(ticketColorBand)
      let currentColor = ticketColorBand.classList[1]
      
    let currentColorIdx = colors.findIndex(function (color) {
        return currentColor === color 
    })
      currentColorIdx++;

      let newTicketColorIdx = currentColorIdx % colors.length

      let newTicketColor = colors[newTicketColorIdx]

      ticketColorBand.classList.remove(currentColor)
      ticketColorBand.classList.add(newTicketColor)
    
    
  
      ticketsArr[ticketIndex].ticketColor = newTicketColor // updated color in local store
      localStorage.setItem('ticketsStorage',JSON.stringify(ticketsArr))

  })
}




function getTicketIndex(id) {
  let ticketIndex = ticketsArr.findIndex(function (ticketIdx) {
    return id ==ticketIdx.ticketId
  })
  console.log(ticketIndex)
  return ticketIndex
}



//1.display all tickets button
//2. compartmentize the priority when display all the tickets
//3. drag and drop and also changes the band color in it  