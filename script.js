window.uploadFile = async function () {

  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  const files = fileInput.files;

  if (files.length === 0) {
    status.innerText = "Please select files";
    return;
  }

  const formData = new FormData();

  // Add all files
  for (const file of files) {
    formData.append("files", file);
  }

  status.innerText = `Uploading ${files.length} file(s)...`;

  try {

    const res = await fetch("https://clean-upload-api.jordan-tewnion.workers.dev/", {
      method: "POST",
      body: formData
    });

    const text = await res.text();

    console.log("Response:", text);

    if (!res.ok) {
      status.innerText = "Upload failed";
      return;
    }

    status.innerText = `Uploaded ${files.length} file(s)!`;

  } catch (err) {
    console.error(err);
    status.innerText = "Network error";
  }
};