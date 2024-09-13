// Add event listener for form submission
document.getElementById("resumeForm")?.addEventListener("submit", function(event: Event) {
    event.preventDefault(); // Prevent form submission

    // Capture form data
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;

    // Get all education, skills, experience, and project entries
    const educationList: string[] = Array.from(document.getElementsByName("education")).map(el => (el as HTMLInputElement).value);
    const skillsList: string[] = Array.from(document.getElementsByName("skills")).map(el => (el as HTMLInputElement).value);
    const experienceList: string[] = Array.from(document.getElementsByName("experience")).map(el => (el as HTMLInputElement).value);

    // For Projects: Project Name and URL
    const projectNames: string[] = Array.from(document.getElementsByName("projectName")).map(el => (el as HTMLInputElement).value);
    const projectURLs: string[] = Array.from(document.getElementsByName("projectURL")).map(el => (el as HTMLInputElement).value);
    
    // Display the profile picture (if any)
    const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files?.[0];
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e: ProgressEvent<FileReader>) {
            const profileImage = document.getElementById("profile-image") as HTMLImageElement;
            profileImage.src = e.target?.result as string;
        };
        reader.readAsDataURL(profilePicture);
    }

    // Display the captured data in the resume
    const displayName = document.getElementById("display-name");
    if (displayName) displayName.textContent = name;

    const displayContact = document.getElementById("display-contact");
    if (displayContact) displayContact.innerHTML = `Email: ${email}<br>Phone: ${phone}`;

    // Add Education details
    const educationDisplay = document.getElementById("display-education");
    if (educationDisplay) {
        educationDisplay.innerHTML = ''; // Clear previous entries
        educationList.forEach(education => {
            const li = document.createElement('li');
            li.textContent = education;
            educationDisplay.appendChild(li);
        });
    }

    // Add Skills
    const skillsDisplay = document.getElementById("display-skills");
    if (skillsDisplay) {
        skillsDisplay.innerHTML = ''; // Clear previous entries
        skillsList.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsDisplay.appendChild(li);
        });
    }

    // Add Work Experience
    const experienceDisplay = document.getElementById("display-experience");
    if (experienceDisplay) {
        experienceDisplay.innerHTML = ''; // Clear previous entries
        experienceList.forEach(experience => {
            const li = document.createElement('li');
            li.textContent = experience;
            experienceDisplay.appendChild(li);
        });
    }

    // Add Projects (Project Name and URL)
    const projectsDisplay = document.getElementById("display-projects");
    if (projectsDisplay) {
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
    }

    // Show the resume section
    const resumeSection = document.querySelector('.resume-section');
    if (resumeSection) resumeSection.scrollIntoView({ behavior: 'smooth' });
});


// Optional: Download Resume as PDF
document.getElementById("downloadBtn")?.addEventListener("click", function() {
    const resume = document.getElementById("resume");
    if (resume) {
        html2pdf(resume, {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        });
    }
});
function html2pdf(resume: HTMLElement, arg1: { margin: number; filename: string; image: { type: string; quality: number; }; html2canvas: { scale: number; }; jsPDF: { unit: string; format: string; orientation: string; }; }) {
    throw new Error("Function not implemented.");
}

