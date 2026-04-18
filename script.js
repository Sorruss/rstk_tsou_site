// ---------------------
// EMAIL.JS CODE SECTION
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
    document.querySelector('form#contact-form').addEventListener('submit', function(event) {
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

// ----------------------
// DECAP CMS CODE SECTION
document.addEventListener('DOMContentLoaded', async function() {
    await LoadInAboutJSON();
    await LoadInContactsJSON();
    await LoadInFooterJSON();
    await LoadInPricesJSON();
    await LoadInGalleryJSON();
    await LoadInFeaturesJSON();
});

// ABOUT
async function LoadInAboutJSON()
{
    try {
        const response = await fetch('/content/about.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const titleEl = document.getElementById('about-title');
        const textEl = document.getElementById('about-text');
        const imageEl = document.getElementById('about-image');
        
        if (titleEl) titleEl.textContent = data.title;
        if (textEl) textEl.textContent = data.text;
        if (imageEl)
            imageEl.style.backgroundImage = `url('${data.image}')`;

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// CONTACTS
async function LoadInContactsJSON()
{
    try {
        const response = await fetch('/content/contacts.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const titleEl = document.getElementById('contact-title');
        const phoneEl = document.getElementById('contact-phone');
        const emailEl = document.getElementById('contact-email');
        const addressEl = document.getElementById('contact-address');
        
        if (titleEl) titleEl.textContent = data.title;
        if (phoneEl) phoneEl.textContent = data.phone;
        if (emailEl) emailEl.textContent = data.email;
        if (addressEl) addressEl.textContent = data.address;
    } catch (error) {
        console.error("Помилка:", error);
    }
}

// FOOTER
async function LoadInFooterJSON()
{
    try {
        const response = await fetch('/content/footer.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        const titleEl = document.getElementById('footer-title');
        const phoneEl = document.getElementById('contact-footer-phone');
        const emailEl = document.getElementById('contact-footer-email');
        const addressEl = document.getElementById('contact-footer-address');

        const contactsEl = document.getElementById('footer-contacts');
        const descriptionEl = document.getElementById('footer-description');
        
        const categoriesEl = document.getElementById('footer-categories');
        const socialsEl = document.getElementById('footer-socials');

        if (titleEl) titleEl.textContent = data.title;
        if (phoneEl) phoneEl.textContent = data.phone;
        if (emailEl) emailEl.textContent = data.email;
        if (addressEl) addressEl.textContent = data.address;

        if (contactsEl) contactsEl.textContent = data.title_contacts;
        if (descriptionEl) descriptionEl.textContent = data.description;

        if (categoriesEl) categoriesEl.textContent = data.title_categories;
        if (socialsEl) socialsEl.textContent = data.title_socials;

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// PRICES
async function LoadInPricesJSON()
{
    try {
        const response = await fetch('/content/prices.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const titleEl = document.getElementById('prices-title');
        const theoryTextEl = document.getElementById('prices-theory-text');
        const practiceTextEl = document.getElementById('prices-practice-text');
        const categoryTextEl = document.getElementById('prices-category-text');
        const priceTextEl = document.getElementById('prices-price-text');
        const durationTextEl = document.getElementById('prices-duration-text');

        const theoryEl = document.getElementById('theory-prices');
        const practiceEl = document.getElementById('practice-prices');

        if (titleEl) titleEl.textContent = data.title;
        if (theoryTextEl) theoryTextEl.textContent = data.theory_text;
        if (practiceTextEl) practiceTextEl.textContent = data.practice_text;
        if (categoryTextEl) categoryTextEl.textContent = data.category_text;
        if (priceTextEl) priceTextEl.textContent = data.price_text;
        if (durationTextEl) durationTextEl.textContent = data.duration_text;

        if (theoryEl)
        {
            data.theory.forEach(item => {
                theoryEl.innerHTML += `
                    <div class="grid grid-cols-3 px-4 py-3">
                    <div>${item.category}</div>
                    <div>${item.price}</div>
                    <div>${item.duration}</div>
                    </div>
                `;
            });
        }

        if (practiceEl)
        {
            data.practice.forEach(item => {
                practiceEl.innerHTML += `
                    <div class="grid grid-cols-3 px-4 py-3">
                    <div>${item.category}</div>
                    <div>${item.price}</div>
                    <div>${item.duration}</div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Помилка:", error);
    }
}

// GALLERY - CAROUSEL
async function LoadInGalleryJSON()
{
    try {
        const response = await fetch('/content/gallery.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const carouselTitleEl = document.getElementById('carousel-title');
        if (carouselTitleEl) carouselTitleEl.textContent = data.title;

        const itemsContainer = document.getElementById('carousel-items');
        const indicatorsContainer = document.getElementById('carousel-indicators');

        data.carousel.forEach((item, index) =>
        {
            itemsContainer.innerHTML += `
                <div class="${index === 0 ? '' : 'hidden'} duration-700 ease-in-out" data-carousel-item>
                <img src="${item}" class="absolute block w-full h-full object-cover" alt="Фото ${index + 1}">
                </div>
            `;

            indicatorsContainer.innerHTML += `
                <button type="button"
                class="w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-white/60' : 'bg-white/30'}"
                aria-current="${index === 0 ? 'true' : 'false'}"
                aria-label="Slide ${index + 1}"
                data-carousel-slide-to="${index}">
                </button>
            `;
        });

        if (typeof window.initFlowbite === 'function') window.initFlowbite();

        const backgroundEl = document.getElementById('body-background');
        if (backgroundEl)
            backgroundEl.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${data.background_image}')`;

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// FEATURES
async function LoadInFeaturesJSON()
{
    try {
        const response = await fetch('/content/features.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const container = document.getElementById('features-container');
        if (container)
        {
            for (let feature of data.features) {
                container.innerHTML += `
                <div class="feature">
                    <div class="flex items-center gap-3 min-h-14">
                    <img src="${feature.icon}" class="h-10 w-10 object-contain">
                    <p class="font-semibold text-base">${feature.title}</p>
                    </div>
                    <p class="text-sm text-white/80">${feature.description}</p>
                </div>
                `;
            }
        }
        
    } catch (error) {
        console.error("Помилка:", error);
    }
}
