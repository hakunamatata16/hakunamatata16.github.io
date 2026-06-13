
const classroom = document.getElementById("classroom");
const building = document.getElementById("building");

const qrContainer = document.getElementById("qrcode");
const qr = new QRCode(qrContainer, {
    text: getCode(),
    width: 256,
    height: 256
});

const params = new URLSearchParams(location.search);


function formatDate(date) {

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, '0');
	const mins = String(date.getMinutes()).padStart(2, '0');

	const result = `${day}/${month}/${year} ${hours}:${mins}`;

	return result;
}

function encode(classroom, building, datetime) {

	const text = `${classroom} ${building}|${datetime}`;
	const key = 'uade123';
	let code = '';

	for (let index = 0; index < text.length; index++) {

		const charCode = text.charCodeAt(index);
		const keyCode = key.charCodeAt(index % key.length);

		code += (charCode ^ keyCode).toString(16).padStart(2, '0');
	}

	return code;
}

function getCode() {
	return encode(
		classroom.value,
		building.value,
		formatDate(new Date())
	);
}

function isValid(classroom, building) {
	return (
		classroom != ""
		&& !classroom.includes("|")
		&& !classroom.includes(" ")
		&& building != ""
		&& !building.includes("|")
	);
}

function update() {

	let path;

	if (isValid(classroom.value, building.value)) {

		qr.makeCode(getCode());
		qrContainer.classList.remove("hidden");


		const params = new URLSearchParams();
		params.set("classroom", classroom.value);
		params.set("building", building.value);
		path = "?" + params.toString();
		

	} else {

		qrContainer.classList.add("hidden");
		
		path = "/";
	}

    history.replaceState(null, "", path);
}

function setParamsToInputs() {

	[classroom, building].forEach(
		input => input.value = params.get(input.id)
	);
}



setParamsToInputs();
update();

setInterval(update, 30000);

[classroom, building].forEach(input => input.addEventListener("input", update));

