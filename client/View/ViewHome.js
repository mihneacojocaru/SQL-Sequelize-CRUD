import Data from "../Data/data.js"
export default class ViewHome{
    
    constructor(){
        this.root = document.getElementById('root');
        this.root.innerHTML += this.pageHtml();
        this.chatClick();
        this.updateChat();
        this.styleFunction();
    }

    pageHtml = () => {
        
        return `<h2>Chat-App&trade;</h2>
        <div class="container">
            <div class="window">
                <div class="top">
                    <h3>John Doe</h3>
                    <p>Online now</p>
                </div>
                <div class="body-outer">
                <div id="chat1" class="body"></div>
                </div>
                <div class="bottom">
                    <textarea id="chat1TA" type="text" placeholder="Type Message..."></textarea>
                    <span id="chat1Btn" class="material-icons">send</span>
                </div>
            </div>
            <div class="window">
                <div class="top">
                    <h3>Mark Scott</h3>
                    <p>Online now</p>
                </div>
                <div id="chat2" class="body"></div>
                <div class="bottom">
                    <textarea id="chat2TA" type="text" placeholder="Type Message..."></textarea>
                    <span id="chat2Btn" class="material-icons">send</span>
                </div>
            </div>
        </div>
    `;
    }

    //--- HTML FUNCTIONS

    chatClick = () => {
        let chat1Click = document.querySelectorAll('#chat1Btn');
        let chat2Click = document.querySelectorAll('#chat2Btn');

        chat1Click.forEach( e=> {
            e.addEventListener('click',this.eventHandler);
        });

        chat2Click.forEach( e=> {
            e.addEventListener('click',this.eventHandler);
        });

    }

    eventHandler = async e => {
        let obj = e.target;
        if(obj.id == 'chat1Btn'){
            let message = document.getElementById('chat1TA');
            let data = {
                "username": "john.doe",
            }
            data.message = message.value;
            await this.sendMessage(data);
        }else if(obj.id == 'chat2Btn'){
            let message = document.getElementById('chat2TA');
            let data = {
                "username": "mark.scott",
            }
            data.message = message.value;
            await this.sendMessage(data);
        }
    }

    messHTMLFunction = (item,message,time,id) => {

        let sender = `<div class="sender">
        <div class="bubble">
        <span id="${id}">${message}</span>
        <br>
        <span>${time}</span>
        </div>
        </div>`;

        let receiver = `<div class="receiver"><div class="bubble">
        <span id="${id}">${message}</span>
        <br>
        <span>${time}</span>
        </div>
        </div>`;

        if(item == 'purple'){
            return sender;
        }else if(item == 'gray'){
            return receiver;
        }
    }

    addChat1 = (type,message,time,id) => {
        let chat1 = document.getElementById('chat1');
        let item = this.messHTMLFunction(type,message,time,id);
        chat1.innerHTML += item;   
    }

    addChat2 = (type,message,time,id) => {
        let chat2 = document.getElementById('chat2');
        let item = this.messHTMLFunction(type,message,time,id); 
        chat2.innerHTML += item;
    }

    //+++ Update-Chat

    updateChat = async () =>{
        let d = await this.getMessages();
        d.forEach(e => {
            if(e.username == 'john.doe'){
                let time = e.time_sent;
                time = time.charAt(11) + time.charAt(12) + time.charAt(13) + time.charAt(14) + time.charAt(15);
                this.addChat1('purple',e.message,time,e.id);
                this.addChat2('gray', e.message,time,e.id);
            }else if(e.username == 'mark.scott'){
                let time = e.time_sent;
                time = time.charAt(11) + time.charAt(12) + time.charAt(13) + time.charAt(14) + time.charAt(15);
                this.addChat1('gray',e.message,time,e.id);
                this.addChat2('purple', e.message,time,e.id);
            }
        });
    }

    //+++ API FUNCTIONS
    
    getMessages = async () => {
        const apiData = new Data();
        const messages = await apiData.getMessages();
        return messages;
    }

    sendMessage = async (message) => {
        const apiData = new Data();
        let r = await apiData.sendMessage(message);
        if(r=="Item succesfuly posted"){
            location.reload();
        }else{
            alert(r.error.message);
        }
    }

    styleFunction = () => {
         let chat = document.getElementById('chat1');
         let x = chat.scrollHeight;
         chat.scrollTo(0,400);
        // console.log(t.scrollHeight);
        //chat.style.border = '3px solid black';
        chat.addEventListener('scroll', (e)=>console.log(e))
    }
}

