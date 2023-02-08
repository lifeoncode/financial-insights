// fetch data
// send request to the server to fetch all the data stored in database
const fetchData = async () => {
  try {
    const response = await fetch("/insights");
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("ERROR OCCURED WHILE FETCHING DATA FROM DB:\n", error);
  }
};

// update UI function
// function takes data fetched from DB
// selects and updates the relevant elements in the DOM with the relevant data
const updateUI = (dbData) => {
  const homeDiv = document.querySelector("#home");
  homeDiv.classList.add("fade");
  let dbDataObj = dbData[dbData.length - 1]["Sheet 1"];
  // delay half a second to allow fade animation - this is just for UX
  setTimeout(() => {
    homeDiv.classList.add("hide");
    // render the graph after form is no longer displayed
    setTimeout(() => {
      const chartContainer = document.querySelector(".chart-container");
      // on tablet & phone screens - not much space to work with
      // remove the bg image to allow graph data to fill the whole screen
      if (screen.width <= 900) {
        document.body.style.backgroundImage = "none";
        chartContainer.style.width = "90vw";
      }
      // leave the bg image on bigger screens
      chartContainer.classList.remove("hide");
      // ctx is the main canvas where graph data will be rendered
      // the CTX is convention for for the library "chart.js"
      const ctx = document.querySelector("#chart-output").getContext("2d");
      const labels = [];
      // populate labels with months
      for (let i of dbDataObj) {
        labels.push(i.Month);
      }

      // data points
      const data = {
        labels,
        datasets: [
          {
            data: [],
            label: "income",
            backgroundColor: "blue",
          },
          {
            data: [],
            label: "expenses",
            backgroundColor: "orangered",
          },
        ],
      };

      // populate income datasets
      for (let i of dbDataObj) {
        let val = Number(i.Income.replace(/[^0-9.-]+/g, ""));
        data.datasets[0].data.push(val);
      }

      // populate expenses datasets
      for (let i of dbDataObj) {
        let val = Number(i.Expenses.replace(/[^0-9.-]+/g, ""));
        data.datasets[1].data.push(val);
      }

      // configure the graph
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

      // render graph to DOM canvas
      new Chart(ctx, config);
    }, 1000);
  }, 500);
};

// form submition event
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
      // fetch from DB
      fetchData().then((dbRes) => {
        console.log("fetched data:\n", dbRes);
        updateUI(dbRes);
      });
    });
});
