

//====================================
// Initialize functionality when DOM is loaded
//====================================
document.addEventListener('DOMContentLoaded', () => {
    // Add edit functionality to all employee cards
    addEditFunctionality();
    
    // Add hover effects to existing skills
    document.querySelectorAll('ul li').forEach(addSkillHoverEffect);
});

// Employee data structure
const employees = {
    it: {
        name: 'Boa Hancock',
        position: 'Head of IT',
        email: 'boa.hancock@outlook.com',
        skills: ['AWS Certified', 'Leadership', 'Scrum Master', 'Full Stack Development']
    },
    hr: {
        name: 'Nami',
        position: 'Head of HR',
        email: 'nami@outlook.com',
        skills: ['Payroll', 'Leadership', 'Escalation']
    },
    pr: {
        name: 'Nico Robin',
        position: 'Head of PR',
        email: 'nico.robin@outlook.com',
        skills: ['Communication', 'Leadership', 'Public Speaking']
    }
};

// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav a');
const employeeCards = document.querySelectorAll('.employee-card');
const messageForm = document.querySelector('form');

//====================================
// EDIT FORM FUNCTIONALITY
//====================================

/**
 * Adds edit functionality to all employee cards
 * Creates edit buttons and forms for each employee card
 */
function addEditFunctionality() {
    employeeCards.forEach(card => {
        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit Profile';
        editButton.className = 'edit-btn';
        editButton.setAttribute('aria-label', 'Edit employee profile');
        
        // Create edit form
        const editForm = createEditForm(card);
        editForm.style.display = 'none';
        
        // Add elements to card
        card.appendChild(editButton);
        card.appendChild(editForm);
        
        // Add event listeners
        editButton.addEventListener('click', () => toggleEditForm(editForm, editButton));
    });
}

/**
 * Creates an edit form for an employee card
 * @param {HTMLElement} card - The employee card element
 * @returns {HTMLFormElement} The created edit form
 */
function createEditForm(card) {
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.setAttribute('aria-label', 'Edit employee information');
    
    // Get current values from card
    const name = card.querySelector('h3').textContent;
    const position = card.querySelector('p:nth-of-type(1)').textContent.split(':')[1].trim();
    const email = card.querySelector('p:nth-of-type(2)').textContent.split(':')[1].trim();
    const skills = Array.from(card.querySelectorAll('ul li')).map(li => li.textContent).join(', ');
    
    // Create form HTML structure
    form.innerHTML = `
        <div class="form-group">
            <label for="edit-name">Name:</label>
            <input type="text" id="edit-name" name="name" value="${name}" required 
                   aria-required="true">
        </div>
        
        <div class="form-group">
            <label for="edit-position">Position:</label>
            <input type="text" id="edit-position" name="position" value="${position}" required
                   aria-required="true">
        </div>
        
        <div class="form-group">
            <label for="edit-email">Email:</label>
            <input type="email" id="edit-email" name="email" value="${email}" required
                   aria-required="true">
        </div>
        
        <div class="form-group">
            <label for="edit-skills">Skills (comma-separated):</label>
            <textarea id="edit-skills" name="skills" required aria-required="true">${skills}</textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="save-btn" aria-label="Save changes">Save</button>
            <button type="button" class="cancel-btn" aria-label="Cancel editing">Cancel</button>
        </div>
    `;
    
    // Add form submission handler
    form.addEventListener('submit', (e) => handleFormSubmit(e, card));
    
    // Add cancel button handler
    form.querySelector('.cancel-btn').addEventListener('click', () => {
        form.style.display = 'none';
        card.querySelector('.edit-btn').style.display = 'block';
    });
    
    return form;
}

/**
 * Toggles the visibility of the edit form and edit button
 * @param {HTMLFormElement} form - The edit form element
 * @param {HTMLButtonElement} editButton - The edit button element
 */
function toggleEditForm(form, editButton) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    editButton.style.display = form.style.display === 'none' ? 'block' : 'none';
    
    // Focus on first input when form opens
    if (form.style.display === 'block') {
        form.querySelector('input').focus();
    }
}

/**
 * Handles the submission of the edit form
 * @param {Event} event - The form submission event
 * @param {HTMLElement} card - The employee card element
 */
function handleFormSubmit(event, card) {
    event.preventDefault();
    const form = event.target;
    
    // Update employee information
    card.querySelector('h3').textContent = form.name.value;
    card.querySelector('p:nth-of-type(1)').innerHTML = 
        `<strong>Position: </strong>${form.position.value}`;
    card.querySelector('p:nth-of-type(2)').innerHTML = 
        `<strong>Email: </strong>${form.email.value}`;
    
    // Update skills
    const skillsList = card.querySelector('ul');
    skillsList.innerHTML = '';
    const skills = form.skills.value.split(',');
    
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        
        // Add hover effects to new skills
        addSkillHoverEffect(li);
        
        skillsList.appendChild(li);
    });
    
    // Hide form and show edit button
    form.style.display = 'none';
    card.querySelector('.edit-btn').style.display = 'block';
    
    // Announce update to screen readers
    announceUpdate('Profile updated successfully');
}





//====================================
// START HOVER EFFECTS
//====================================

/**
 * Adds hover effects to a skill list item
 * Includes visual feedback and animations on hover
 * @param {HTMLElement} li - The skill list item element
 */
function addSkillHoverEffect(li) {
    // Set initial styles
    li.style.backgroundColor = '#f0f0f0';
    li.style.padding = '8px 15px';
    li.style.borderRadius = '20px';
    li.style.margin = '5px';
    li.style.display = 'inline-block';
    li.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    li.style.cursor = 'pointer';
    
    // Add hover effect
    li.addEventListener('mouseover', () => {
        li.style.backgroundColor = '#2c3e50';
        li.style.color = 'white';
        li.style.transform = 'translateY(-3px)';
        li.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    
    // Remove hover effect
    li.addEventListener('mouseout', () => {
        li.style.backgroundColor = '#f0f0f0';
        li.style.color = 'black';
        li.style.transform = 'translateY(0)';
        li.style.boxShadow = 'none';
    });
}
//====================================
// END HOVER EFFECTS
//====================================

