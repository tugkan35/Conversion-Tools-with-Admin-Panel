// Common functions
function uid(){ return Date.now()+Math.floor(Math.random()*1000); }
function saveUsers(a){ localStorage.setItem('users',JSON.stringify(a)); }
function loadUsers(){ return JSON.parse(localStorage.getItem('users')||"[]"); }
function saveAdmin(a){ localStorage.setItem('adminUser',JSON.stringify(a)); }
function loadAdmin(){ return JSON.parse(localStorage.getItem('adminUser')||"null"); }

// Demo admin and users
if(!loadAdmin()){ saveAdmin({username:"admin",password:"1234"}); }
if(!localStorage.getItem('users')){
  saveUsers([
    {id:uid(),username:"admin",email:"tugkan19971997@gmail.com",role:"admin",status:"active"},
    {id:uid(),username:"user1",email:"user1@mail.com",role:"editor",status:"active"},
    {id:uid(),username:"user2",email:"user2@mail.com",role:"user",status:"inactive"},
	{id:uid(),username:"user3",email:"user3@mail.com",role:"user",status:"active"}
  ]);
}

// Login verification
function checkLogin(){
  if(localStorage.getItem('loggedIn')!=="true"){
    window.location.href="index.html";
  }
}

// Exit
function logout(){
  localStorage.removeItem('loggedIn');
  window.location.href="index.html";
}
