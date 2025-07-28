// document.getElementById("Heading").addEventListener("click", () => {
//     const name = prompt("What is the nme of this document:");
//     if (name) {
//         document.getElementById("Heading").innerHTML = name;
//     }
// });

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".txt,.md,.json,.html,.css,.js,.csv"; // adjust as needed
fileInput.style.display = "none";
document.body.appendChild(fileInput);
document.getElementById("fOpen").addEventListener("click", () => {
    console.log("Open button clicked"); // check this prints
    fileInput.click();
});



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

     console.log("Save triggered");


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

function loadFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("text").innerText = e.target.result;
        document.getElementById("Heading").innerText = file.name; // optionally show filename
    };
    reader.readAsText(file);
}

fileInput.addEventListener("change", loadFromFile);

