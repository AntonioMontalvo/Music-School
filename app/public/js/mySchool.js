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

            console.log(newContactInfo); //verify  info is there
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

        }
    });

}


/////////////////////////////////////////////////////////////////////////
//This section handles the jQuery Ajax to SEARCH for a specific contact//
/////////////////////////////////////////////////////////////////////////
//this is to acces the specific contact on the update contact buttons
function showHideNoContact(string, noContact) {
    var noContactMessage = "Your request is empty, please type where it says Enter Last Name";
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
        $("#no-contact").text("");
        // $("#no-contact").empty();
        $("#searched-contacts-table").empty();
    }
}

//for bootstrap modal
$('#search-contact-modal').on('shown.bs.modal', function() {
    $('#search-contact-modal').focus();
});

//on click
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
                //build the update contact option
                var tableColumnFourth = $("<th>");
                tableColumnFourth.attr("scope", "col");
                tableColumnFourth.attr("id", "update-search");
                tableColumnFourth.text("Update Contact Information.");
                //build the delete contact option
                var tableColumnFifth = $("<th>");
                tableColumnFifth.attr("scope", "col");
                tableColumnFifth.attr("id", "delete-column");
                tableColumnFifth.text("Delete contact.");

                //build table body
                var tableBody = $("<tbody>");
                tableBody.attr("id", "body");

                //append table to div 
                $("#searched-contacts").append(searchContactTable);
                //append table head to table
                $("#searched-contacts-table").append(searchContactTableHead);
                //append head row to head row
                $("#head").append(tableHeadRow);
                //append first name column to head row
                $("#row").append(tableColumnFirst);
                //append last name column to head row
                $("#row").append(tableColumnSecond);
                //append date of birth column to head row
                $("#row").append(tableColumnThird);
                //append update column to head row
                $("#row").append(tableColumnFourth);
                //append delete column to head row
                $("#row").append(tableColumnFifth);
                //append table body to table
                $("#searched-contacts-table").append(tableBody);


                //loop over the data and bring the contacts to table
                for (var i = 0; i < data.length; i++) {
                    //create row
                    var searchContact = $("<tr>");
                    searchContact.addClass("found");
                    searchContact.attr("id", "found-" + i);
                    var first_name = data[i].first_name;
                    var last_name = data[i].last_name;
                    var dob = formatDate(data[i].date_of_birth);
                    var id = data[i].id;
                    //append row to body
                    $("#body").append(searchContact);
                    $("#found-" + i).empty();
                    $("#found-" + i).append("<td>" + first_name + "</td>");
                    $("#found-" + i).append("<td>" + last_name + "</td>");
                    $("#found-" + i).append("<td>" + dob + "</td>");

                    $("#found-" + i).append("<td><button onclick='clickedContact(id, name)''  type='button' name=" + first_name + "   id=" + id + "  class='btn btn-success btn-sm btn-block' aria-hidden='true'  data-target='#search-contact-modal' data-toggle='modal'>Update " + first_name + " " + last_name + "'s Info. " + "</button></td>");

                    $("#found-" + i).append("<td><button onclick='deliverContactInfo(name, value)' name='" + first_name + " " + last_name + " born: " + dob + "' value=" + id + " type='button'     aria-hidden='true'   class='btn btn-danger btn-sm btn-block' data-target='#delete-contact-modal' data-toggle='modal'  >DELETE ME! </button></td>");


                    $("#contactId").attr("value", id);



                }
            } else if (data.length === 0) {
                $("#no-contact").text("Sorry, no contact with that last name");
            }
        });
    }


    $("#last_name_search").val("");
});

//////////////////////////////////////////
//Handles contact UPDATE to our database//
//////////////////////////////////////////

function clickedContact(id, name) { //give the modal a title with the name 
    var forModalTitle = $("#modal-welcome");
    forModalTitle.text("Update " + name + "'s info.");
}

//When Accept Changes button is submitted 
$('form[id="modal-update"]').on("submit", function(evt) {
    //grab the info from the fields
    var newContactInfo = {
        first_name: $('#inputUserName').val().trim(),
        last_name: $('#inputLastName').val().trim(),
        date_of_birth: $('#dateOfBirth').val(),
        phone: $('#phoneNumber').val(),
        email: $('#inputEmail').val(),
        num_of_lessons: 0,
        level: 1,
        date_created: $('#dateOfBirth').val(),
        // instrument: $("input[name='instrument']:checked").val(),
        // level: $("input[name='level']:checked").val()
        id: $("#contactId").val()
    };


    console.log(newContactInfo); //verify is there


    // send a jQuery AJAX POST-request with our new contact info to be updated
    $.post(currentURL + "/api/updateContact", newContactInfo)
        // on success, run this callback
        .done(function(data) {
            // log the data we found
            console.log("This is the data in our jQuery SEARCH post from mySchool.js " + data);
        });

    //reset the form 
    $('#inputUserName').val('');
    $('#inputLastName').val('');
    $('#dateOfBirth').val('');
    $('#phoneNumber').val('');
    $('#inputEmail').val('');
    $("input[name='instrument']").prop('checked', false);
    $("input[name='level']").prop('checked', false);
    $("#contactId").text("");
    evt.preventDefault();
    emptyTable();
    retrieveAll();
    $("#exit").click();
    $("#searched-contacts-table").empty();
});


//////////////////////////////////////////
//Handles contact DELETE to our database//
//////////////////////////////////////////

function deliverContactInfo(name, value) {
    var id = value;
    $("#final-warning").text(name);
    $("#final-warning").attr("value", value);
}

$("#delete").on("click", function() {
    var contact = {
        id: Number($("#final-warning").attr("value"))
    };

    $.post(currentURL + "/api/deleteContact", contact)

        //on success, run the callback
        .done(function(data) {
            console.log("Contact deleted from mySchool.js $.post");
        });
    // console.log("deleted" + contactID);
    emptyTable();
    retrieveAll();
    $("#exit-delete").click();

});