const socket = io()
let textarea=document.querySelector('#textarea')
let Name;
let messageArea=document.querySelector('.message_area')
do{
 Name=prompt('Enter Your Name: ')
}while(!Name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
       sendMessage(e.target.value)
    }
   })
   function sendMessage(message){
       let msg={
           user: Name,
           message: message.trim()
       }
       //append
       appendMessage(msg,'outgoing')
       textarea.value=''
       scrolltobottom()
       //send to server
       socket.emit('message',msg)
     
   }
   function appendMessage(msg,type){
      let mainDiv=document.createElement('div')
      let className=type
      mainDiv.classList.add(className,'message')
      let markup=`
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
      `
      mainDiv.innerHTML=markup
      messageArea.appendChild(mainDiv)
   }
   //recieve
   socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltobottom()
   })
   function scrolltobottom(){
    messageArea.scrollTop=messageArea.scrollHeight
   }