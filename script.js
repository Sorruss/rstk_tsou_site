import { Modal } from 'flowbite';

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
