function colorizer(colorsObj) {
  const p = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, li, span, td'
  );
  p.forEach((node) => {
    const text = node.innerHTML;
    const textArr = text.split(' ');
    const regex = /[^a-z0-9]/gi;
    textArr.forEach((word, index) => {
      const parsedWord = word.toLowerCase().replace(regex, '');
      if (colorsObj[parsedWord])
        textArr[
          index
        ] = `<span class="animate-colorizer" style="animation-delay: ${
          100 * index
        }ms; font-weight: bold; color: ${
          colorsObj[parsedWord]
        }">${word}</span>`;
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
