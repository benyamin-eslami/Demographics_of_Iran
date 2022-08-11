const getTableDatas = (id) => {
  let tableDataList = [];
  let tableObj = {};
  const trElements = document.querySelectorAll(
    `#${id + " " + "tbody" + " " + "tr"}`
  );

  const tableKeys = Array.from(trElements[0].children).map(
    (th) => th.innerHTML
  );

  let rank = tableKeys[0];
  let city = tableKeys[1];
  let province = tableKeys[2];
  let population = tableKeys[3];

  let rankValue,
    cityValue,
    provinceValue,
    populationValue,
    populationCityValue,
    populationMetroValue;

  for (let i = 2; i < trElements.length; i++) {
    rankValue = Array.from(trElements[i].children[0].innerHTML)[0];
    cityValue = Array.from(
      trElements[i].children[1].children[0].innerHTML
    ).join("");
    provinceValue = Array.from(
      trElements[i].children[2].children[0].innerHTML
    ).join("");
    populationCityValue = Array.from(trElements[i].children[3].innerHTML).join(
      ""
    );
    populationMetroValue = Array.from(trElements[i].children[4].innerHTML).join(
      ""
    );
    populationValue = {
      city: populationCityValue,
      Metro: populationMetroValue,
    };

    tableObj = {
      [rank]: rankValue,
      [city]: cityValue,
      [province]: provinceValue,
      [population]: populationValue,
    };

    tableDataList.push(tableObj);
  }
  return tableDataList;
};

// // (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// // 0: {Rank: '1', City: 'Tehran', Province: 'Tehran', population: {…}}
// // 1: {Rank: '2', City: 'Mashhad', Province: 'Razavi Khorasan', population: {…}}
// // 2: {Rank: '3', City: 'Isfahan', Province: 'Isfahan', population: {…}}
// // 3: {Rank: '4', City: 'Karaj', Province: 'Alborz', population: {…}}
// // 4: {Rank: '5', City: 'Shiraz', Province: 'Fars', population: {…}}
// // 5: {Rank: '6', City: 'Tabriz', Province: 'East Azarbaijan', population: {…}}
// // 6: {Rank: '7', City: 'Qom', Province: 'Qom', population: {…}}
// // 7: {Rank: '8', City: 'Ahvaz', Province: 'Khuzestan', population: {…}}
// // length: 8]

const tableDatas = getTableDatas("wikitable");

function dataToDomTable(tableDatas) {
  const table = document.createElement("table");
  document.body.append(table);
  let headerListMain = [];
  let headerListSub = [];
  let thMain;
  let istrMainMade = false;
  let headMaintr = document.createElement("tr");
  for (let key in tableDatas[0]) {
    headerListMain.push(key);
    if (typeof tableDatas[0][key] === "object") {
      headerListSub.push({ [key]: tableDatas[0][key] });
    }
  }

  headerListMain.forEach((thText) => {
    thMain = document.createElement("th");
    headerListSub.forEach((thSub) => {
      for (let key in thSub) {
        if (key === thText) {
          thMain.setAttribute("colspan", `${Object.keys(thSub[key]).length}`);
          console.log(thMain);
        } else {
          thMain.setAttribute("rowspan", 2);
        }
      }
    });
    thMain.innerHTML = thText;
    headMaintr.append(thMain);
    istrMainMade = true;
  });
  table.append(headMaintr);

  if (istrMainMade) {
    let headSubtr = document.createElement("tr");
    let thSub;
    headerListSub.forEach((obj) => {
      for (let key in obj) {
        for (let keyi in obj[key]) {
          thSub = document.createElement("th");
          thSub.innerHTML = keyi;
          headSubtr.append(thSub);
        }
      }
    });
    table.append(headSubtr);
  }

  console.log(headerListMain);
  console.log(headerListSub);

  tableDatas.forEach((obj, index) => {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td, tdInnerObj;
    th.innerHTML = index + 1;
    for (let key in obj) {
      if (typeof obj[key] !== "object") {
        td = document.createElement("td");
        td.innerHTML = obj[key];
        tr.append(td);
      } else {
        for (let keyinnerObj in obj[key]) {
          tdInnerObj = document.createElement("td");
          tdInnerObj.innerHTML = obj[key][keyinnerObj];
          tr.append(tdInnerObj);
        }
      }
    }

    table.append(tr);
  });
}

dataToDomTable(tableDatas);
