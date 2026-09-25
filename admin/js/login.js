$('#formLogin').on('submit', function(e){
  e.preventDefault();
  var u = $('#loginUsername').val().trim();
  var p = $('#loginPassword').val();
  var adm = loadAdmin();
  if(adm && u===adm.username && p===adm.password){
    localStorage.setItem('loggedIn','true');
    window.location.href="dashboard.html";
  } else {
    alert("Incorrect username or password");
  }
});