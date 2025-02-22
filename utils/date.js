function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day}:${hours}:${minutes}`;
}

function fullYear() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

module.exports = {
  getDate,
  fullYear,
};
