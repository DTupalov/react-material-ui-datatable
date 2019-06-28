export default function getSuggestions(value, listItems) {
  const inputValue = value
    .toString()
    .trim()
    .toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? listItems
    : listItems.filter(item => {
        item = item.toString();
        const keep =
          count < 5 &&
          item
            .toString()
            .slice(0, inputLength)
            .toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
