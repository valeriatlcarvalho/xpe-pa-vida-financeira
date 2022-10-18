export function entriesToObject(entries) {
  const data = entries.map((entry) => ({
    [entry[0]]: entry[1],
  }));

  let objectData = {};
  data.forEach(item => {
    objectData = {
      ...objectData,
      ...item,
    }
  });

  return objectData;
}
