export default function formatData(data, type) {
  const formattedData = data.entries
    .filter(t => {
      return t.programType === type && t.releaseYear >= 2010;
    })
    .sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    })
    .slice(0, 21);
  return formattedData;
}
