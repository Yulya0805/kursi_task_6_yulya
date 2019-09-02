var container= document.getElementById("container");

let formValues = [
      {name:"", surname: ""},
      {age:"", email: ""},
      {telephone:"", phoneage: ""},
]

let formResult = {};

let initForm = `<form id="form1" name="myForm" onsubmit="return nextForm(event, 1, 2)">
                  <input placeholder="name" type="text" name="name" value=""><br>
                  <input placeholder="surname" type="text" name="surname" value=""><br>
                  <input type="submit" value="next form">
                  </form>`;

container.innerHTML += initForm;

function nextForm(event, currentNumberForm, nextNumberForm) {
      event.preventDefault();
      let formId = `form${currentNumberForm}`;
      let nextFormId = `form${nextNumberForm}`;
      let currentForm = document.getElementById(formId);
      let formInputs = currentForm.elements; 
      for (i = 0; i < formInputs.length; i++) {
            if (formInputs[i].type !== 'submit')
            formValues[currentNumberForm - 1][formInputs[i].name] = formInputs[i].value;
      }

      if (currentNumberForm === 3) {
            formResult = Object.assign(formResult, formValues[currentNumberForm-1]);
            container.innerHTML = 'your subjects and descriptions here';
            for (formResultIndex in formResult) {
                  container.innerHTML += `
                        <p>${formResultIndex} = ${formResult[formResultIndex]}</p>`;
            }

            container.innerHTML += `<button onclick="return sendData(formResult)">send your data</button>`;
            return;
      }

      /* formate new form(next form) */
      currentForm.id = `form${nextNumberForm}`;
      let constructorNextForm = '';
      currentForm.setAttribute("onSubmit", `return nextForm(event, ${nextNumberForm}, ${nextNumberForm + 1})`);
      for (i in formValues[nextNumberForm-1]) {
            constructorNextForm += `
            <input placeholder="${i}" type="text" name="${i}" value=""><br>`;
      }
      
      if (currentNumberForm === 2) {
            constructorNextForm += `<input type="submit" value="check your entered data">`;
      } else {
            constructorNextForm += '<input type="submit" value="next form">';
      }

      currentForm.innerHTML = constructorNextForm;
      formResult = Object.assign(formResult, formValues[currentNumberForm-1]);
}

function sendData(data) {
      alert('Your data has been sent successfully! Thanks');
}





