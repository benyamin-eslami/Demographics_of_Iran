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
  console.log(tableDataList);
};

getTableDatas("wikitable");
