let contactsInformationList = [];
let fcount = 1;

class Contact {
  constructor(name, email, mobileNo, city, gender) {
    this.name = name;
    this.email = email;
    this.mobileNo = mobileNo;
    this.city = city;
    this.gender = gender;
  }
}
function isIncorrect(newInput) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var phoneno = /^\d{10}$/;
  if (
    newInput.name === "" ||
    // applied email validation
    !newInput.email.match(mailformat) ||
    // applied phone validation
    !newInput.mobileNo.match(phoneno) ||
    newInput.city === "none" ||
    newInput.gender === ""
  ) {
    return true;
  }
  return false;
}

function readData() {
  let i;
  for (i = 1; i <= fcount; i++) {
    const name = document.getElementById(`name-${i}`).value;
    const email = document.getElementById(`email-${i}`).value;
    const mobileNo = document.getElementById(`mobile-${i}`).value;
    const city = document.getElementById(`city-${i}`).value;
    // doubt 2 - why getelementsbyname does not work
    const gender = document.querySelector(`input[name="gender-${i}"]:checked`)
      ? document.querySelector(`input[name="gender-${i}"]:checked`).value
      : "";
    let newInput = new Contact(name, email, mobileNo, city, gender);
    if (!isIncorrect(newInput)) {
      contactsInformationList.push(newInput);
    } else {
      alert("Incorrect Input At Form : " + `${i}`);
      return;
    }
  }
  for (i = 1; i <= fcount; i++) {
    ClearData(i);
  }
}

function ClearData(i) {
  document.getElementById(`name-${i}`).value = null;
  document.getElementById(`email-${i}`).value = null;
  document.getElementById(`mobile-${i}`).value = null;
  document.getElementById(`city-${i}`).value = "";
  // doubt 5 why null not working on gender
  const btn = document.querySelector(`input[name="gender-${i}"]:checked`);
  btn.checked = false;
}

function displayContactInfo(contactsInformationList) {
  console.log(contactsInformationList);
}

function saveContact() {
  console.log("save called!");
  readData();
  displayContactInfo(contactsInformationList);
  contactsInformationList = [];
  document.querySelector("#task").innerHTML = "";
  document.querySelector("#task").appendChild(getFormHTML(1));
}

function removeForm(i) {
  if (fcount === 1) {
    alert("Form Is Empty");
    console.log("Not Allowed To Remove");
  } else {
    var element = document.getElementById(`container-${i}`);
    element.remove();
    fcount--;
  }
  if (fcount == 1) {
    var tp = document.getElementsByClassName("criss-cross");
    tp[0].style.display = "none";
  }
}

function getFormHTML(index) {
  const ct = document.createElement("div");
  ct.innerHTML = `<div id="ball">
    <div>${index}</div>
  </div>
  ${`
      <input
        type="button"
        class="criss-cross"
        id="cross-${index}"
        onclick="removeForm(${index})"
        value="&#10060;"
      />`}
  <br /><br />
  <div class="row-1">
    <div class="col-1">
      <label for="name"><b>Name</b></label>
      <br />
      <input type="text" id="name-${index}" >
    </div>
    <div class="col-1">
      <label for="email"><b>Email</b></label>
      <br />
      <input type="email" id="email-${index}">
    </div>
    <div class="col-1">
      <label for="mobile"><b>Mobile</b></label>
      <br />
      <!-- doubt 4 - why placeholder and pattern is not working -->
      <input
        type="tel"
        id="mobile-${index}"
        placeholder="9415673267"
        pattern="[0-9]{10}"
      />
    </div>
    <div class="col-1">
      <label for="city"><b>City</b></label>
      <br />
      <select name="city" id="city-${index}">
      <option value="none" selected disabled hidden>Select an Option</option>
        <option value="mathura">Mathura</option>
        <option value="bhagya nagar">Bhagya Nagar</option>
        <option value="banglore">Banglore</option>
        <option value="Delhi">Delhi</option>
      </select>
    </div>
  </div>
  <div class="row-1">
    <div class="col-2">
      <label for="gender"><b>Gender</b></label>
      <input type="radio" name="gender-${index}" value="male" />
      <label>Male</label>
      <input type="radio" name="gender-${index}" value="female" />
      <label>Female</label>
    </div>
  </div>
`;
  ct.classList.add("container");
  ct.setAttribute(`id`, `container-${index}`);
  return ct;
}

function addForm() {
  fcount++;
  var tp = document.getElementsByClassName("criss-cross");
  tp[0].style.display = "block";
  if (fcount <= 5) {
    document.querySelector("#task").appendChild(getFormHTML(fcount));
    const tp = document.getElementById(`cross-${fcount}`);
    tp.style.display = "block";
  } else {
    fcount--;
    alert("Already 5 forms present");
  }
}
document.querySelector("#task").appendChild(getFormHTML(1));
