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


for(let a=0 ; a<allFilters.length ; a++){
    allFilters[a].addEventListener("click", function(e){
        let clickClass = e.target.classList[1] ;
        console.log(clickClass); 
        if(e.target.classList.contains("active-filter")){
            e.target.classList.remove("active-filter") ;
            ticketArea.style.background = "#1e272e" ;
            return ;

        }
        let select = document.querySelector(".active-filter") ; 
        if(select){
            document.querySelector(".active-filter").classList.remove("active-filter")  ;
            
        }
           
        
        
        e.target.classList.add("active-filter") ; // this is the code to turn on the active filter!
        ticketArea.style.background = colorCodes[clickClass] ;
        
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
modalClose.addEventListener("click", function(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove() ;
    }
})





