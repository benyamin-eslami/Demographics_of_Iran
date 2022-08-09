const getTableDatas = (id) => {
  let tableDataList = [];
  let tableObj;
  const trElements = document.querySelectorAll(
    `#${id + " " + "tbody" + " " + "tr"}`
  );
  const thLists = Array.from(trElements[0].children);

  const tableKeys = thLists.map((th) => th.innerHTML);

  let rank = tableKeys[0];
  let city = tableKeys[1];
  let province = tableKeys[2];
  let population = tableKeys[3];

  const subCityPopulationElement = Array.from(
    trElements[1].children[0].textContent
  )
    .join("")
    .trim()
    .slice(0, 4);

  const subMetroPopulationElement = Array.from(
    trElements[1].children[1].textContent
  )
    .join("")
    .trim()
    .slice(0, 5);

  for (let i = 2; i < trElements.length; i++) {
    tableObj = {};

    tableObj[rank] = Array.from(trElements[i].children[0].innerHTML)[0];

    tableObj[city] = Array.from(
      trElements[i].children[1].children[0].innerHTML
    ).join("");

    tableObj[province] = Array.from(
      trElements[i].children[2].children[0].innerHTML
    ).join("");

    tableObj[population] = {
      [subCityPopulationElement]: Array.from(
        trElements[i].children[3].innerHTML
      ).join(""),
      [subMetroPopulationElement]: Array.from(
        trElements[i].children[4].innerHTML
      ).join(""),
    };

    tableDataList.push(tableObj);
  }
  console.log(tableDataList);
};

getTableDatas("wikitable");
