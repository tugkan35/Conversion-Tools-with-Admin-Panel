async function generateHash() {
    const text = document.getElementById("inputText").value;
    if (!text) {
        alert("Please enter a value to generate a hash!");
        return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    document.getElementById("outputHash").value = hashHex;
}

function copyToClipboard() {
    const output = document.getElementById("outputHash");

    if (!output.value.trim()) {
        alert("There is no hash to copy yet!");
        return;
    }

    navigator.clipboard.writeText(output.value)
        .then(() => alert("The hash was successfully copied!"))
        .catch(() => {
            output.select();
            document.execCommand("copy");
            alert("Hash copied!");
        });
}
