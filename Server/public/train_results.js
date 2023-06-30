const URL = "http://localhost:3000";

let train_details = [];
let totalTrains;

const modifyBtn = document.querySelector("#search-btn");
const swapBtn = document.querySelector("#swap-img");
const destination = document.querySelector("#input-2");
const source = document.querySelector("#input-1");

// fetch(`${URL}/search_trains`)
//   .then((res) => res.json())
//   .then((res) => {
//     totalTrains = parseInt(res);
//     fetchData(0, 5).then((trains) => showData(trains));
//     // showData();
//   })
//   .catch((e) => console.error(e));

console.log("hell");

const src = "<%= source %>";
const dest = "<%= destination %>";

console.log(src);

// fetch(`/results?src=${source_station_code}&dest=${destination_station_code}`);

const fetchData = async (start, batchSize) => {
  if (start >= totalTrains) {
    return train_details;
  }

  const response = await fetch(
    `${URL}/data?start=${start}&batchSize=${batchSize}`
  );
  const data = await response.json();

  train_details.push(...data);

  if (train_details.length <= totalTrains) {
    await fetchData(start + batchSize, batchSize);
  }
  return train_details;
};

const showData = async (trains) => {
  console.log(trains);
  const resp = await fetch(
    `${URL}/get_station?` +
      new URLSearchParams({
        src_station: trains[0][0].route[0].station,
        dest_station: trains[0][1].route[0].station,
      })
  );
  const data = await resp.json();
  console.log(data);
  source_station = data.source;
  destination_station = data.destination;
  const mainContentDiv = document.querySelector(".main-content");
  for (i = 0; i < trains.length; i++) {
    const trainDetailsDiv = document.createElement("div");
    trainDetailsDiv.classList.add("train-details-div");

    const trainHeadingDiv = document.createElement("div");
    trainHeadingDiv.classList.add("train-heading-div");

    const h3Tag = document.createElement("h3");
    h3Tag.classList.add("train-name");
    h3Tag.innerText =
      trains[i][0].train_name + " (" + trains[i][0].train_number + ") ";

    const anchorTag = document.createElement("a");
    anchorTag.classList.add("train-schedule");
    anchorTag.href =
      `{URL}/train_schedule` +
      new URLSearchParams({ train_number: trains[i][0].train_number });
    anchorTag.innerText = "Train Schedule";

    trainHeadingDiv.append(h3Tag, anchorTag);

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("train-timing-stations-div");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const h2LeftTag = document.createElement("h2");
    h2LeftTag.innerText =
      trains[i][0].route[0].departure_time.slice(0, -3) + " | ";

    const spanLeftTag = document.createElement("span");
    spanLeftTag.classList.add("station-name-span");
    spanLeftTag.innerText = source_station;

    leftDiv.append(h2LeftTag, spanLeftTag);

    const centerDiv = document.createElement("div");
    centerDiv.classList.add("middle");

    const pTag = document.createElement("p");
    pTag.innerText = "02:40";

    centerDiv.appendChild(pTag);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    const h2RightTag = document.createElement("h2");
    h2RightTag.innerText =
      trains[i][1].route[0].arrival_time.slice(0, -3) + " | ";

    const spanRightTag = document.createElement("span");
    spanRightTag.classList.add("station-name-span");
    spanRightTag.innerText = destination_station;

    rightDiv.append(h2RightTag, spanRightTag);

    mainDiv.append(leftDiv, centerDiv, rightDiv);

    trainDetailsDiv.append(trainHeadingDiv, mainDiv);

    mainContentDiv.append(trainDetailsDiv);
  }
  // const end_time = performance.now();

  // console.log("results fetched in: " + (end_time - start_time));
};

swapBtn.addEventListener("click", (e) => {
  if (inputElem2.value === "" && inputElem.value) {
    inputElem2.value = inputElem.value;
    inputElem.value = "";
  } else if (inputElem.value === "" && inputElem2.value) {
    inputElem.value = inputElem2.value;
    inputElem2.value = "";
  }
  if (inputElem2.value && inputElem.value) {
    let temp = inputElem.value;
    inputElem.value = inputElem2.value;
    inputElem2.value = temp;
  }
});

modifyBtn.addEventListener("click", () => {
  let source, destination;
  if (inputElem.value && inputElem2.value) {
    source = inputElem.value.split(" - ")[1];
    destination = inputElem2.value.split(" - ")[1];
  }

  data = { source, destination };

  fetch(`${URL}/find_trains`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status == 200) location.href = `${URL}/available-trains`;
  });
});
