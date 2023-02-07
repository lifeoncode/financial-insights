// send data
const sendData = async (file) => {
  try {
    const response = await fetch("/upload", {
      method: "post",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ file }),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error occured while sending data to server:\n", error);
  }
};

// get financial data
const fetchData = async () => {
  try {
    const response = await fetch("/insights");
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error occured while fetching data from DB:\n", error);
  }
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
    .then((data) => {
      console.log("sent data:\n", data);
      // fetch from DB
      fetchData().then((dbRes) => console.log("fetched data:\n", dbRes));
    });
});
