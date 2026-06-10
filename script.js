


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

	for (let i = 0; i < text.length; i++) {

		const charCode = text.charCodeAt(i);
		const keyCode = key.charCodeAt(i % key.length);

		code += (charCode ^ keyCode).toString(16).padStart(2, '0');
	}

	return code;
}

function getCode() {
	return encode(
		document.getElementById("classroom").value,
		document.getElementById("building").value,
		formatDate(new Date())
	)
}

const qrContainer = document.getElementById("qrcode");

const qr = new QRCode(qrContainer, {
    text: getCode(),
    width: 256,
    height: 256
});

function update() {
	qr.makeCode(getCode());
}

setInterval(update, 30000);


["classroom", "building"].forEach(id => {
	document.getElementById(id).addEventListener("input", update);
});


