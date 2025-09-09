document.addEventListener('DOMContentLoaded', function() {
    // Handle prediction form submission
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const cgpa = parseFloat(document.getElementById('cgpa').value);
            const majorProjects = parseInt(document.getElementById('major-projects').value);
            const minorProjects = parseInt(document.getElementById('minor-projects').value);
            const workshops = parseInt(document.getElementById('workshops').value);
            const skills = parseInt(document.getElementById('skills').value);
            const commSkills = parseInt(document.getElementById('comm-skills').value);
            const internship = document.getElementById('internship').value;
            const hackathon = document.getElementById('hackathon').value;
            const backlogs = parseInt(document.getElementById('backlogs').value);
            const certifications = parseInt(document.getElementById('certifications').value);
            
            // Calculate placement score
            const placementScore = calculatePlacementScore(cgpa, majorProjects, minorProjects, workshops, 
                skills, commSkills, internship, hackathon, backlogs, certifications);
            
            // Determine placement result based on score
            const placementResult = placementScore >= 60 ? 'Yes' : 'No';
            
            // Generate suggestions based on the profile
            const suggestions = generateSuggestions(cgpa, majorProjects, minorProjects, workshops, 
                skills, commSkills, internship, hackathon, backlogs, certifications, placementScore);
            
            // Display results
            document.getElementById('placement-result').textContent = placementResult + ' (' + placementScore.toFixed(0) + '%)';
            
            // Show or hide salary prediction based on placement result
            const salaryContainer = document.getElementById('salary-prediction-container');
            const salaryInfoText = document.getElementById('salary-info-text');
            
            if (placementScore >= 60) {
                // Calculate expected salary for successful placement predictions
                const salaryResult = predictSalary(cgpa, majorProjects, minorProjects, workshops, 
                    skills, commSkills, internship, hackathon, backlogs, certifications);
                
                // Display salary
                document.getElementById('salary-result').textContent = '₹' + salaryResult.toLocaleString();
                
                // Show salary container
                salaryContainer.style.display = 'block';
                
                // Hide salary info text
                if (salaryInfoText) {
                    salaryInfoText.style.display = 'none';
                }
            } else {
                // Hide salary container for unsuccessful placement predictions
                salaryContainer.style.display = 'none';
                
                // Show salary info text
                if (salaryInfoText) {
                    salaryInfoText.style.display = 'block';
                    salaryInfoText.innerHTML = '<p class="text-white-75 mt-3 text-center">Salary prediction is only available for successful placement predictions (60% or higher).</p>';
                }
            }
            
            // Display suggestions
            const suggestionsElement = document.getElementById('prediction-suggestions');
            if (suggestionsElement) {
                suggestionsElement.innerHTML = '';
                suggestions.forEach(suggestion => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item bg-transparent text-white-75 border-0';
                    li.innerHTML = `<i class="fas fa-lightbulb text-warning me-2"></i> ${suggestion}`;
                    suggestionsElement.appendChild(li);
                });
                document.getElementById('suggestions-container').style.display = 'block';
            }
            
            // Show result section
            document.getElementById('result-content').style.display = 'block';
            
            // Scroll to results
            document.getElementById('result-content').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Initialize charts on insights page
    initCharts();
});

// Calculate placement score
function calculatePlacementScore(cgpa, majorProjects, minorProjects, workshops, skills, commSkills, internship, hackathon, backlogs, certifications) {
    // Simple weighted calculation for demonstration
    let score = 0;
    
    // CGPA has the highest weight
    score += (cgpa / 10) * 40;
    
    // Projects
    score += (majorProjects / 10) * 15;
    score += (minorProjects / 10) * 5;
    
    // Skills
    score += (skills / 10) * 15;
    score += (commSkills / 5) * 10;
    
    // Experience
    if (internship === 'Yes') score += 10;
    if (hackathon === 'Yes') score += 5;
    
    // Workshops and certifications
    score += Math.min(workshops, 10) * 0.5;
    score += Math.min(certifications, 10) * 1;
    
    // Negative impact of backlogs
    score -= backlogs * 5;
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score));
}

// Salary prediction function
function predictSalary(cgpa, majorProjects, minorProjects, workshops, skills, commSkills, internship, hackathon, backlogs, certifications) {
    // Base salary
    let baseSalary = 300000;
    
    // CGPA impact (up to 40% increase for perfect CGPA)
    let cgpaFactor = (cgpa / 10) * 0.4;
    
    // Skills impact (up to 30% increase for perfect skills)
    let skillsFactor = ((skills / 10) * 0.2) + ((commSkills / 5) * 0.1);
    
    // Projects impact (up to 15% increase)
    let projectsFactor = ((majorProjects / 5) * 0.1) + ((minorProjects / 5) * 0.05);
    
    // Experience impact
    let experienceFactor = 0;
    if (internship === 'Yes') experienceFactor += 0.15;
    if (hackathon === 'Yes') experienceFactor += 0.05;
    
    // Additional factors
    let additionalFactor = (Math.min(workshops, 10) / 10) * 0.05 + (Math.min(certifications, 10) / 10) * 0.1;
    
    // Negative impact of backlogs (up to 20% decrease)
    let backlogFactor = Math.min(backlogs, 4) * 0.05;
    
    // Calculate final salary
    let salaryMultiplier = 1 + cgpaFactor + skillsFactor + projectsFactor + experienceFactor + additionalFactor - backlogFactor;
    let finalSalary = Math.round(baseSalary * salaryMultiplier);
    
    // Ensure minimum salary
    return Math.max(300000, finalSalary);
}

// Generate personalized suggestions based on profile
function generateSuggestions(cgpa, majorProjects, minorProjects, workshops, skills, commSkills, internship, hackathon, backlogs, certifications, placementScore) {
    const suggestions = [];
    
    // Different suggestions based on placement score
    if (placementScore >= 60) {
        // Suggestions for successful placement predictions
        if (cgpa < 8.0) {
            suggestions.push("Continue focusing on academics to improve your CGPA for better salary packages.");
        }
        
        if (skills < 8) {
            suggestions.push("Enhance your technical skills to qualify for higher-paying roles.");
        }
        
        if (commSkills < 4) {
            suggestions.push("Work on your communication skills to perform better in interviews.");
        }
        
        if (internship === 'No') {
            suggestions.push("Consider doing an internship to gain practical experience and improve your salary prospects.");
        }
        
        if (certifications < 3) {
            suggestions.push("Obtain relevant certifications to validate your skills and command a higher salary.");
        }
        
        // General suggestions for successful candidates
        suggestions.push("Prepare thoroughly for technical interviews to maximize your chances.");
        suggestions.push("Research companies and their salary ranges to negotiate better offers.");
        suggestions.push("Build a strong LinkedIn profile and professional network.");
    } else {
        // Suggestions for unsuccessful placement predictions
        if (cgpa < 7.5) {
            suggestions.push("Focus on improving your academic performance as CGPA is a critical factor.");
        }
        
        if (majorProjects < 2) {
            suggestions.push("Work on more major projects to demonstrate your technical abilities.");
        }
        
        if (skills < 7) {
            suggestions.push("Enhance your technical skills through online courses or bootcamps.");
        }
        
        if (commSkills < 3) {
            suggestions.push("Improve your communication skills through practice and workshops.");
        }
        
        if (internship === 'No') {
            suggestions.push("Gain practical experience through internships to boost your profile.");
        }
        
        if (hackathon === 'No') {
            suggestions.push("Participate in hackathons to showcase problem-solving abilities.");
        }
        
        if (backlogs > 0) {
            suggestions.push("Clear your backlogs as they significantly impact placement opportunities.");
        }
        
        if (certifications < 2) {
            suggestions.push("Obtain relevant certifications to validate your skills.");
        }
        
        // General suggestions for improvement
        suggestions.push("Consider joining coding clubs or technical communities to enhance your skills.");
        suggestions.push("Work on building a strong portfolio of projects to showcase your abilities.");
    }
    
    // If very weak profile
    if (placementScore < 40) {
        suggestions.push("Your profile needs significant improvement. Consider focusing on the most critical areas: CGPA, technical skills, and projects.");
    }
    
    return suggestions;
}

// Initialize charts for insights page
function initCharts() {
    // Chart initialization code remains unchanged
    // ...
}