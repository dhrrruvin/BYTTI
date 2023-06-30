const URL = "http://localhost:3000";

// const showSuggestion = (element, suggestions) => {
//   let unorderList = document.createElement("ul");
//   unorderList.classList.add("stations");
//   for (i = 0; i < suggestions.length; i++) {
//     let listItem = document.createElement("li");
//     listItem.classList.add("list-items");

//     let suggested_names =
//       suggestions[i].item["station_name"] +
//       " - " +
//       suggestions[i].item["station_code"];

//     listItem.textContent = suggested_names;

//     unorderList.appendChild(listItem);
//     listItem.addEventListener("click", (e) => {
//       element.value = e.target.textContent;
//     });
//   }
//   element.after(unorderList);
// };

// inp_src.addEventListener("input", (e) => {
//   if (document.querySelector(".stations")) {
//     document.querySelector(".stations").remove();
//     fetchSuggestion(inp_src, inp_src.value);
//   } else fetchSuggestion(inp_src, inp_src.value);
// });

// inp_dest.addEventListener("input", (e) => {
//   if (document.querySelector(".stations")) {
//     document.querySelector(".stations").remove();
//     fetchSuggestion(inp_dest, inp_dest.value);
//   } else fetchSuggestion(inp_dest, inp_dest.value);
// });

// inp_src.addEventListener("focusout", (e) => {
//   document.querySelector(".stations").remove();
// });

// inp_dest.addEventListener("focusout", (e) => {
//   if (list_items) document.querySelector(".stations").remove();
// });

// const search = () => {
//   try {
//     from = inp_src.value.split(" - ")[1];
//     to = inp_dest.value.split(" - ")[1];
//   } catch (e) {
//     console.log("bad input!");
//     return;
//   }
//   if (from === to) {
//     console.log("Origin and destination can't be same!");
//     return;
//   }
//   fetch(`${URL}/search-trains`)
//     .then((res) => res.json())
//     .then((res) => console.log(res));
// };

let suggestions = [];

const $ = document;
const liContainer = $.querySelector(".autocom-box");
const liContainer2 = $.querySelector(".autocom-box-2");
const inputElem = $.querySelector("#input-1");
const inputElem2 = $.querySelector("#input-2");
const searchInput = $.querySelector(".search-input");
const searchInput2 = $.querySelector(".search-input-2");
const swapBtn = $.querySelector("#swap-img");
const searchBtn = $.querySelector("#search-btn");

function fetchSuggestions(licont, value) {
  fetch(`${URL}/stations?` + new URLSearchParams({ station: value }))
    .then((res) => res.json())
    .then((res) => {
      suggestions = [];
      for (let i = 0; i < res.length; i++) {
        suggestions.push(
          res[i].item["station_name"] + " - " + res[i].item["station_code"]
        );
      }
      suggestionWordsGenerator(licont, suggestions);
    });
}

inputElem.addEventListener("focusout", () => {
  searchInput.classList.remove("active");
});

inputElem2.addEventListener("focusout", () => {
  searchInput2.classList.remove("active");
});

inputElem.addEventListener("keyup", function () {
  let inputValue = inputElem.value;
  if (inputValue) {
    searchInput.classList.add("active");
    fetchSuggestions(liContainer, inputValue);
  } else {
    searchInput.classList.remove("active");
  }
});

inputElem2.addEventListener("keyup", function () {
  let inputValue = inputElem2.value;
  if (inputValue) {
    searchInput2.classList.add("active");
    fetchSuggestions(liContainer2, inputValue);
  } else {
    searchInput2.classList.remove("active");
  }
});

function suggestionWordsGenerator(liCont, wordArray) {
  let suggestionWord = wordArray
    .map(function (word) {
      return "<li>" + word + "</li>";
    })
    .join("");

  if (suggestionWord) {
    liCont.innerHTML = suggestionWord;
  } else {
    liCont.innerHTML = "<li>" + inputElem.value + "</li>";
  }

  if (liCont.classList.contains("autocom-box-2")) Select(2, liCont);
  else Select(1, liCont);
}

// adding click event listener to every li element
// and on click assign the value of selected li tag to input

function Select(num, liCont) {
  if (num === 1) {
    let allListItems = liCont.querySelectorAll("li");
    allListItems.forEach(function (wordItem) {
      wordItem.addEventListener("mousedown", function (e) {
        inputElem.value = e.target.textContent;
        searchInput.classList.remove("active");
      });
    });
  } else {
    let allListItems = liCont.querySelectorAll("li");
    allListItems.forEach(function (wordItem) {
      wordItem.addEventListener("mousedown", function (e) {
        inputElem2.value = e.target.textContent;
        searchInput2.classList.remove("active");
      });
    });
  }
}

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

searchBtn.addEventListener("click", () => {
  let source, destination;
  if (inputElem.value && inputElem2.value) {
    source = inputElem.value.split(" - ")[1];
    destination = inputElem2.value.split(" - ")[1];
  }

  data = { source, destination };
  console.log(data);

  fetch(`${URL}/find_trains`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res.status);
  });

  // window.location =
  //   `${URL}/find_trains?` +
  //   new URLSearchParams({
  //     source: source,
  //     destination: destination,
  //   });
});
