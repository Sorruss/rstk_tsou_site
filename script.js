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
    await LoadInTitleJSON();
    await LoadInAnnouncementsJSON();
    await LoadInAboutJSON();
    await LoadInFeaturesJSON();
    await LoadInPricesJSON();
    await LoadInContactsJSON();
    await LoadInDocumentsJSON();
    await LoadInGalleryJSON();
    await LoadInVideosJSON();
    await LoadInFooterJSON();
});

// TITLE
async function LoadInTitleJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/title.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const logoEl = document.getElementById('title-logo');
        const titleEl = document.getElementById('title-title');
        const licenseEl = document.getElementById('title-license');
        const certificateEl = document.getElementById('title-certificate');
        
        if (logoEl) logoEl.innerHTML += `<img src="${data.logo}" alt="logo" class="w-36 sm:w-40 lg:w-48 h-auto">`;
        if (titleEl) titleEl.textContent = data.title;
        if (licenseEl) licenseEl.textContent = data.license;
        if (certificateEl) certificateEl.textContent = data.certificate;

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// ANNOUNCEMENTS
async function LoadInAnnouncementsJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/announcements.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        if (data.announcements.length <= 0)
        {
            const announcementsEl = document.getElementById('announcements-section');
            announcementsEl.style.display = "none";
            return;
        }

        const titleEl = document.getElementById('announcements-title');
        if (titleEl) titleEl.textContent = data.title;

        const container = document.getElementById('announcements-container');
        if (container)
        {
            for (let announcement of data.announcements) {
                container.innerHTML += `
                <article class="rounded-2xl border border-white/15 bg-white/5 p-5 hover:bg-white/10 transition">
                    <p class="text-sm text-yellow-300 font-semibold mb-2">${announcement.badge}</p>
                    <h3 class="text-lg font-semibold mb-2">${announcement.title}</h3>
                    <p class="text-sm text-white/75 leading-relaxed">
                        ${announcement.text}
                    </p>
                </article>
                `;
            }
        }

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// ABOUT
async function LoadInAboutJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/about.json');
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

// FEATURES
async function LoadInFeaturesJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/features.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const container = document.getElementById('features-container');
        if (container)
        {
            for (let feature of data.features) {
                container.innerHTML += `
                <div class="p-4 sm:p-5 bg-white/5 hover:bg-white/10 transition backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
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

// PRICES
async function LoadInPricesJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/prices.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const titleEl = document.getElementById('prices-title');
        const theoryTextEl = document.getElementById('prices-theory-text');
        const practiceTextEl = document.getElementById('prices-practice-text');
        const categoryTextEl = document.querySelectorAll('#prices-category-text');
        const priceTextEl = document.querySelectorAll('#prices-price-text');
        const durationTextEl = document.querySelectorAll('#prices-duration-text');

        const theoryEl = document.getElementById('theory-prices');
        const practiceEl = document.getElementById('practice-prices');

        if (titleEl) titleEl.textContent = data.title;
        if (theoryTextEl) theoryTextEl.textContent = data.theory_text;
        if (practiceTextEl) practiceTextEl.textContent = data.practice_text;

        if (categoryTextEl)
        {
            categoryTextEl.forEach(item => {
                item.textContent = data.category_text;
            });
        }
        if (priceTextEl)
        {
            priceTextEl.forEach(item => {
                item.textContent = data.price_text;
            });
        }
        if (durationTextEl)
        {
            durationTextEl.forEach(item => {
                item.textContent = data.duration_text;
            });
        }

        if (theoryEl)
        {
            data.theory.forEach(item => {
                theoryEl.innerHTML += `
                    <div class="grid grid-cols-3 px-4 py-3 bg-white/5 hover:bg-white/10 transition">
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
                    <div class="grid grid-cols-3 px-4 py-3 bg-white/5 hover:bg-white/10 transition">
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

// CONTACTS
async function LoadInContactsJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/contacts.json');
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

// DOCUMENTS
async function LoadInDocumentsJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/documents.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const titleEl = document.getElementById('documents-title');
        const textEl = document.getElementById('documents-text');
        const tiptitleEl = document.getElementById('documents-tip_title');
        const tiptextEl = document.getElementById('documents-tip_text');

        if (titleEl) titleEl.textContent = data.title;
        if (textEl) textEl.textContent = data.text;
        if (tiptitleEl) tiptitleEl.textContent = data.tip_title;
        if (tiptextEl) tiptextEl.textContent = data.tip_text;

        const container = document.getElementById('documents-container');
        if (container)
        {
            for (let document of data.items) {
                container.innerHTML += `
                <li class="flex gap-3 items-start">
                    <span class="mt-1.5 flex items-center justify-center h-5 w-5 rounded-full bg-yellow-300 text-xs font-bold shrink-0">
                        ✓
                    </span>
                    <span>${document.title}</span>
                </li>
                `;
            }
        }
        
    } catch (error) {
        console.error("Помилка:", error);
    }
}

// GALLERY - CAROUSEL
async function LoadInGalleryJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/gallery.json');
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
                <img src="${item.image}" class="absolute block w-full h-full object-cover" alt="Фото ${index + 1}">
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

// VIDEOS - CAROUSEL
async function LoadInVideosJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/videos.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();

        const carouselTitleEl = document.getElementById('video-carousel-title');
        if (carouselTitleEl) carouselTitleEl.textContent = data.title;

        const itemsContainer = document.getElementById('video-carousel-items');

        data.carousel.forEach((item, index) =>
        {
            itemsContainer.innerHTML += `
                <div class="hidden duration-700 ease-in-out" 
                    data-carousel-item="${index === 0 ? 'active' : ''}">
                    <div class="w-full h-full">
                        <video class="w-full h-full object-cover" controls>
                            <source src="${item.video}" type="video/mp4">
                            Ваш браузер не підтримує відео.
                        </video>
                    </div>
                </div>
            `;
        });

        if (typeof window.initFlowbite === 'function') window.initFlowbite();

        const pauseAllVideos = () =>
        {
            document.querySelectorAll('#video-carousel video').forEach(video =>
            {
                video.pause();
            });
        };

        document.querySelectorAll('#video-carousel [data-carousel-prev], #video-carousel [data-carousel-next]')
            .forEach(btn =>
            {
                btn.addEventListener('click', pauseAllVideos);
            });

    } catch (error) {
        console.error("Помилка:", error);
    }
}

// FOOTER
async function LoadInFooterJSON()
{
    try {
        const response = await fetch('/rstk_tsou_site/content/footer.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        const logoEl = document.getElementById('footer-logo');
        const titleEl = document.getElementById('footer-title');
        const descriptionEl = document.getElementById('footer-description');
        
        const contactsEl = document.getElementById('footer-contacts');
        const phoneEl = document.getElementById('contact-footer-phone');
        const emailEl = document.getElementById('contact-footer-email');
        const addressEl = document.getElementById('contact-footer-address');

        const categoriesEl = document.getElementById('footer-categories');
        const categorieslistEl = document.getElementById('footer-categories-list');
        data.categories.forEach((item, index) =>
        {
            categorieslistEl.innerHTML += `
                <li>
                    <p class="flex items-center text-sm text-white/80">
                        ${item.name}
                        <button data-popover-target="popover-footer-${index}" data-popover-placement="bottom-end" type="button">
                            <svg class="w-4 h-4 text-white/60 hover:text-white ms-2 transition"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </p>
                    <div data-popover id="popover-footer-${index}" role="tooltip"
                            class="absolute z-10 invisible opacity-0 transition-opacity duration-300
                            w-72 p-4 rounded-xl shadow-lg
                            bg-gray-500/70 backdrop-blur-md border border-white/20 text-white">
                        <div>
                            <h3 class="font-semibold text-white mb-2">
                                Категорія "${item.name}"
                            </h3>
                            <p class="text-sm text-white/80 mb-2 leading-relaxed">${item.description}</p>
                        </div>
                        <div data-popper-arrow class="bg-gray-500/70"></div>
                    </div>
                </li>
            `;
        });

        const socialsEl = document.getElementById('footer-socials');
        const socialslistEl = document.getElementById('footer-socials-list');
        data.social_links.forEach((item, index) =>
        {
            socialslistEl.innerHTML += `
                <a target="_blank" href="${item.url}" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                    <img src="${item.icon}" 
                        alt="${item.name}"
                        class="w-5 h-5">
                </a>
            `;
        });

        if (logoEl) logoEl.src = data.logo;
        if (titleEl) titleEl.textContent = data.title;
        if (descriptionEl) descriptionEl.textContent = data.description;

        if (contactsEl) contactsEl.textContent = data.title_contacts;
        if (phoneEl) phoneEl.textContent = data.phone;
        if (emailEl) emailEl.textContent = data.email;
        if (addressEl) addressEl.textContent = data.address;

        if (categoriesEl) categoriesEl.textContent = data.title_categories;

        if (socialsEl) socialsEl.textContent = data.title_socials;

        const licenseEl = document.getElementById('footer-license');
        if (licenseEl) licenseEl.textContent = data.license;

        if (typeof window.initFlowbite === 'function') window.initFlowbite();

    } catch (error) {
        console.error("Помилка:", error);
    }
}
