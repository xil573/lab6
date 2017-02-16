'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, callback);

	console.log("/project/" + idNumber);

}

function callback(result){
	console.log(result);
	var projectHtml = 
	'<img src = "' + result.image + ' " class = "detailsImage">' + 
	'<p>' + result.title + '</p>' + 
	'<p><small>' + result.date + '</small></p>' +
	'<p>' + result.summary + '</p>'

	$("#project" + result.id + " .details").html(projectHtml);

}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	e.preventDefault();
	$.get("/palette", setColor);
}

function setColor(result){
	var color = result.colors.hex;
	$('body').css('background-color', color[0]);
	$('.thumbnail').css('background-color', color[1]);
	$('h1, h2, h3, h4').css('color', color[2]);
	$('p').css('color', color[3]);
	$('.project img').css('opacity', .80);
}