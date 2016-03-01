//convert a timestamp to a day e.g. 1456756698612 = Monday

var timestamp = context.getVariable("system.timestamp");
var date = new Date(Number(timestamp));
var day = date.getDay(); //0 is sunday, 1 is monday ...

var displayDay = "";

switch (day) {
	case 0:
		displayDay = "Sunday";
		break;
	case 1:
		displayDay = "Monday";
		break;
	case 2:
		displayDay = "Tuesday";
		break;
	case 3:
		displayDay = "Wednesday";
		break;
	case 4:
		displayDay = "Thursday";
		break;
	case 5:
		displayDay = "Friday";
		break;
	default:
		displayDay = "Saturday";
}

context.setVariable("my.day", displayDay);