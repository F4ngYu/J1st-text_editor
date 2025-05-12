// document.getElementById("Heading").addEventListener("click", () => {
//     const name = prompt("What is the nme of this document:");
//     if (name) {
//         document.getElementById("Heading").innerHTML = name;
//     }
// });

function getMimeType(extension) {
    const types = {
        txt: 'text/plain',
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        json: 'application/json',
        csv: 'text/csv',
        md: 'text/markdown',
        xml: 'application/xml',
        pdf: 'application/pdf'
    };
    return types[extension.toLowerCase()] || 'application/octet-stream'; // fallback binary
};

function saveToFile() {
    const content = document.getElementById("text").innerText;
    let filename = document.getElementById("Heading").innerText.trim();

    if (!filename) {
        alert("Please enter a filename with extension.");
        return;
    }

    const extension = filename.split('.').pop();
    const mimeType = getMimeType(extension);

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
};
document.getElementById("save").addEventListener("click", saveToFile);