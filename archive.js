document.addEventListener("DOMContentLoaded", () => {
  if (typeof archiveData !== 'undefined') {
    displayArchive(archiveData);
  } else {
    console.error("Archive data not found.");
  }
});

function displayArchive(items) {
  const container = document.getElementById("archive-list");

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "archive-item";

    const filePath = `media/${item.type}s/${item.file}`;
    const fileDate = new Date(item.date).toDateString();

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Date:</strong> ${fileDate}</p>
      <p><strong>Type:</strong> ${capitalize(item.type)}</p>
      <a class="download-btn" href="${filePath}" download>Download</a>
    `;

    div.addEventListener("click", () => {
      showPreview(item, filePath);
    });

    container.appendChild(div);
  });
}

function showPreview(item, filePath) {
  const overlay = document.getElementById("preview-overlay");
  const content = document.getElementById("preview-content");

  let previewHTML = "";

  switch (item.type) {
    case "image":
      previewHTML = `<img src="${filePath}" alt="${item.title}" class="preview-img">`;
      break;
    case "audio":
      previewHTML = `<audio controls src="${filePath}" class="preview-audio"></audio>`;
      break;
    case "video":
      previewHTML = `<video controls width="100%" class="preview-video">
                       <source src="${filePath}" type="video/mp4">
                       Your browser does not support the video tag.
                     </video>`;
      break;
    case "document":
      previewHTML = `<iframe src="${filePath}" width="100%" height="400px" class="preview-doc" frameborder="0"></iframe>`;
      break;
    default:
      previewHTML = `<p>Preview not available for this file type.</p>`;
  }

  content.innerHTML = `
    <div class="preview-card">
      <span class="close-btn" onclick="closePreview()">×</span>
      <h2>${item.title}</h2>
      <p><strong>Date:</strong> ${new Date(item.date).toDateString()}</p>
      <p><strong>Type:</strong> ${capitalize(item.type)}</p>
      ${previewHTML}
      <a class="download-btn" href="${filePath}" download>Download</a>
    </div>
  `;

  overlay.style.display = "flex";
}

function closePreview() {
  document.getElementById("preview-overlay").style.display = "none";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}