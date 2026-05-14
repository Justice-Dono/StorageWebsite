async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a file";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  status.innerText = "Uploading...";

  try {
    const res = await fetch("https://clean-upload-api.jordan-tewnion.workers.dev/", {
      method: "POST",
      body: formData
    });

    const text = await res.text();

    status.innerText = text;

  } catch (err) {
    console.error(err);
    status.innerText = "Upload failed";
  }
}