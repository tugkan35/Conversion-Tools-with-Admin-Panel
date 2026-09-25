$('#pwdForm').on('submit', function(e){
  e.preventDefault();
  var adm = loadAdmin();
  if($('#oldPwd').val() !== adm.password){
    alert("The current password is incorrect");
    return;
  }
  if($('#newPwd').val() !== $('#newPwd2').val()){
    alert("The new passwords do not match");
    return;
  }
  adm.password = $('#newPwd').val();
  saveAdmin(adm);
  alert("Password changed");
  $('#pwdForm')[0].reset();
});