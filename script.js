document.getElementById("resumeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Capture form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Get all education, skills, experience, and project entries
    const educationList = Array.from(document.getElementsByName("education")).map(el => el.value);
    const skillsList = Array.from(document.getElementsByName("skills")).map(el => el.value);
    const experienceList = Array.from(document.getElementsByName("experience")).map(el => el.value);

    // For Projects: Project Name and URL
    const projectNames = Array.from(document.getElementsByName("projectName")).map(el => el.value);
    const projectURLs = Array.from(document.getElementsByName("projectURL")).map(el => el.value);
    
    // Display the profile picture (if any)
    const profilePicture = document.getElementById("profilePicture").files[0];
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-image").src = e.target.result;
        };
        reader.readAsDataURL(profilePicture);
    }

    // Display the captured data in the resume
    document.getElementById("display-name").textContent = name;
    document.getElementById("display-contact").innerHTML = `Email: ${email}<br>Phone: ${phone}`;

    // Add Education details
    const educationDisplay = document.getElementById("display-education");
    educationDisplay.innerHTML = ''; // Clear previous entries
    educationList.forEach(education => {
        const li = document.createElement('li');
        li.textContent = education;
        educationDisplay.appendChild(li);
    });

    // Add Skills
    const skillsDisplay = document.getElementById("display-skills");
    skillsDisplay.innerHTML = ''; // Clear previous entries
    skillsList.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsDisplay.appendChild(li);
    });

    // Add Work Experience
    const experienceDisplay = document.getElementById("display-experience");
    experienceDisplay.innerHTML = ''; // Clear previous entries
    experienceList.forEach(experience => {
        const li = document.createElement('li');
        li.textContent = experience;
        experienceDisplay.appendChild(li);
    });

    // Add Projects (Project Name and URL)
    const projectsDisplay = document.getElementById("display-projects");
    projectsDisplay.innerHTML = ''; // Clear previous entries
    projectNames.forEach((projectName, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = projectName;
        link.href = projectURLs[index];
        link.target = "_blank"; // Open link in a new tab
        li.appendChild(link);
        projectsDisplay.appendChild(li);
    });

    // Show the resume section
    document.querySelector('.resume-section').scrollIntoView({ behavior: 'smooth' });
});

// Add more fields dynamically
function addEducationField() {
    const educationFields = document.getElementById('education-fields');
    const newField = document.createElement('textarea');
    newField.setAttribute('name', 'education');
    newField.setAttribute('placeholder', 'List your education');
    educationFields.appendChild(newField);
}

function addSkillsField() {
    const skillsFields = document.getElementById('skills-fields');
    const newField = document.createElement('textarea');
    newField.setAttribute('name', 'skills');
    newField.setAttribute('placeholder', 'List your skills');
    skillsFields.appendChild(newField);
}

function addExperienceField() {
    const experienceFields = document.getElementById('experience-fields');
    const newField = document.createElement('textarea');
    newField.setAttribute('name', 'experience');
    newField.setAttribute('placeholder', 'Describe your work experience');
    experienceFields.appendChild(newField);
}

// Adding more project fields (Name and URL)
function addProjectField() {
    const projectFields = document.getElementById('project-fields');
    const newProjectName = document.createElement('input');
    newProjectName.setAttribute('type', 'text');
    newProjectName.setAttribute('name', 'projectName');
    newProjectName.setAttribute('placeholder', 'Project Name');
    
    const newProjectURL = document.createElement('input');
    newProjectURL.setAttribute('type', 'url');
    newProjectURL.setAttribute('name', 'projectURL');
    newProjectURL.setAttribute('placeholder', 'Project URL');

    projectFields.appendChild(newProjectName);
    projectFields.appendChild(newProjectURL);
}

// Optional: Download Resume as PDF
document.getElementById("downloadBtn").addEventListener("click", function() {
    const resume = document.getElementById("resume");
    html2pdf(resume, {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
});
