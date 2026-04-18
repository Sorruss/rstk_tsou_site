import { Modal } from 'flowbite';

// --------
// EMAIL JS
(function() {
    emailjs.init({
        publicKey: "b17p2jq-p35lOlL_L",
    });
})();

function toastError(error)
{
    Toastify({
        text: error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

function toastSuccess(error)
{
    Toastify({
        text: error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const $modal = document.getElementById("auth-modal");
        const modal = new Modal($modal);
        
        const template_params =
        {
            name: document.getElementById("contact-form-name").value,
            email: document.getElementById("contact-form-email").value,
            message: document.getElementById("contact-form-message").value,
            course_type: document.getElementById("contact-form-course_type").value,
            course_category: document.getElementById("contact-form-course_category").value,
            phone: document.getElementById("contact-form-phone").value
        };

        if (template_params.name === "" || template_params.name == null)
        {
            toastError("Ви не вказали ім'я");
            return;
        }
        else if (template_params.email === "" || template_params.email == null)
        {
            toastError("Ви не вказали поштову адресу");
            return;
        }
        else if (template_params.course_type === "" || template_params.course_type == null)
        {
            toastError("Ви не вказали тип курсу");
            return;
        }
        else if (template_params.course_category === "" || template_params.course_category == null)
        {
            toastError("Ви не вказали категорію курсу");
            return;
        }
        else if (template_params.phone === "" || template_params.phone == null)
        {
            toastError("Ви не вказали телефон");
            return;
        }

        emailjs.sendForm('service_58uok6g', 'template_hwe67o6', this).then(() => {
                toastSuccess("Листа надіслано !");
                modal.hide();
            }, (error) => {
                toastError("Щось пішло не так");
            });
    });
}

// ---
// CMS
// ABOUT
fetch('/content/about.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('about-title').textContent = data.title;
    document.getElementById('about-text').textContent = data.text;
});

// FEATURES
fetch('/content/features')
  .then(() => fetch('/content/features/index.json').catch(() => null)) // fallback
  .then(async () => {
    const container = document.getElementById('features-container');

    const files = [
      'feature1.json',
      'feature2.json',
      'feature3.json',
      'feature4.json'
    ];

    for (let file of files) {
      try {
        const res = await fetch(`/content/features/${file}`);
        const data = await res.json();

        container.innerHTML += `
          <div class="feature">
            <div class="flex items-center gap-3 min-h-14">
              <img src="${data.icon}" class="h-10 w-10 object-contain">
              <p class="font-semibold text-base">${data.title}</p>
            </div>
            <p class="text-sm text-white/80">${data.description}</p>
          </div>
        `;
      } catch {}
    }
});

// GALLERY
(async () => {
  const container = document.getElementById('gallery-container');

  const images = ['1.jpg','2.jpg','3.jpg','4.jpg'];

  for (let img of images) {
    container.innerHTML += `
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="/media/images/carousel/${img}" class="absolute block w-full h-full object-cover">
      </div>
    `;
  }
})();

// PRICES
fetch('/content/prices.json')
  .then(res => res.json())
  .then(data => {
    const theory = document.getElementById('theory-prices');
    const practice = document.getElementById('practice-prices');

    data.theory.forEach(item => {
      theory.innerHTML += `
        <div class="grid grid-cols-3 px-4 py-3">
          <div>${item.category}</div>
          <div>${item.price}</div>
          <div>${item.duration}</div>
        </div>
      `;
    });

    data.practice.forEach(item => {
      practice.innerHTML += `
        <div class="grid grid-cols-3 px-4 py-3">
          <div>${item.category}</div>
          <div>${item.price}</div>
          <div>${item.duration}</div>
        </div>
      `;
    });
});

// CONTACTS
fetch('/content/contacts.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('contact-phone').textContent = data.phone;
    document.getElementById('contact-email').textContent = data.email;
    document.getElementById('contact-address').textContent = data.address;
});
