setInterval(() => {

    const devtools =
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160;

    if (devtools) {
        document.body.innerHTML = "";
        window.location.href = "about:blank";
    }

}, 1000);