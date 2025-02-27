let formData;
if (localStorage.getItem("formData")) {
  formData = JSON.parse(localStorage.getItem("formData"));
} else {
  formData = [
    {
      id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
      type: "input",
      label: "Sample Input",
      placeholder: "Sample placeholder", 
    },
    {
      id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
      type: "select",
      label: "Sample Select",
      options: ["Sample Option 1", "Sample Option 2", "Sample Option 3"],
    },
    {
      id: "45002ecf-85cf-4852-bc46-529f94a758f5",
      type: "textarea",
      label: "Sample Textarea",
      placeholder: "Sample Placeholder",
    },
    {
      id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
      type: "checkbox",
      label: "Sample Checkbox",
    },
  ];
}


function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}


let draggedElementIndex = null;


function updateLocalStorage() {
  localStorage.setItem("formData", JSON.stringify(formData));
}


function renderForm() {
  const container = document.getElementById("form-container");
  container.innerHTML = ""; 




  formData.forEach((item, index) => {

    const wrapper = document.createElement("div");
    wrapper.className = 'draper'
    wrapper.classList.add("form-element");
    wrapper.setAttribute("draggable", "true");
    wrapper.dataset.index = index;

      //  drag and drop 

    wrapper.addEventListener("dragstart", handleDragStart);
    wrapper.addEventListener("dragover", handleDragOver);
    wrapper.addEventListener("drop", handleDrop);
    wrapper.addEventListener("dragend", handleDragEnd);



    const controlGroup = document.createElement("div");
    controlGroup.classList.add("form-control-group");

 
    const labelEl = document.createElement("label");
    labelEl.textContent = item.label ;
    labelEl.style.cursor = "pointer";
    labelEl.addEventListener("click", () => {
      const newLabel = prompt("Edit label:", item.label || "");
      if (newLabel !== null) {
        item.label = newLabel;
        renderForm();
      }
    });
    controlGroup.appendChild(labelEl);


    let inputEl;
    switch (item.type) {

      
      case "input":
        inputEl = document.createElement("input");
        inputEl.className = 'input-btn'
        inputEl.type = "text";
        inputEl.placeholder = item.placeholder || "";
        inputEl.style.cursor = "pointer";
        inputEl.addEventListener("click", () => {
          const newPlaceholder = prompt("Edit placeholder:", item.placeholder || "");
          if (newPlaceholder !== null) {
            item.placeholder = newPlaceholder;
            renderForm();
          }
        });
        break;


      case "textarea":


        inputEl = document.createElement("textarea");
        inputEl.className = 'text-btn'
        inputEl.placeholder = item.placeholder || "";
        inputEl.style.cursor = "pointer";
        inputEl.addEventListener("click", () => {

          const newPlaceholder = prompt("Edit placeholder:", item.placeholder || "");
          if (newPlaceholder !== null) {
            item.placeholder = newPlaceholder;
            renderForm();
          }

        });


        break;
      case "select":


        inputEl = document.createElement("select");
        inputEl.className = 'select-box'
        if (!item.options) item.options = [];
        item.options.forEach((opt) => {
          const optionEl = document.createElement("option");
          optionEl.textContent = opt;
          inputEl.appendChild(optionEl);
        });

        break;

      case "checkbox":


        inputEl = document.createElement("input");
        inputEl.className = 'check-btn'
        inputEl.placeholder = ' dsfghdsaffsd'
        inputEl.type = "checkbox";


        break;
      default:
        break;

    }
    controlGroup.appendChild(inputEl);
    wrapper.appendChild(controlGroup);

     const btnOpt = document.createElement("div") 
     btnOpt.className = 'btn-opt'
    if (item.type === "select") {
      const addOptBtn = document.createElement("button");
      addOptBtn.className = 'optioncreate'
      addOptBtn.textContent = "Add Option";
      addOptBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const newOpt = prompt("Enter new option:", "New Option");
        if (newOpt) {
          item.options.push(newOpt);
          renderForm();
        }
      });

      btnOpt.appendChild(addOptBtn);

 const selectBtn = document.createElement("div");
      const removeOptBtn = document.createElement("button");
     
      removeOptBtn.className = 'option-btn'
      removeOptBtn.textContent = "Remove Last Option";
      removeOptBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (item.options && item.options.length > 0) {
          item.options.pop();
          renderForm();
        }
      });

      btnOpt.appendChild(removeOptBtn);
    
    }

  
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = 'option-del'
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      formData.splice(index, 1);
      renderForm();
    });
    btnOpt.appendChild(delBtn);
   wrapper.appendChild(btnOpt)
    container.appendChild(wrapper);
  });

  updateLocalStorage();
}


function handleDragStart(e) {
  draggedElementIndex = e.target.dataset.index;
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault(); 
  e.dataTransfer.dropEffect = "move";
}

function handleDrop(e) {
  e.preventDefault();
  const dropTarget = e.target.closest(".form-element");
  if (!dropTarget) return;
  const droppedIndex = dropTarget.dataset.index;
  if (draggedElementIndex === droppedIndex) return;
  const draggedItem = formData[draggedElementIndex];
  formData.splice(draggedElementIndex, 1);
  formData.splice(droppedIndex, 0, draggedItem);
  renderForm();
}

function handleDragEnd() {
  draggedElementIndex = null;
}


document.querySelectorAll(".sidebar button[data-type]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    let newItem = {
      id: generateUniqueId(),
      type: type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    };
    if (type === "input" || type === "textarea") {
      newItem.placeholder = "Placeholder text";
    }
    if (type === "select") {
      newItem.options = ["Option 1", "Option 2"];
    }
    formData.push(newItem);
    renderForm();
  });
});


document.getElementById("save-btn").addEventListener("click", () => {
  console.log("Saved JSON:");
  console.log(JSON.stringify(formData, null, 2));
  alert("Form data saved");
});


document.querySelector(".save-bttn button:nth-child(1)").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


document.querySelector(".save-bttn button:nth-child(2)").addEventListener("click", () => {
  const htmlOutput = generateFormHTML();
  let previewContainer = document.getElementById("preview-container");
  if (!previewContainer) {
    previewContainer = document.createElement("div");
    previewContainer.id = "preview-container";
    previewContainer.style.position = "fixed";
    previewContainer.style.top = "50%";
    previewContainer.style.left = "50%";
    previewContainer.style.transform = "translate(-50%, -50%)";
    previewContainer.style.background = "#fff";
    previewContainer.style.padding = "20px";
    previewContainer.style.border = "1px solid #ccc";
    previewContainer.style.zIndex = "1000";
    previewContainer.innerHTML = `
      <h2>Form HTML Preview</h2>
      <pre id="preview-textarea" style="max-height: 300px; overflow: auto;"></pre>
      <button id="copy-html-btn">Copy HTML</button>
      <button id="close-preview">Close</button>
    `;
    document.body.appendChild(previewContainer);
    
    document.getElementById("copy-html-btn").addEventListener("click", () => {
      const textToCopy = document.getElementById("preview-textarea").textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("HTML copied to clipboard!");
      });
    });
    
    document.getElementById("close-preview").addEventListener("click", () => {
      previewContainer.remove();
    });
  }
  document.getElementById("preview-textarea").textContent = generateFormHTML();
});

function generateFormHTML() {
  let html = "<form>\n";
  formData.forEach((item) => {
    switch (item.type) {
      case "input":
        html += `  <label>${item.label}</label>\n`;
        html += `  <input type="text" placeholder="${item.placeholder || ""}" />\n\n`;
        break;
      case "textarea":
        html += `  <label>${item.label}</label>\n`;
        html += `  <textarea placeholder="${item.placeholder || ""}"></textarea>\n\n`;
        break;
      case "select":
        html += `  <label>${item.label}</label>\n`;
        html += "  <select>\n";
        if (item.options && item.options.length) {
          item.options.forEach((opt) => {
            html += `    <option>${opt}</option>\n`;
          });
        }
        html += "  </select>\n\n";
        break;
      case "checkbox":
        html += "  <label>\n";
        html += `    <input type="checkbox" /> ${item.label}\n`;
        html += "  </label>\n\n";
        break;
      default:
        break;
    }
  });
  html += "</form>";
  return html;
}


renderForm();
