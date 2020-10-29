const colorsObj = {
  red: '#FF0000',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#2E2B5F',
  violet: '#8B00FF',
};

// <span style="color: blue">blue</span>;
function colorizer(colorsObj) {
  const p = document.querySelectorAll('p');
  p.forEach((node) => {
    const text = node.innerHTML;
    const textArr = text.split(' ');
    const regex = /[^a-z0-9]/gi;
    textArr.forEach((word, index) => {
      const parsedWord = word.toLowerCase().replace(regex, '');
      if (colorsObj[parsedWord])
        textArr[
          index
        ] = `<span class="animate-colorizer" style="color: ${colorsObj[parsedWord]}">${word}</span>`;
    });
    node.innerHTML = textArr.join(' ');
  });
}

const regex = /[^a-z0-9]/gi;
fetch('https://api.color.pizza/v1/')
  .then((data) => data.json())
  .then((data) =>
    data.colors.reduce((acc, cur) => {
      acc[cur.name.toLowerCase()] = cur.hex;
      return acc;
    }, {})
  )
  .then((data) => colorizer(data));
