// Get DOM elements
const uploadButton = document.getElementById('uploadButton');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const submitPrescription = document.getElementById('submitPrescription');
const doctorInput = document.getElementById('doctor');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const fileInput = document.getElementById('fileInput');
const prescriptionGallery = document.getElementById('prescriptionGallery');

// Open the upload modal
uploadButton.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

// Close the upload modal
closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Submit prescription details
submitPrescription.addEventListener('click', () => {
    const doctor = doctorInput.value.trim();
    const date = dateInput.value;
    const description = descriptionInput.value.trim();
    const file = fileInput.files[0];

    if (doctor && date && description && file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Create prescription item
            const prescriptionItem = document.createElement('div');
            prescriptionItem.classList.add('prescription-item');

            // Image element
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = "Prescription Image";
            prescriptionItem.appendChild(img);

            // Details
            const details = document.createElement('div');
            details.classList.add('details');
            details.innerHTML = `
                <strong>Doctor:</strong> ${doctor} <br>
                <strong>Date:</strong> ${date} <br>
                <strong>Notes:</strong> ${description}
            `;
            prescriptionItem.appendChild(details);

            // Add to gallery
            prescriptionGallery.insertBefore(prescriptionItem, prescriptionGallery.firstChild);

            // Reset and close modal
            doctorInput.value = '';
            dateInput.value = '';
            descriptionInput.value = '';
            fileInput.value = '';
            uploadModal.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please fill in all fields!');
    }
});
