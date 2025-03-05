function getCurrentDate() {
  const fullDate = new Date().toISOString();
  const date = fullDate.slice(0, 10);
  //The date we convert to milliseconds has the format YYYY-MM-DD //as we don't want the time

  const dateInMilliseconds = new Date(date).getTime();
  //We send the date to the backend through the endpoint URL in millisecods
  return dateInMilliseconds;
}

function createWeek(groupId, setTasks, setErrorMessage, API_URL) {
  const storedToken = localStorage.getItem("authToken");
  const currentDate = getCurrentDate();

  fetch(`${API_URL}/api/week/${groupId}/${currentDate}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setTasks(response.tasks);
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("There was an error. Please try again later.");
    });
}

export { getCurrentDate, createWeek };
