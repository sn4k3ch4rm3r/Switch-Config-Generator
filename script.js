function valOrPH(element) {
	return element.value?element.value:element.placeholder;
}

function genConfig() {
	let resBox = document.getElementById("result");

	let hostname = document.getElementById("hostname");
	let domain = document.getElementById("domain");
	
	let adminUsr = document.getElementById("admin-user");
	let adminPwd = document.getElementById("admin-password");
	let adminPwdType = document.getElementById("admin-pwd-type").value;
	let adminPriv = document.getElementById("admin-privilege").value;

	let ip = document.getElementById("vlan-addr");
	let mask = document.getElementById("vlan-mask");
	let gateway = document.getElementById("gateway");

	let conPass = document.getElementById("con-pass");
	let enPass = document.getElementById("en-pass");
	let vtyPass = document.getElementById("vty-pass");

	let transportInput = document.getElementById("transport-input").value;

	let cmds = [
		"en",
		"conf t",
		`hostname ${valOrPH(hostname)}`,
		`ip domain-name ${valOrPH(domain)}`,
		`username ${valOrPH(adminUsr)} privilege ${adminPriv} ${adminPwdType} ${valOrPH(adminPwd)}`,
		"crypto key gen rsa",
		"2048",
		"int vlan 1",
		`ip address ${valOrPH(ip)} ${valOrPH(mask)}`,
		"no shut",
		"exit",
		`ip default-gateway ${valOrPH(gateway)}`,
		"line con 0",
		`password ${valOrPH(conPass)}`,
		"login",
		"exit",
		`enable secret ${valOrPH(enPass)}`,
		"line vty 0 15",
		`password ${valOrPH(vtyPass)}`,
		`transport input ${transportInput}`,
		"login local",
		"exit",
	];

	resBox.innerHTML = "";
	for (let i = 0; i < cmds.length; i++) {
		resBox.innerHTML += `${cmds[i]}<br/>`
	}
}