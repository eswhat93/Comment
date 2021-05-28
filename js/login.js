const loginForm = document.querySelector(".login");
id = loginForm.querySelector(".id"),
pwd = loginForm.querySelector(".pwd"),
btn = document.querySelector(".enter");

const userInfo = [
    {
        id:"test",
        pwd:"1234"
    },
    {
        id:"test2",
        pwd:"123"
    },
];

const USERID = "ComfirmedId";
function goSubmit(){
    //더미
    for(let i=0;i<userInfo.length;i++){
        if((id.value === userInfo[i].id)&&(pwd.value === userInfo[i].pwd)){
            
            //DB대신 로컬에 아이디 저장
            localStorage.setItem(USERID,userInfo[i].id);

            window.opener.name = "index";
            loginForm.target = "index";
            loginForm.action =`index.html`;
            loginForm.submit();
            self.close();
        }
        else{
            alert("아이디나 비밀번호가 잘못되었습니다.");
            return false;
        }
    }
       

    
}


function init(){
    
}

init();