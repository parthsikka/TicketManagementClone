


for(let a=0 ; a<allFilters.length ; a++){
    allFilters[a].addEventListener("click", function(e){
        let clickClass = e.target.classList[1] ;
        
        if(e.target.classList.contains("active-filter")){
            e.target.classList.remove("active-filter") ;
            ticketArea.innerHTML = "" ;
            let ticks = JSON.parse(localStorage.getItem("allTickets")); 
            for(let i=0 ; i<ticks.length ; i++){
                appendTicket(ticks[i].ticketId, ticks[i].ticketText, ticks[i].ticketFilter) ;
            }
            return ;
        }
        let select = document.querySelector(".active-filter") ; 
        if(select){
            document.querySelector(".active-filter").classList.remove("active-filter")  ;
            
        }
         
        e.target.classList.add("active-filter") ; // this is the code to turn on the active filter!
        sortTickets(clickClass) ; 
        
    })
}
// open-Modal WorkFlow : 
modalOpen.addEventListener("click", function(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove() ;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("modal") ;
    newDiv.innerHTML = `<div class="modal-text" contenteditable="true" spellcheck="false" data-typed = "false">Enter your Text Here!!</div>
    <div class="modal-filter-options">
        <div class="modal-filter yellow"></div>
        <div class="modal-filter blue"></div>
        <div class="modal-filter black active-filter"></div> 
        <div class="modal-filter green"></div>
    </div>`
    ticketArea.append(newDiv) ;
    let modalText = document.querySelector(".modal-text") ;
    //Empty Modal Text on KeyPress  : 
    modalText.addEventListener("keypress", function(e){
        
        // to append the ticket if Enter is Pressed : 
        if(e.key == "Enter" && e.target.getAttribute("data-typed")=="true"){
           AppendTicket(modalText.innerText) ;
        }
        if(modalText.getAttribute("data-typed") == "true"){
        return ; 
    }
   
    e.target.innerText = "" ;
    modalText.setAttribute("data-typed", "true") ;
     })
     // active filtering the colour filters : 
     document.querySelector(".modal-filter-options").addEventListener("click", function(e){
         if(e.target.classList.contains("active-filter")){
             return ; 
         }else{
             newDiv.querySelector(".active-filter").classList.remove("active-filter") ;
             e.target.classList.add("active-filter") ;
         }
         // setting the active filter variable so that when we create the ticket, we know which colour to append it in !
         activeModalFilter = e.target.classList[1] ;
         
     })

})

// CLose-Modal WorkFlow : 

modalClose.addEventListener("click",CloseModal) ;
function CloseModal(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove() ;
    }
}

function AppendTicket(ticketText){
   
    if(!ticketText.length){
        return ;
    }
    let ticketDiv = document.createElement("div") ;
    ticketDiv.classList.add("tickets") ;
    let ticketId = uid() ;
    ticketDiv.innerHTML = `<div id=${ticketId} class="ticket-colour"></div>
    <div class="ticket-content">
        <div class="ticketID">${ticketId}</div>
        <div class="ticketBody"></div>                
    </div>`
    ticketDiv.querySelector(".ticketBody").innerText = ticketText ; 
    ticketArea.append(ticketDiv) ;
    ticketDiv.querySelector(".ticket-colour").style.background = colorCodes[activeModalFilter] ;

    let ticketObject = {
        ticketId : ticketId, 
        ticketText : ticketText,
        ticketFilter : activeModalFilter
    }

    let allData = JSON.parse(localStorage.getItem("allTickets")) ;
    allData.push(ticketObject) ;
    localStorage.setItem("allTickets", JSON.stringify(allData)) ;
    activeModalFilter = "black" ;
    CloseModal() ;
}


function sortTickets(filterSelected){
    let allTickets = JSON.parse(localStorage.getItem("allTickets")) ;
    let filteredTickets = allTickets.filter( currentTicket =>{
        return currentTicket.ticketFilter == filterSelected ;
    });
    ticketArea.innerHTML = "" ;
    for(let a=0 ; a<filteredTickets.length ; a++){
        appendTicket(filteredTickets[a].ticketId, filteredTickets[a].ticketText, filteredTickets[a].ticketFilter) ;
    }
}