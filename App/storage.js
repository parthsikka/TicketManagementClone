// let tick = {
//     ticketId :"#1243", 
//     ticketText : "Hello CSS!!", 
//     ticketFilter : "green" 
// }

// localStorage.setItem("allTickets", JSON.stringify([tick])) ;

let TicketStore = JSON.parse(localStorage.getItem("allTickets")) ;
let colorCodes ={
    blue : "#4834d4", 
    yellow: "#ffbe76", 
    black : "#535c68", 
    green: "#6ab04c"
}
let allFilters = document.querySelectorAll(".filter") ;
let ticketArea = document.querySelector(".ticketContainer") ;
let modalOpen = document.querySelector(".add-modal");
let modalClose = document.querySelector(".close-modal");
let activeModalFilter = "black"

function init(){
if(!TicketStore){
    console.log("No tickets found!");
    localStorage.setItem("allTickets", JSON.stringify([])) ;
    return ; 
}

for(let a=0 ; a<TicketStore.length ; a++){
    let {ticketId, ticketText, ticketFilter} = TicketStore[a] ;
    appendTicket(ticketId, ticketText, ticketFilter) ;
} 
}
init() ;

function appendTicket(ticketId, ticketText, ticketFilter){
    let ticketDiv = document.createElement("div") ;
    ticketDiv.classList.add("tickets") ;
    ticketDiv.innerHTML = `<div class="ticket-colour"></div>
    <div class="ticket-content">
        <div class="ticketID"> ${ticketId}</div>
        <div class="ticketBody">${ticketText}</div>                
    </div>`
    ticketDiv.querySelector(".ticket-colour").style.background = colorCodes[ticketFilter] ;
    ticketArea.append(ticketDiv) ;
}
