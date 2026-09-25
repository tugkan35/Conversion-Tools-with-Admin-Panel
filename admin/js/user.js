// PAGINATION VARIABLES
let users = loadUsers();
let currentPage = 1;
let perPage = parseInt($('#perPage').val());
// MODAL DISPLAY
function openModal(id=null){
  if(id){
    let u = users.find(x=>x.id==id);
    $('#modalTitle').text("Edit User");
    $('#userId').val(u.id);
    $('#username').val(u.username);
    $('#email').val(u.email);
    $('#role').val(u.role);
    $('#status').val(u.status);
  } else {
    $('#modalTitle').text("Add New User");
    $('#userForm')[0].reset();
    $('#userId').val('');
  }
  $('#userModal').modal('show');
}
// REFRESH THE MAIN TABLE
function renderTable(){
  $('#totalUsers').text(users.length);
  let start=(currentPage-1)*perPage;
  let show=users.slice(start,start+perPage);
  $('#userBody').empty();
  show.forEach(u=>{
    $('#userBody').append(`
      <tr>
        <td>${u.id}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="openModal(${u.id})"><i class="fas fa-pen"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `);
  });
  renderPagination();
}
// PAGINATION VIEW
function renderPagination(){
  let totalPages = Math.ceil(users.length / perPage);
  let pagination = $('#pagination');
  pagination.empty();

  // Previous
  pagination.append(`
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="goPage(${currentPage-1})">Previous</a>
    </li>
  `);

  let maxVisible = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (startPage > 1) {
    pagination.append(pageItem(1));
    if (startPage > 2) pagination.append(ellipsisItem());
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.append(pageItem(i));
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pagination.append(ellipsisItem());
    pagination.append(pageItem(totalPages));
  }

  // Next
  pagination.append(`
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="goPage(${currentPage+1})">Next</a>
    </li>
  `);
}

function pageItem(page){
  return `
    <li class="page-item ${page === currentPage ? 'active' : ''}">
      <a class="page-link" href="#" onclick="goPage(${page})">${page}</a>
    </li>
  `;
}

function ellipsisItem(){
  return `
    <li class="page-item disabled">
      <span class="page-link">...</span>
    </li>
  `;
}

function goPage(p){ currentPage=p; renderTable(); }
// ADDITION
$('#userForm').on('submit',function(e){
  e.preventDefault();
  let id=$('#userId').val();
  if(id){
    let u=users.find(x=>x.id==id);
    u.username=$('#username').val();
    u.email=$('#email').val();
    u.role=$('#role').val();
    u.status=$('#status').val();
  } else {
    let newId = users.length ? Math.max(...users.map(x=>x.id))+1 : 1;
    users.push({id:newId,username:$('#username').val(),email:$('#email').val(),role:$('#role').val(),status:$('#status').val()});
  }
  saveUsers(users);
  $('#userModal').modal('hide');
  renderTable();
});
// DELETE
function deleteUser(id){
  if(confirm("Are you sure you want to delete this?")){
    users=users.filter(x=>x.id!=id);
    saveUsers(users);
    renderTable();
  }
}
// RECORD PER PAGE
$('#perPage').on('change',function(){ perPage=parseInt($(this).val()); currentPage=1; renderTable(); });

renderTable();