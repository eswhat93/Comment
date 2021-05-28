const Request = function() {  
    this.getParameter = function(name) {  
        let rtnval = '';  
        let nowAddress = unescape(location.href);  
        let parameters = (nowAddress.slice(nowAddress.indexOf('?') + 1,  
                nowAddress.length)).split('&');  
        for (let i = 0; i < parameters.length; i++) {  
            let varName = parameters[i].split('=')[0];  
            if (varName.toUpperCase() == name.toUpperCase()) {  
                rtnval = parameters[i].split('=')[1];  
                break;  
            }  
        }  
        return rtnval;  
    }  
}  

const request = new Request(),  
getUser = request.getParameter('user'),  
getId = request.getParameter('id'),
getText = request.getParameter('text');  

const form = document.querySelector('.js-editForm'),
id = document.querySelector('.js-idView'),
text = document.querySelector('.js-editComment'),
btn = form.querySelector(".js-edit");

const STATE_LS = "edits";
const edit=[];

function saveEdit(){
    localStorage.setItem(STATE_LS, JSON.stringify(edit));
}

function getTime(){
    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    return `${year}.${month}.${day}.${hours < 10 ? `0${hours}`:hours}:${minutes < 10 ? `0${minutes}`:minutes}`

}
//금지어 등록 막기
function banText(text) {
    
    const ban=["금지어","테스트"];
    
    let textConfirm = text;
    textConfirm = textConfirm.toLowerCase();
    banIdx = 0;
    while (banIdx <= ban.length - 1) {
        if (textConfirm.indexOf(ban[banIdx]) > -1) {
            alert(ban[banIdx] + " 은(는) 금지어입니다.");
            return false;
        }
        banIdx++;
    }
    return true;
}
//수정, 리스트 보여주기
function send(event){
    const banFlag= banText(text.value);
    if(!banFlag) return false;
    
    const comfirm = confirm("수정하시겠습니까?");
    if(comfirm){
        const editTime = getTime();
        const editId = getId;
        const editText = text.value;
        const user = getUser;

        const editObj={
            text:editText,
            id:editId,
            user,
            date:editTime
        }

        edit.push(editObj);
        saveEdit();
        
        window.opener.name = "index";
        form.target = "index";
        form.action =`index.html`;
        form.submit();
        self.close();
    }

}

function init(){
    id.innerText=getUser;
    text.value=getText;

    btn.addEventListener("click",send);
    
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
        };
      }, true);
}

init();
