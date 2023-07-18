let file;
window.addEventListener("load", () => {
    const input = document.getElementById("upload");
    const filewrapper = document.getElementById("filewrapper");



    input.addEventListener("change", (e) => {
        let fileName = e.target.files[0].name;
        file = e.target.files[0];
        let filetype = e.target.value.split(".").pop();
      
        fileshow(fileName, filetype);
    })

    const textarea = document.getElementById("myTextarea")

    const fileshow = (fileName, filetype) => {
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("showfilebox");
        const leftElem = document.createElement("div");
        leftElem.classList.add("left");
        const fileTypeElem = document.createElement("span");
        fileTypeElem.classList.add("filetype");
        fileTypeElem.innerHTML = filetype;
        leftElem.append(fileTypeElem);
        const filetitleElem = document.createElement("h3");
        filetitleElem.innerHTML = fileName;
        leftElem.append(filetitleElem);
        showfileboxElem.append(leftElem);
        const rightElem = document.createElement("div");
        rightElem.classList.add("right");
        showfileboxElem.append(rightElem);
        const crossElem = document.createElement("span");
        crossElem.innerHTML = "&#215";
        rightElem.append(crossElem);
        filewrapper.append(showfileboxElem);

        crossElem.addEventListener("click", () => {
            file=null;
            textarea.innerHTML="";
            filewrapper.removeChild(showfileboxElem);
        })
    }

   

    document.getElementById("convert").addEventListener('click',() => {
        if(file === undefined || file === null ){
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
    
        fetch('http://localhost:8000/predict', {
            method: 'POST',
            body: formData
        })
            .then(async response => {
                let data = await response.json();
                // console.log(await response.json());
                textarea.innerHTML = data.text;
            })
            .catch(error => {
            });
    })

})

