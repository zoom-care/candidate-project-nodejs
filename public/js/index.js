var cfg_host = 'http://localhost:3001';

$(document).ready(function() {

    // Fetch the list of users
    populateUserList();
    
    // Apply the button handler to the select box
    $('#userLookup').on('mouseup', handler_getUserDetail);

    // Setup the create user button/container
    $('#btnCreateUser').on('click',handler_createUser);
    $('#createUserC .btnCancel').on('click',function() {
	$('#btnCreateUser').show();
	$('#mainC').show();
	$('#createUserC').hide();
    });
    $('#createUserC .btnSave').on('click',handler_saveUser);
});


///// end of main ////



///// UTILITY FUNCTIONS /////

// Populate the user list
function populateUserList() {
    $.ajax({
	type: 'GET',
	contentType: 'application/json',
	url: cfg_host + '/users',
	success: function(retData) {
	    retData = JSON.parse(retData);
	    $('#userLookup').html('');
	    retData.userList.forEach(function(e) {
		$('#userLookup').append('<option value="' + e.userID + '">' + e.name + '</option>');
	    })
	},
	error: cb_ajaxError
    });
}


// Update the comments section if there are no comments present
function scanEmptyComments() {
    if ($('#postDetailC .commentC .row').length == 0) {
	$('#postDetailC .commentC').html('-none-');
    } 
}




///// BUTTON HANDLER FUNCTIONS /////


// Button: Display create a user form
function handler_createUser() {
    $('#btnCreateUser').hide();
    $('#mainC').hide();

    // Show the create user form and clear it
    $('#createUserC').show();
    $('#createUserC input:text').val('');
}


// Button: Create a new user on the server
function handler_saveUser () {
    let sendVars = {};
    let fields = ['name','username','email','website','phone','street','city','zipcode','latitude','longitude'];
    fields.forEach(function(e) {
	sendVars[e] = $('#f_' + e).val();
    })

    $.ajax({
	type: 'POST',
	contentType: 'application/json; charset=utf-8',
	url: cfg_host + '/user',
	dataType: 'json',
	data: JSON.stringify(sendVars),
	    success: function(retData) {
		retData.rc = parseInt(retData.rc);
		if (retData.rc > 0) {

		    // Success
		    // Restore the initial screen
		    $('#createUserC .btnCancel').click();
		    $('#userTable').hide();
		    $('#postListingsC').hide();
		    $('#postDetailC').hide();
		    
		    // Reload the users
		    populateUserList();
		    
		} else if (retData.rc == -1) {
		    alert("Fields cannot be empty");
		} else {
		    alert("Cannot create new user");
		}
	    }
    });
}

// Button handler: Get user detail
function handler_getUserDetail () {
    let userID = $(this).val();

    // Fetch all posts
    $.ajax({
	type: 'GET',
	contentType: 'application/json',
	url: cfg_host + '/users/' + userID,
	success: function(retData) {

	    // Set the author info
	    $('#userTable td').text('');
	    $('#userTable .name').text(retData.userInfo.name);
	    $('#userTable .username').text(retData.userInfo.username);
	    $('#userTable .email').text(retData.userInfo.email);
	    $('#userTable .website').text(retData.userInfo.website);

	    let tmp = '';
	    retData.userInfo.phoneNumbers.forEach(function(e) {
		tmp += e + '<br />';
	    });
	    $('#userTable .phoneNumbers').html(tmp);
	    $('#userTable .street').text(retData.userInfo.address.street);
	    $('#userTable .city').text(retData.userInfo.address.city);
	    $('#userTable .zipcode').text(retData.userInfo.address.zipcode);
	    $('#userTable .geo').html('lat: ' + retData.userInfo.address.geo.lat + '<br />lng: ' + retData.userInfo.address.geo.lng);
	    
	    
	    // Append the posts
	    tmp = '';
	    if (retData.postInfo.length > 0) {
		let i = 0;
		retData.postInfo.forEach(function(e) {
		    tmp += '<div class="postRow" id="post_' + e.postID + '"><div class="title">' + (++i) + ') ' + e.title + '</div><div class="summary">' + e.summary + '</div></div>';
		});
	    }
	    $('#postListingsC').html(tmp)

	    // Add the handlers to the rows
	    $('#postListingsC .postRow').on('click', handler_getPostDetail);

	    // Show the user detail and post container
	    $('#userTable').show();
	    $('#postListingsC').show();
	    $('#postDetailC').hide();
	},
	error: cb_ajaxError
    });
}


// Button Handler: get post detail
function handler_getPostDetail(e) {
    e.preventDefault();
    let postID = $(this).attr('id').split('_')[1];

    // Fetch the post information and comments
    $.ajax({
	type: 'GET',
	contentType: 'application/json',
	url: cfg_host + '/post/' + postID,
	success: function(retData) {

	    // Set the post information
	    $('#postDetailC .title').text(retData.postInfo.title);
	    $('#postDetailC .body').text(retData.postInfo.body);

	    // Setup the edit post button
	    $('.btnEditPost').attr('id','postID_' + postID).off().on('click',handler_editPost);
	    
	    // Add the comments
	    let tmp = '';
	    retData.comments.forEach(function(e) {
		tmp += '<div id="comment_' + e.commentID + '" class="row"><div class="author">' + e.name + ' <' + '<a href="mailto:' + e.email + '">' + e.email + '</a>' + '></div>'
		     + '<div>' + e.body + '</div>'
		     + '<div><a href="#" class="btnDeleteComment"> [delete]</a></div>'
		     + '</div>';
		
	    });
	    $('#postDetailC .commentC').html(tmp);
	    
	    // Set the comment delete handlers
	    $('.btnDeleteComment').on('click',handler_deleteComment);
	    
	    // Add notice if there are no comments
	    scanEmptyComments();
	    
	    // Hide the post summary and show the post detail container
	    $('#postListingsC').hide();
	    $('#postDetailC').show();
	},
	error: cb_ajaxError
    });
}


// Button handler: edit post
function handler_editPost(e) {
    e.preventDefault();
    let postID = $(this).attr('id').split('_')[1];
    $('#postDetailC').hide();

    // Set the title/body values
    $('#edit_postID').val(postID);
    $('#postEditC .title').val($('#postDetailC .title').text());
    $('#postEditC .body').val($('#postDetailC .body').text());

    // Show the container
    $('#postEditC').show();

    
    // Button: Cancel edit
    $('#postEditC .btnCancel').on('click',function() {
	$('#postEditC').hide();
	$('#postDetailC').show();
    });

    // Button: Save edit
    $('#postEditC .btnSave').on('click',handler_savePost);
}



// Button Handler: Save an edit to a post
function handler_savePost() {

    let postID = $('#edit_postID').val();
    let sendVars = {
	postID: postID,
	title: $('#postEditC .title').val(),
	body: $('#postEditC .body').val()
    };
    
    $.ajax({
	type: 'PUT',
	contentType: 'application/json; charset=utf-8',
	url: cfg_host + '/post/' + postID,
	dataType: 'json',
	data: JSON.stringify(sendVars),
	headers: { authorization: 8675309 },
	success: function(retData) {
	    retData.rc = parseInt(retData.rc);
	    if (retData.rc > 0) {
		
		// Repopulate the values (in case the server modified them)
		// and show the post detail screen again
		$('#postDetailC .title').text(retData.title)
		$('#postDetailC .body').text(retData.body)
		
		$('#postEditC').hide();
		$('#postDetailC').show();
	    } else if (retData.rc == -1) {
		alert("Fields cannot be empty");
		
	    } else {
		alert("Cannot update post");
	    }
	},
	error: cb_ajaxError
    });
}


// Button Handler: Delete a comment
function handler_deleteComment(e) {
    e.preventDefault();
    let result = confirm("Are you sure?");
    if (result == true) {
	let commentID = $(this).closest('.row').attr('id').split('_')[1];
	$.ajax({
	    type: 'DELETE',
	    contentType: 'application/json',
	    url: cfg_host + '/comment/' + commentID,
	    headers: { authorization: 8675309 },
	    success: function(retData) {
		if (retData.rc) {
		    $('#comment_' + commentID).remove();
		    scanEmptyComments();
		}
	    },
	    error: cb_ajaxError
	});
    }
}


// Callback: Generic ajax HTTP error
function cb_ajaxError() {
    alert("Communication Error!");
}
