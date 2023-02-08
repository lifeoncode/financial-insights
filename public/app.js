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

// update UI function
const updateUI = (dbData) => {
  document.querySelector("#home").classList.add("fade");
  let dbDataObj = dbData[dbData.length - 1]["Sheet 1"];
  setTimeout(() => {
    document.querySelector("#home").classList.add("hide");
    // render the graph
    setTimeout(() => {
      // render the graph
      document.querySelector(".chart-container").classList.remove("hide");
      console.log("rendering graph");
      const ctx = document.querySelector("#chart-output").getContext("2d");
      const labels = [];
      // populate labels with months
      for (let i of dbDataObj) {
        labels.push(i.Month);
      }

      // data
      const data = {
        labels,
        datasets: [
          {
            data: [
              445, 244, 7778, 8965, 784, 451, 124, 457, 778, 7895, 451, 423,
            ],
            label: "income",
          },
          {
            data: [112, 756, 132, 45, 125, 47, 752, 12, 451, 142, 244, 123],
            label: "expense",
          },
        ],
      };

      // populate datasets with income and expense data
      // for (let i of dbDataObj) {
      //   labels.push(i.Month);
      // }

      // config
      const config = {
        type: "bar",
        data: data,
        options: {
          responsive: true,
        },
      };

      // chart
      const chart = new Chart(ctx, config);
    }, 1000);
  }, 500);
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
      fetchData().then((dbRes) => {
        console.log("fetched data:\n", dbRes);
        updateUI(dbRes);
      });
    });
});
