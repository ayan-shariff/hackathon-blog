const editor = document.getElementById("editor");
const blogsList = document.getElementById("blogs-list");
const saveBlogBtn = document.getElementById("save-blog-btn");
const uploadImageInput = document.getElementById("upload-image");

// Apply text formatting
function formatText(command) {
  document.execCommand(command, false, null);
}

// Set text color
function setTextColor(color) {
  document.execCommand("foreColor", false, color);
}

// Set background color
function setBackgroundColor(color) {
  document.execCommand("hiliteColor", false, color);
}

// Set font
function setFont(fontName) {
  document.execCommand("fontName", false, fontName);
}

// Save blog content
saveBlogBtn.addEventListener("click", () => {
  const blogContent = editor.innerHTML.trim();
  if (blogContent) {
    const li = document.createElement("li");
    li.innerHTML = blogContent;
    blogsList.appendChild(li);
    editor.innerHTML = ""; // Clear the editor
  } else {
    alert("Please write something in the editor before saving.");
  }
});

function saveDraft() {
  const content = document.querySelector(".editor").innerHTML;
  localStorage.setItem("draft", content);
  alert("Draft saved!");
}

// Image upload functionality
uploadImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Uploaded Image";
      img.style.maxWidth = "100%";
      editor.appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Failed to upload image. Please try again.");
  }
});

//my
img.style.maxHeight = "300px";
img.style.objectFit = "contain";
