document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission for prediction
    const predictionForm = document.getElementById('prediction-form');
    const resultContent = document.getElementById('result-content');

    predictionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const majorProjects = parseInt(document.getElementById('major-projects').value);
        const workshops = parseInt(document.getElementById('workshops').value);
        const miniProjects = parseInt(document.getElementById('mini-projects').value);
        const skills = parseInt(document.getElementById('skills').value);
        const commSkills = parseFloat(document.getElementById('comm-skills').value);
        const internship = document.getElementById('internship').value;
        const hackathon = document.getElementById('hackathon').value;
        const twelfthPercentage = parseInt(document.getElementById('12th-percentage').value);
        const tenthPercentage = parseInt(document.getElementById('10th-percentage').value);
        const backlogs = parseInt(document.getElementById('backlogs').value);
        
        // Simple prediction logic (this would be replaced with actual ML model in production)
        let placementProbability = 0;
        
        // CGPA has high impact
        placementProbability += (cgpa / 10) * 30;
        
        // Projects impact
        placementProbability += majorProjects * 5;
        placementProbability += workshops * 3;
        placementProbability += miniProjects * 2;
        
        // Skills impact
        placementProbability += (skills / 10) * 15;
        placementProbability += (commSkills / 5) * 10;
        
        // Experience impact
        if (internship === 'Yes') placementProbability += 10;
        if (hackathon === 'Yes') placementProbability += 5;
        
        // Academic history
        placementProbability += (twelfthPercentage / 100) * 5;
        placementProbability += (tenthPercentage / 100) * 5;
        
        // Backlogs negative impact
        placementProbability -= backlogs * 5;
        
        // Ensure probability is between 0 and 100
        placementProbability = Math.max(0, Math.min(100, placementProbability));
        
        // Determine placement status and salary range
        let placementStatus = 'Not Placed';
        let salaryEstimate = '0';
        let statusClass = 'warning';
        
        if (placementProbability > 60) {
            placementStatus = 'Placed';
            statusClass = 'success';
            
            // Salary estimation based on factors
            let baseSalary = 400000;
            
            // CGPA bonus
            baseSalary += (cgpa - 7) * 100000;
            
            // Projects and skills bonus
            baseSalary += majorProjects * 50000;
            baseSalary += (skills - 6) * 30000;
            
            // Experience bonus
            if (internship === 'Yes') baseSalary += 50000;
            if (hackathon === 'Yes') baseSalary += 30000;
            
            // Backlogs penalty
            baseSalary -= backlogs * 50000;
            
            // Format salary
            salaryEstimate = new Intl.NumberFormat('en-IN').format(Math.max(300000, baseSalary));
        }
        
        // Display result
        let resultHTML = `
            <div class="result-item ${statusClass} mb-4">
                <div class="text-center mb-3">
                    <i class="fas fa-${placementStatus === 'Placed' ? 'check-circle text-success' : 'exclamation-circle text-warning'} fa-3x"></i>
                </div>
                <h4 class="text-center">Placement Prediction</h4>
                <div class="d-flex justify-content-between mb-2">
                    <span>Status:</span>
                    <span class="fw-bold">${placementStatus}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Probability:</span>
                    <span class="fw-bold">${placementProbability.toFixed(2)}%</span>
                </div>
                <div class="progress mt-3">
                    