let file;

window.addEventListener("load", () => {
    const input = document.getElementById("upload");
    const filewrapper = document.getElementById("filewrapper");
    const textarea = document.getElementById("myTextarea");

    input.addEventListener("change", (e) => {
        // Remove any previously uploaded file boxes
        const uploadedFiles = document.querySelectorAll(".showfilebox");
        uploadedFiles.forEach((fileBox) => {
            filewrapper.removeChild(fileBox);
        });

        let fileName = e.target.files[0].name;
        file = e.target.files[0];
        let filetype = e.target.value.split(".").pop();

        fileshow(fileName, filetype);
    });

    const fileshow = (fileName, filetype) => {
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("showfilebox");
    
        const fileDescElem = document.createElement("h3");
        fileDescElem.innerHTML = `${filetype} &nbsp;&nbsp; ${fileName}`;
        showfileboxElem.append(fileDescElem);
    
        const crossElem = document.createElement("span");
        crossElem.innerHTML = "&nbsp;&nbsp;&nbsp;&#215";
        showfileboxElem.append(crossElem);
    
        filewrapper.appendChild(showfileboxElem);
    
        crossElem.addEventListener("click", () => {
            file = null;
            textarea.innerHTML = "";
            filewrapper.removeChild(showfileboxElem);
        });
    };

    document.getElementById("convert").addEventListener("click", () => {
        if (file === undefined || file === null) {
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8000/predict", {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                let data = await response.json();
                textarea.innerHTML = data.text;
            })
            .catch((error) => {});
    });
});
