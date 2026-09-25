document.getElementById("contact").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("formGroupExampleInput").value;
    const email = document.getElementById("formGroupExampleInput2").value;
    const subject = document.getElementById("formGroupExampleInput3").value;
    const message = document.getElementById("formGroupExampleInput4").value;

    // Mevcut kayıtları al
    let mails = JSON.parse(localStorage.getItem("mails")) || [];

    // Yeni mail objesi
    mails.push({
        id: Date.now(),
        name,
        email,
        subject,
        message
    });

    // Kaydet
    localStorage.setItem("mails", JSON.stringify(mails));

    alert("Your message has been sent!");
    this.reset();
});