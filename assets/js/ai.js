---
title: ai.js
---

console.log('Paystack JavaScript loaded');

console.log("{{site.paystack_public_key}}");

const popup = new PaystackPop();
var url = "<%= html_escape(home_verify_url('code')) %>"



// Send a POST to Formspree
async function sendToFormspree(formEl) {
  const status = document.getElementById("obituaryFormStatus");
  try {
    // create a fresh FormData from the form element (so it can be reused elsewhere)
    const fsData = new FormData(formEl);
    fsData.delete('attachment');
    fsData.delete('attachment_1');
    fsData.delete('attachment_2');
    fsData.delete('attachment_3');
    fsData.delete('attachment_4');
    fsData.delete('message');
    const resp = await fetch('https://formspree.io/f/xwpoeark', {
      method: 'POST',
      body: fsData,
      headers: { 'Accept': 'application/json' }
    });
    const json = await resp.json().catch(()=>null);
    status.innerHTML = "Thank you for choosing Rip.ke to commemorate your loved one. A message with the obituary link will be sent to you shortly.";
    formEl.style.display = "none";
    return { ok: resp.ok, status: resp.status, json };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// Send a POST to Formspree
async function sendToUpload(formEl) {
  try {
    // create a fresh FormData from the form element (so it can be reused elsewhere)
    const fsData = new FormData(formEl);
    const resp = await fetch('https://test.vyktah.com/upload', {
      method: 'POST',
      body: fsData,
      headers: { 'Accept': 'application/json' }
    });
    const json = await resp.json().catch(()=>null);
    sendToFormspree(formEl);
    return { ok: resp.ok, status: resp.status, json };
  } catch (err) {
    return { ok: false, error: err };
  }
}

function initializeForm() {
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

  var form = document.getElementById("obituaryForm");
  var email = document.getElementById("email");

  if (!form || !email) return;

  async function handleSubmit(event) {
    event.preventDefault();

    document.getElementById('submitSpinner').classList.remove('hidden');

    var status = document.getElementById("obituaryFormStatus");
    var data = new FormData(event.target);
    
    popup.newTransaction({
        key: "{{site.paystack_public_key}}",
        email: email.value,
        amount: 500000,
        onSuccess: (transaction) => {
          data.append("transaction", JSON.stringify(transaction))

          console.log("Success: ", transaction);
          
          sendToUpload(form);
        },
        onLoad: (response) => {
        console.log("onLoad: ", response);
        },
        onCancel: () => {
        console.log("onCancel");
        },
        onError: (error) => {
        console.log("Error: ", error.message);
        },
        onClose: function(){
        alert('Payment window closed');
        }
      });
  }
  form.addEventListener("submit", handleSubmit)

  let emailTimeout, phoneTimeout;

  // Email validation on keyup with timeout
  email.addEventListener('keyup', function() {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(() => {
        const emailVal = this.value;
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(emailVal)) {
          emailError.classList.remove('hidden');
        } else {
          emailError.classList.add('hidden');
        }
    }, 400);
  });

  // Phone validation on keyup with timeout
  const phone = document.getElementById('phone');
  if (phone) {
    phone.addEventListener('keyup', function() {
      clearTimeout(phoneTimeout);
      phoneTimeout = setTimeout(() => {
          const phoneVal = this.value;
          const phoneError = document.getElementById('phoneError');
          const phonePattern = /^\+?\d{10,15}$/;
          if (!phonePattern.test(phoneVal)) {
            phoneError.classList.remove('hidden');
          } else {
            phoneError.classList.add('hidden');
          }
      }, 400);
    });
  }

  const urlInput = document.getElementById("url");
  if (urlInput) {
    urlInput.value = window.location.href;
  }

  const fileTools = document.querySelector(".trix-button-group--file-tools");
  fileTools?.remove();
}

// Wait for DOM to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeForm);
} else {
  initializeForm();
}
