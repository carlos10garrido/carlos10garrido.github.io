// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Function to create a publication element
function createPublicationElement(paper) {
    const publication = document.createElement('div');
    publication.className = 'publication';
    
    publication.innerHTML = `
        <h3>${paper.title}</h3>
        <p class="authors">${paper.authors}</p>
        <p class="description">${paper.description}</p>
        <p class="venue">${paper.venue}</p>
        <div class="links">
            <a href="assets/papers/${paper.filename}" class="btn" target="_blank">
                <i class="fas fa-file-pdf"></i> Paper
            </a>
            ${paper.code ? `
                <a href="${paper.code}" class="btn" target="_blank">
                    <i class="fas fa-code"></i> Code
                </a>
            ` : ''}
        </div>
    `;
    
    return publication;
}

// Function to load papers
async function loadPapers() {
    try {
        const response = await fetch('assets/papers/papers.json');
        const papers = await response.json();
        
        const publicationsList = document.querySelector('.publications-list');
        publicationsList.innerHTML = ''; // Clear existing publications
        
        papers.forEach(paper => {
            const publicationElement = createPublicationElement(paper);
            publicationsList.appendChild(publicationElement);
        });
    } catch (error) {
        console.error('Error loading papers:', error);
    }
}

// Load papers when the page loads
document.addEventListener('DOMContentLoaded', loadPapers); 