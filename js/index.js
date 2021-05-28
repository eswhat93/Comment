
const written = document.querySelector('.item2'),
commentForm = document.querySelector('.js-commentForm'),
commentInput = commentForm.querySelector('input'),
commentList = document.querySelector('.js-list'),
count = document.querySelector(".js-count");


const closeModal = document.querySelector('.modal_close'),
loginView = document.querySelector(".js-login"),
loginView2 = document.querySelector(".js-login2"),
USERID=document.querySelector(".user");

const userConfirm = "ComfirmedId";


//********로그인창모달
const modalWrap = document.querySelector('.modal_wrap'),
blackBg = document.querySelector('.black_bg'),
snsBtn = document.querySelector('.js-sns');
///////////////////////


//댓글 저장 배열
const COMMENT_LS = "comments";
let comments =[];

//댓글 수정 내용
let EDIT_LS ="edits";

//댓글 등록과 댓글 내용
const commentEnter = document.querySelector('.js-enter'),
commentContent = document.querySelector('.js-content');


//좋아요 싫어요
const like = document.querySelector(".js-like"),
unlike = document.querySelector(".js-unlike"),
likeCnt = document.querySelector(".js-like-count"),
unlikeCnt = document.querySelector(".js-unlike-count");

//도배방지
let doubleSubmitFlag = false;

//저장된 댓글 불러오기
function loadedWritten(){
    //수정댓글 있으면 이때 고치기

    const loadedComment = localStorage.getItem(COMMENT_LS);
    console.log("불러온댓글"+loadedComment);
    //localStorage.removeItem(COMMENT_LS);
    const edits = localStorage.getItem(EDIT_LS);
    
    
   //console.log(loadedComment.length)
    if(loadedComment !== null){
        const parsedComment = JSON.parse(loadedComment);

        parsedComment.forEach(function(com){
            if(edits !== null){
                const parsedEdit = JSON.parse(edits);
                parsedEdit.forEach(function(comEdit){
                    if(comEdit.id == com.id){
                        com.text = comEdit.text;
                        addInput(com.text);
                    }
                    else{
                        addInput(com.text);
                    }
                })
        
            }
            else{
                addInput(com.text);
            }
        });
    }
    else{
    }
}

//댓글수정버튼
function editComment(event){
    const btn = event.target;
    const div = btn.parentNode;

    const url = `edit.html?user=${comments[div.id].user}&id=${comments[div.id].id}&text=${comments[div.id].text}`;
    const name ="댓글수정";
    const option = "width = 500, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);
}
//댓글삭제버튼
function deleteComment(event){
    const btn = event.target;
    const div = btn.parentNode;
    
    commentList.removeChild(div);
    const cleanComment = comments.filter(function(com){
        return com.id !=parseInt(div.id);
    });
    comments = cleanComment;
    saveComment("DELETE");
    cnt();
}
//댓글 로컬 저장
function saveComment(state){
    console.log("저장할때"+comments);
    localStorage.setItem(COMMENT_LS, JSON.stringify(comments));
    cnt();
    if(state=="DELETE"){doubleSubmitFlag = false;}
    //수정값 비워주기
    localStorage.removeItem(EDIT_LS);
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
//입력 댓글 만들기
function addInput(text){
    if(!(text.trim())) return false;
    const banFlag= banText(text);
    if(!banFlag) return false;
    
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const div3 = document.createElement("div");
    const commentId = comments.length;
    const userId = localStorage.getItem(userConfirm);
    const delBtn = document.createElement("button");
    delBtn.innerHTML="삭제";

    const editBtn = document.createElement("button");
    editBtn.innerHTML="수정";

    const time = getTime();

    delBtn.addEventListener("click",deleteComment);
    editBtn.addEventListener("click",editComment);

    const string = `<header class='top'>
    <div class='user_container'>
        <div class='profile_img'>
            <img src='images/thum.jpg' alt='프로필이미지'/>
        </div>
        
        <div class='user_name'>
            <div class="nick_name m_text js-idView">${userId}</div>
        </div>
        <div class ='js-time' style='padding-left:20px'>${time}</div>
    </div>
    
    <div>`;
    
    div1.innerHTML = string;
    div.appendChild(div1);
    div.appendChild(delBtn);
    div.appendChild(editBtn);
    const stringAdd = 
    `</div>
</header>
<div class='js-content'>
    <div style='width:400px; height:100px'>
        <div style='width:100%; padding: 20px; text-align: center;'><h2>${text}</h2></div>
    </div>
</div>

<div class='bottom_icons'>
    <div class='left_icons'>
        <div class='sprite_bubble_icon js-count'></div>
    </div>
    <div class='right_icon'>
        <img id="1" class="like_img js-like" src="images/like-black.png"/><div class="js-like-count w_text"></div>
        <img id="2"class="unlike_img js-unlike" src="images/like-black.png"/><div class="js-unlike-count w_text"></div>
    </div>
</div>
<hr>`;
    div3.innerHTML = stringAdd;
    div.appendChild(div3);
    div.id = commentId;

    commentList.appendChild(div);

    const commentObj = {
        text,
        id:commentId,
        user:userId,
        date:time,
        like,
        unlike
    };
    comments.push(commentObj);
    saveComment("ENTER");
    
}
//도배방지
function doubleSubmitCheck(){
    if(doubleSubmitFlag){
        return doubleSubmitFlag; 
    }else{
        doubleSubmitFlag = true; 
        return false; 
    }

}
function handleSubmit(event){
    event.preventDefault();
    //테스트후 주석풀기
    //if(doubleSubmitCheck()) return;
    const currentValue = commentInput.value;
    addInput(currentValue);
    commentInput.value="";
}

//로그인 팝업창
function popup(event){
    const url = "login.html";
    const name ="로그인창";
    const option = "width = 500, height = 500, top = 100, left = 200, location = no"
    window.open(url, name, option);
}

function onClick() {
    modalWrap.style.display ='block';
    blackBg.style.display ='block';


    //만약 네이버-> 네이버 로그인창 / 카톡->카톡창
    //로그인 된 것으로 간주하고 
    loginView.addEventListener('click', popup);
    loginView2.addEventListener('click', popup);
}   
function offClick() {
    modalWrap.style.display ='none';
    blackBg.style.display ='none';
}

//댓글갯수
function cnt(){
    count.innerText = comments.length;
}

//좋아요 싫어요
function handleLike(event){

    likeCnt.innerText = 1;
}

function handleUnlike(event){
    unlikeCnt.innerText = 1;
}
function userView(id){
    const idView = document.querySelector(".js-idView");
    idView.innerText = id;
}
function init(){
    loadedWritten();
    cnt();
    //localStorage.removeItem(userConfirm);
    //로그인 했다면 유저아이디 로컬에 저장되어 있음
    const userId = localStorage.getItem(userConfirm);
    if(userId === null){
        commentInput.addEventListener('click', onClick);
        closeModal.addEventListener('click', offClick);
        like.addEventListener("click", onClick);
        unlike.addEventListener("click", onClick);
    }else{
        userView(userId);
        //회원일 때 댓글 저장
        commentEnter.addEventListener("click", handleSubmit);
        commentForm.addEventListener("submit", handleSubmit);

        //좋아요, 싫어요
        like.addEventListener("click", handleLike);
        unlike.addEventListener("click", handleUnlike);
    }
    
}

init();