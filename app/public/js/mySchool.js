console.log('Welcome to mySchool');
// grab the url from the window/tab
var currentURL = window.location.origin;
//We use this function to format the phone number
function formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

//We use this function to format the Dates;

function formatDate(date) {
    var res = date.substr(0, 10);
    return moment(res).format("MM DD YYYY");
}

/////form validation with jQuery Validate plug in
$(document).ready(function() {
//grab the form and call validate()
    $('form[id="contact-form"]').validate({
        rules: {
            first_name: 'required',
            last_name: 'required',
            email: {
                required: true,// Specify that email should be validated
                email: true// by the built-in "email" rule
            },
            date_of_birth: 'required',
            phone: 'required',
        },
        messages: {
            first_name: 'This field is required',
            last_name: 'This field is required',
            email: ' Enter a valid email',
            date_of_birth: 'Enter your DOB',
        },

        //This section handles the jQuery Ajax to POST our new contact//
        submitHandler: function() {
            // to stop contact form submission
            $('form[id="contact-form"]').submit(function(evt) {

                evt.preventDefault();
            });
            // object captures data from form
            var newContactInfo = {
                first_name: $('#first_name').val().trim(),
                last_name: $('#last_name').val().trim(),
                date_of_birth: $('#date_of_birth').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),
                num_of_lessons: 0,
                level: 1,
                date_created: $('#date_of_birth').val(),
                // instrument: $("input[name='instrument']:checked").val(),
                // level: $("input[name='level']:checked").val()
            };

            // send a jQuery AJAX POST-request with our new contact info.
            $.post(currentURL + "/api/addContact", newContactInfo)
                // on success, run this callback
                .done(function(data) {
                    // log the data we found
                    console.log("This is the data in our jQuery post from mySchool.js " + data);
                });

            console.log(newContactInfo);//verify 
            //reset the form 
            $('#first_name').val('');
            $('#last_name').val('');
            $('#date_of_birth').val('');
            $('#phone').val('');
            $('#email').val('');
            $("input[name='instrument']").prop('checked', false);
            $("input[name='level']").prop('checked', false);
        }
    });
});


/////////////////////////////////////////////////////////////
//This section handles the jQuery Ajax to grab ALL contacts//
/////////////////////////////////////////////////////////////

// grab the url from the window/tab
var currentURL = window.location.origin;
// make a get request to our api to grab every cymbal
$.get(currentURL + "/api", function(data) {

    // for each contact that our server sends us back
    for (var i = 0; i < data.length; i++) {
        // create a parent div for the oncoming elements
        var contactSelection = $("<tr>");
        // add an id to 
        contactSelection.attr('id', 'contact-' + i);
        // append it to the #Selection
        $('#dump-contacts').append(contactSelection);

        // Now add all of our chacter data to the well we just placed on the page
        $("#contact-" + i).append("<td>" + data[i].first_name + "</td>");

        $("#contact-" + i).append("<td>" + data[i].last_name + "</td>");

        $("#contact-" + i).append("<td>" + formatDate(data[i].date_of_birth) + "</td>");

        $("#contact-" + i).append("<td>" + formatPhoneNumber(data[i].phone) + "</td>");

        $("#contact-" + i).append("<td>" + data[i].email + "</td>");

        $("#contact-" + i).append("<td>" + data[i].num_of_lessons + "</td>");

        $("#contact-" + i).append("<td>" + data[i].level + "</td>");

        $("#contact-" + i).append("<td>" + formatDate(data[i].date_created) + "</td>");
    }
});