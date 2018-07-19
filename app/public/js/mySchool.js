console.log('Welcome to mySchool');
// grab the url from the window/tab
var currentURL = window.location.origin;
retrieveAll();
//We use this function to format the phone number
function formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}
//this is to empty the table
function emptyTable() {
    $('#dump-contacts').empty();
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
                required: true, // Specify that email should be validated
                email: true // by the built-in "email" rule
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

            console.log(newContactInfo); //verify 
            emptyTable();
            retrieveAll();

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

function retrieveAll() {
    $.get(currentURL + "/api", function(data) {

        // for each contact that our server sends us back
        for (var i = 0; i < data.length; i++) {
            // create a parent div for the oncoming elements
            var contactSelection = $("<tr>");
            // add an id to 
            contactSelection.attr('id', 'contact-' + i);
            contactSelection.addClass('allContacts');
            //set data value for each contact, wich is the same as the id. console.log(contactSelection.data("id"))
            var contactsCase = contactSelection.data();
            contactsCase.id = i + 1;

            // append it to the #Selections
            $('#dump-contacts').append(contactSelection);

            // Now add all of our chacter data to the well we just placed on the page

            $("#contact-" + i).append("<td>" + data[i].id + "</td>");

            $("#contact-" + i).append("<td>" + data[i].first_name + "</td>");

            $("#contact-" + i).append("<td>" + data[i].last_name + "</td>");

            $("#contact-" + i).append("<td>" + formatDate(data[i].date_of_birth) + "</td>");

            $("#contact-" + i).append("<td>" + formatPhoneNumber(data[i].phone) + "</td>");

            $("#contact-" + i).append("<td>" + data[i].email + "</td>");

            $("#contact-" + i).append("<td>" + data[i].num_of_lessons + "</td>");

            $("#contact-" + i).append("<td>" + data[i].level + "</td>");

            $("#contact-" + i).append("<td>" + formatDate(data[i].date_created) + "</td>");

            $("#contact-" + i).append("<td><button onclick= 'clikedContact(name)'' type='button' name=" + data[i].last_name + " id=" + data[i].id + " class='btn btn-default btn-sm'><span class='glyphicon glyphicon-star' aria-hidden='true'></span>update contact!</button></td>");
        }
    });

}


///////////////////////////////////////////////////////////////////////////
//This section handles the jQuery Ajax to search for a specific contact//
///////////////////////////////////////////////////////////////////////////
//this is to acces the specific contact on the update contact buttons



function showHideNoContact(string) {

    var noContactMessage = "Sorry, we don't have a student with that last name. Check your spelling and try again.";
    //create a div to display the message
    var displayNoContact = $("<div>");
    displayNoContact.attr('id', 'no-contact');
    $("#no-contacts-message").append(displayNoContact);
    $("#no-contact").text(noContactMessage);
    //logic
    if (string === "") {
        displayNoContact.show();
        $(".found").empty();
        $("#searched-contacts-table").empty();
    } else if (string !== "") {
        displayNoContact.hide();
        $("#no-contact").empty();
        $("#searched-contacts-table").empty();
    }
}


$('#searchContact').on("click", function() {

    var currentURL = window.location.origin;
    var searchContact = $("#last_name_search").val().trim();

    if (searchContact === "") {
        showHideNoContact(searchContact);
    } else if (searchContact !== "") {
        showHideNoContact(searchContact);
        $.get(currentURL + "/api/" + searchContact, function(data) {
            if (data.length !== 0) {
                $(".found").empty();
                //build table
                var searchContactTable = $("<table>");
                searchContactTable.attr("id", "searched-contacts-table");
                searchContactTable.addClass("table-bordered");
                //build table head
                var searchContactTableHead = $("<thead>");
                searchContactTableHead.attr("id", "head");
                //build row 
                var tableHeadRow = $("<tr>");
                tableHeadRow.attr("id", "row");
                //build column for first name
                var tableColumnFirst = $("<th>");
                tableColumnFirst.attr("scope", "col");
                tableColumnFirst.attr("id", "first-name-search");
                tableColumnFirst.text("First Name");
                //build column for last name
                var tableColumnSecond = $("<th>");
                tableColumnSecond.attr("scope", "col");
                tableColumnSecond.attr("id", "last-name-search");
                tableColumnSecond.text("Last Name");
                //build column for date of bith
                var tableColumnThird = $("<th>");
                tableColumnThird.attr("scope", "col");
                tableColumnThird.attr("id", "date-of-birth-search");
                tableColumnThird.text("Date of Birth");
                //build table bodu
                var tableBody = $("<tbody>");
                tableBody.attr("id", "body");

                //append table to div 
                $("#searched-contacts").append(searchContactTable);
                //append table head to table
                $("#searched-contacts-table").append(searchContactTableHead);
                //append head row to head
                $("#head").append(tableHeadRow);
                //append first name column to head row
                $("#row").append(tableColumnFirst);
                //append last name column to head row
                $("#row").append(tableColumnSecond);
                //append date of birth column to head row
                $("#row").append(tableColumnThird);
                //append table body to table
                $("#searched-contacts-table").append(tableBody);


                //loop over the data and bring the contacts to table
                for (var i = 0; i < data.length; i++) {
                    //create row
                    var searchContact = $("<tr>");
                    searchContact.addClass('found');
                    searchContact.attr('id', 'found-' + i);
                    //append row to body
                    $('#body').append(searchContact);
                    $('#found-' + i).empty();
                    $('#found-' + i).append("<td>" + data[i].first_name + "</td>");
                    $('#found-' + i).append("<td>" + data[i].last_name + "</td>");
                    $('#found-' + i).append("<td>" + formatDate(data[i].date_of_birth) + "</td>");
                }
            }
        });
    }


    $("#last_name_search").val("");
});