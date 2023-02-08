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
      if (screen.width <= 900) {
        document.body.style.backgroundImage = "none";
        document.querySelector(".chart-container").style.width = "90vw";
      }
      document.querySelector(".chart-container").classList.remove("hide");
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
            data: [],
            label: "income",
          },
          {
            data: [],
            label: "expense",
          },
        ],
      };

      // populate income datasets
      for (let i of dbDataObj) {
        let val = Number(i.Expenses.replace(/[^0-9.-]+/g, ""));
        data.datasets[0].data.push(val);
      }

      // populate expense datasets
      for (let i of dbDataObj) {
        let val = Number(i.Expenses.replace(/[^0-9.-]+/g, ""));
        data.datasets[1].data.push(val);
      }

      // config
      const config = {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return `R${value}`;
                },
              },
            },
          },
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
