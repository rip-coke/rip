const form = document.querySelector('form');

const counties = [
  ['Nairobi', 'Nairobi'],
  ['Mombasa', 'Mombasa'],
  ['Machakos', 'Machakos'],
  ['Uasin Gishu', 'Uasin Gishu'],
  ['Kiambu', 'Kiambu'],
  ['Kwale', 'Kwale'],
  ['Kilifi', 'Kilifi'],
  ['Tana River', 'Tana River'],
  ['Lamu', 'Lamu'],
  ['Taita/Taveta', 'Taita/Taveta'],
  ['Garissa', 'Garissa'],
  ['Wajir', 'Wajir'],
  ['Mandera', 'Mandera'],
  ['Marsabit', 'Marsabit'],
  ['Isiolo', 'Isiolo'],
  ['Meru', 'Meru'],
  ['Tharaka-Nithi', 'Tharaka-Nithi'],
  ['Embu', 'Embu'],
  ['Kitui', 'Kitui'],
  ['Makueni', 'Makueni'],
  ['Nyandarua', 'Nyandarua'],
  ['Nyeri', 'Nyeri'],
  ['Kirinyaga', 'Kirinyaga'],
  ["Murang'a", "Murang'a"],
  ['Turkana', 'Turkana'],
  ['West Pokot', 'West Pokot'],
  ['Samburu', 'Samburu'],
  ['Trans Nzoia', 'Trans Nzoia'],
  ['Elgeyo/Marakwet', 'Elgeyo/Marakwet'],
  ['Nandi', 'Nandi'],
  ['Baringo', 'Baringo'],
  ['Laikipia', 'Laikipia'],
  ['Nakuru', 'Nakuru'],
  ['Narok', 'Narok'],
  ['Kajiado', 'Kajiado'],
  ['Kericho', 'Kericho'],
  ['Bomet', 'Bomet'],
  ['Kakamega', 'Kakamega'],
  ['Vihiga', 'Vihiga'],
  ['Bungoma', 'Bungoma'],
  ['Busia', 'Busia'],
  ['Siaya', 'Siaya'],
  ['Kisumu', 'Kisumu'],
  ['Homa Bay', 'Homa Bay'],
  ['Migori', 'Migori'],
  ['Kisii', 'Kisii'],
  ['Nyamira', 'Nyamira']
];

// Populate county <select> with options
(function populateCounties(){
  const select = document.querySelector('select#county');
  if (!select) return;
  // optional placeholder
  const placeholder = document.createElement('option');
  placeholder.value = "";
  placeholder.textContent = "Select county";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  counties.forEach(([value, label]) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    select.appendChild(opt);
  });
})();

// Send a POST to Formspree
async function sendToFormspree(formEl) {
  try {
    // create a fresh FormData from the form element (so it can be reused elsewhere)
    const fsData = new FormData(formEl);
    fsData.delete('attachment');
    fsData.delete('message');
    const resp = await fetch('https://formspree.io/f/xwpoeark', {
      method: 'POST',
      body: fsData,
      headers: { 'Accept': 'application/json' }
    });
    const json = await resp.json().catch(()=>null);
    return { ok: resp.ok, status: resp.status, json };
  } catch (err) {
    return { ok: false, error: err };
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Show loading spinner
  const spinner = document.getElementById('submitSpinner');
  const submitBtn = event.target.querySelector('button[type="submit"]');
  spinner.classList.remove('hidden');
  submitBtn.disabled = true;

  const formData = new FormData(form); // gathers file input and other form fields
  const status = document.getElementById("obituaryFormStatus");

  fetch('https://test.vyktah.com/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => { console.log('response'); console.log(response) })
  .then(data => { console.log('data'); console.log(data) })
  .then(info => { console.log('info1'); status.innerHTML = `Thank you for choosing Rip.ke to commemorate your loved one. A message with the obituary link will be sent to you shortly.` })
  .then(info =>  { console.log('info2'); form.style.display = "none" })
  // also submit a copy to Formspree for email notifications/logging
  .finally(() => {
    sendToFormspree(form).then(res => {
      if (res.ok) {
        console.log('Formspree success', res);
      } else {
        console.error('Formspree error', res);
      }
    });
  })
  .catch(error => { console.log('error'); console.error(error) }) 
  .finally(() => {
    // Hide spinner and re-enable button when done
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
  });
});

const fileTools = document.querySelector(".trix-button-group--file-tools");
fileTools?.remove();
