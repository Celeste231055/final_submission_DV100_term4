// Run code when the document loads

$(document).ready(function() {
    console.log("Hello World!")
    // ---------------------------------------------------------------------------------------------------
    // Sign up form
    // ---------------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------------
    // Form Validation
    
    // On Submit, prevent the default form submission

    $('.signupForm').submit(function(event) {

        function resetFormValidation(form) {
            form.removeClass('was-validated');
            form.find('.form-control').removeClass('is-valid is-invalid');
            form.find('.invalid-feedback').text('');
        }

        event.preventDefault();

        // Reset the form validation state
        resetFormValidation($(this));
        
        // Custom password validation
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        //check the password to ensure it contains at least 1 number, 1 uppercase letter, 1 lowercase letter, and is at least 8 characters long.
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
        //If the password doesn't meet the criteria, add the is-invalid class to the password field and display a corresponding error message.
        if (!passwordPattern.test(password)) {
            $('#password').addClass('is-invalid');
            $('#password').next('.invalid-feedback').text('Password must be at least 8 characters long and include at least 1 number, 1 uppercase letter, and 1 lowercase letter.');
        //check if the password and confirm password fields match. If they don't, add the is-invalid class to both fields and show a "Passwords do not match" error message.
        } else if (password !== confirmPassword) {
            $('#password').addClass('is-invalid');
            $('#confirmPassword').addClass('is-invalid');
            $('#confirmPassword').next('.invalid-feedback').text('Passwords do not match.');
        //If both validations pass, add the is-valid class to both password and confirm password fields.
        } else {
            $('#password').addClass('is-valid');
            $('#confirmPassword').addClass('is-valid');
        }

        //The form's overall validity is checked using to ensure all fields pass HTML5 validations.
        if (this.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Add any submission code here, like saving the data to localStorage
                window.location.href = 'index.html';

                // Get the username input field value
                var username = $("#username").val();

                // Check if the username is not empty
                if (username.trim() !== "") {
                // Save the username in session storage
                sessionStorage.setItem("username", username);
                } else {
                $('#password').addClass('is-invalid');
                $('#password').next('.invalid-feedback').text('Please enter a valid password');
                }


        }
        $(this).addClass('was-validated');
    });

    // ---------------------------------------------------------------------------------------------------
    // Tggle Between Sign up and Login

    // Initial state: Show the signup form and hide the login form
    $(".sign-up-container").show();
    $(".login-container").hide();

    // Click event handler for the "Login" button
    $("#logIn").click(function() {

        function resetFormValidation(form) {
            form.removeClass('was-validated');
            form.find('.form-control').removeClass('is-valid is-invalid');
            form.find('.invalid-feedback').text('');
        }

        event.preventDefault();

        // Reset the form validation state
        resetFormValidation($(this));

        $(".sign-up-container").hide();
        $(".login-container").show();
    });

    // Click event handler for the "Sign up" button
    $("#signUp").click(function() {

        function resetFormValidation(form) {
            form.removeClass('was-validated');
            form.find('.form-control').removeClass('is-valid is-invalid');
            form.find('.invalid-feedback').text('');
        }

        event.preventDefault();

        // Reset the form validation state
        resetFormValidation($(this));

        $(".login-container").hide();
        $(".sign-up-container").show();
    });
    
});


