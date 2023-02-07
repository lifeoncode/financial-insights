// send data
const sendData = async (file) => {
  const response = await fetch("/read", {
    method: "post",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ file }),
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// form submit
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userFile = document.querySelector("#file-input").files[0];
  const formData = new FormData();
  formData.append("the-file", userFile);

  fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then(() => {
      window.location.replace("/insights");
    })
    .catch((error) => {
      console.log("something went wrong:", error);
    });
});
