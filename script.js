window.uploadFile = async function () {

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
    const res = await fetch("YOUR_WORKER_URL", {
      method: "POST",
      body: formData
    });

    const text = await res.text();
    console.log("Worker response:", text);

    if (!res.ok) {
      status.innerText = "Upload failed: " + text;
      return;
    }

    status.innerText = "Upload successful!";
  } catch (err) {
    console.error(err);
    status.innerText = "Network error";
  }
};