// -------------------------
// PAGINATION VARIABLES
// -------------------------
let mails = JSON.parse(localStorage.getItem("mails")) || [];
let currentPage = 1;
let perPage = parseInt($('#perPage').val()) || 5;
// -------------------------
// WHEN THE PAGE LOADS
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    mails = JSON.parse(localStorage.getItem("mails")) || [];
    renderMailTable();
});
// -------------------------
// REFRESH THE MAIN TABLE
// -------------------------
function renderMailTable() {

    mails = JSON.parse(localStorage.getItem("mails")) || [];

    document.getElementById("totalMails").textContent = mails.length;

    let start = (currentPage - 1) * perPage;
    let show = mails.slice(start, start + perPage);

    let tbody = document.getElementById("mailBody");
    tbody.innerHTML = "";

    show.forEach(mail => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${mail.id}</td>
            <td>${mail.name}</td>
            <td>${mail.email}</td>
            <td>${mail.subject}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="viewMail(${mail.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteMail(${mail.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderMailPagination();
}

// -------------------------
// PAGINATION VIEW
// -------------------------
function renderMailPagination() {

    let totalPages = Math.ceil(mails.length / perPage);
    let pagination = $('#pagination');
    pagination.empty();

    // Previous
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goMailPage(${currentPage - 1})">Previous</a>
        </li>
    `);

    let maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (startPage > 1) {
        pagination.append(mailPageItem(1));
        if (startPage > 2) pagination.append(mailEllipsisItem());
    }

    for (let i = startPage; i <= endPage; i++) {
        pagination.append(mailPageItem(i));
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pagination.append(mailEllipsisItem());
        pagination.append(mailPageItem(totalPages));
    }

    // Next
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goMailPage(${currentPage + 1})">Next</a>
        </li>
    `);
}

function mailPageItem(page) {
    return `
        <li class="page-item ${page === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="goMailPage(${page})">${page}</a>
        </li>
    `;
}

function mailEllipsisItem() {
    return `
        <li class="page-item disabled">
            <span class="page-link">...</span>
        </li>
    `;
}

function goMailPage(p) {
    currentPage = p;
    renderMailTable();
}

// -------------------------
// MODAL DISPLAY
// -------------------------
function viewMail(id) {
    let mails = JSON.parse(localStorage.getItem("mails")) || [];
    let mail = mails.find(m => m.id === id);

    document.getElementById("modalName").textContent = mail.name;
    document.getElementById("modalEmail").textContent = mail.email;
    document.getElementById("modalSubject").textContent = mail.subject;
    document.getElementById("modalMessage").textContent = mail.message;

    $('#viewModal').modal('show');
}

// -------------------------
// DELETE
// -------------------------
function deleteMail(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    mails = mails.filter(m => m.id !== id);

    localStorage.setItem("mails", JSON.stringify(mails));

    // Setting to prevent the page from remaining blank when cleared
    let totalPages = Math.ceil(mails.length / perPage);
    if (currentPage > totalPages) currentPage = totalPages;

    renderMailTable();
}

// -------------------------
// RECORD PER PAGE
// -------------------------
$('#perPage').on('change', function () {
    perPage = parseInt($(this).val());
    currentPage = 1;
    renderMailTable();
});
