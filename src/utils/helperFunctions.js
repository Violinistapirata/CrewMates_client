function getCurrentDate(){
	const fullDate = new Date().toISOString()
	const date = fullDate.slice(0, 10);
	//The date we convert to milliseconds has the format YYYY-MM-DD //as we don't want the time
	
	const dateInMilliseconds = new Date(date).getTime();
	//We send the date to the backend through the endpoint URL in millisecods
	return dateInMilliseconds;
}

export {getCurrentDate};