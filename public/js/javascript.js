console.log("Sanity Check: JS is working!");

$(document).ready(function(){
var userSearched;

var dataToAdd= {};
var url;
getUserReviews();

//gets all reviews
function getReviews(){
		$.ajax({
			method: "GET",
			url: '/api/reviews',
			success: function(response){
				response.forEach(function (element){
					renderReview(element);
				});
			}
		});
	}

function getUserReviews() {
					$.ajax({
					method: "GET",
					url: '/userName',
					success: function(response){
						var id = response.user._id;
						renderProfile(response.user);
							$.ajax({
								method: "GET",
								url: '/users/' + id + '/reviews',
								success: function(content) {
									content.reviews.forEach(function (data){
										renderUserReview(data);
									});
								}
							});
					}
				});
		}
//gets all users
function getUser(){
				$.ajax({
					method: "GET",
					url: '/users',
					success: function (response){
						response.forEach(function (element){
							renderProfile(element);
						});
					}

				});
	}

//delete user
	$('.userName').on('click', '.deleteUser', function (event){
		    var id= $(this).parents('.user').data('user-id');
		    console.log('id',id);
		    $('.deleteReview').data('user-id', id);
		    url= '/users/' + id;
		    var confrim = prompt("Are you sure? type 'delete' to delete");
		    	if (confrim.toLowerCase() === 'delete'){
		    	$.ajax({
		    		method: "DELETE",
		    		url: url,
		    		success: function(){
		    			$('.userName').empty();
		    			$.ajax({
		    				method: "GET",
		    				url: '/users',
		    				success: function(response){
		    					rennderProfile(response);
		    				}
		    			});
		    		}
		    	}); alert('deleted user');
		    	}else {
		    		alert("please type 'delete' (case sensitive) to delete user");
		    	}

	});

//movie search
	$('#searchBox').on('submit', function (event){
		event.preventDefault();
		$('.movieResults').empty();
		userSearched = $('#movieSearch').val();
		$.ajax({
			method: "GET",
			url: 'http://www.omdbapi.com/?t=' + userSearched + '&y=&plot=full&r=json',
			success: function(movie){
				renderSearch(movie);
			}
		});

	});

//get all movie reviews
	$('.movieResults').on('click', '#getReviews', function (event){
		event.preventDefault();
		$.ajax({
			method: "GET",
			url: '/api/reviews',
			success: function(response){
				$('.userReview').empty();
				response.forEach(function (element){
				renderReview(element);
				});
			}
		});
	});
// not working
	$('.movieResults').on('click', '.addToWatchlist', function (event){
		event.preventDefault();
		alert('add to watchlist under construction');
		// $.ajax({
		// 	method: "POST",
		// 	url: '/api/users',
		// 	data: 
		// });
	});

// add reviews
	$('.movieResults').on('click', '.addReview', function (event){
		$('#postReviewModal').modal("show");
		});

	$('#saveReview').on('click', function (event){
			dataToAdd.movie = $('#movieSearch').val();
			dataToAdd.user = $('#userName').val();
			dataToAdd.text = $('#review').val();
			var reviewToAdd = {user: dataToAdd.user, movie: dataToAdd.movie, text: dataToAdd.text};
			$('#postReviewModal').modal("hide");
				$.ajax({
					mehtod: "GET",
					url: '/userName',
					success: function(response){
						var id = response.user._id;
						//post to users/:id/reviews
							$.ajax({
								method: "POST",
								url: '/users/' + id + '/reviews',
								data: reviewToAdd,
								success: function(stuff) {
									stuff.reviews.forEach(function(element){
										renderUserReview(element);
									});
								}
							});
							//post to /api/reviews
							$.ajax({
								method: "POST",
								url: '/api/reviews',
								data: reviewToAdd,
								success: function(element){
									$('.last').show();
									$('.userReview').empty();
									renderReview(element);
								}
							});
					}
				});
	});

// edit review
	$('.userReview').on('click', '.editReview', function (event){
	var id= $(this).parents('.review').data('review-id');
	$('#editReviewModal').data('review-id', id);
		url= '/api/reviews/' + id;
        $.ajax({
          method: "GET",
          url: url,
          success: function (data) {
          	data.forEach(function(element){
	        $("#editReviewModal #editUserName").val(element.user);
	        $("#editReviewModal #editReview").val(element.text);
          	});
          }
        });
		$('#editReviewModal').modal('show');
	});

	$('#updateReview').on('click', function (event){
		event.preventDefault();
		var id= $('#editReviewModal').data('review-id');
		dataToAdd._id = id;
		dataToAdd.user = $("#editReviewModal #editUserName").val();
		dataToAdd.movie = $("#editReviewModal #editReview").val();
		url = '/api/reviews/' + id; 
			$.ajax({
				method: "PUT",
				url: url,
				data: dataToAdd,
				success: function (stuff){
					$('#editReviewModal').modal('hide');
					$('.userReview').empty();
					getReviews();
				}
			});
	});

//delete review
	$('.userReview').on('click', '.deleteReview', function (event){
			event.preventDefault();
		    var id= $(this).parents('.review').data('review-id');
		    $('.deleteReview').data('review-id', id);
		    url= '/api/reviews/' + id;
		    	$.ajax({
		    		method: "DELETE",
		    		url: url,
		    		success: function(response){
		    			$('.userReview').empty();
		    			getUserReviews(response);
		    		}
		    	});

	});

//delete user review
	$('.userName').on('click', '.deleteUserReview', function (event){
		var postId = $(this).parents('.post').data('post-id');
		var userId = $(this).parents('.user').data('user-id');
		$('.deleteUserReview').data('post-id');
		url = '/users/' + userId + '/reviews/'+ postId;
			$.ajax({
				method: "DELETE",
				url: url,
				success: function(response) {
					$('.userName').empty();
					getUserReviews(response);

				}
			});
	});


//for user.html
function renderProfile(user) {
  var profileHtml =
  "        <!-- one user -->" +
  "        <div class='row user' data-user-id='" + user._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin movie internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail userAvatar'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='user avatar'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'> user name:</h4>" +
  "                        <span class='User'>"  + user.username + "</span>" +
  "                      </li>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Movie Reviews:</h4>" +
  "                        <span id='userMovieReviews'></span>" +
  "                      </li>" +
  // "                      <li class='list-group-item'>" +
  // "                        <h4 class='inline-header'> Summary:</h4>" +
  // "                        <span class='Plot'>" + movie.Plot + "</span>" +
  // "                      </li>" +
  // "                      <li class='list-group-item id'>" +
  // "                        <h4 class='inline-header id'>imdb:</h4>" +
  // "                         <span class='imdbID id'>" + movie.imdbID+ "</span>" +
  // "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of user internal row -->" +
  "              </div>" + // end of panel-body
  "              <div class='panel-footer'>" +
  "                <button class='btn btn-danger deleteUser'>Delete User</button>" +
  // "                <button class='btn btn-success addReview'>Add a Review</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one user -->";
//$('.userName').empty();
$('.userName').prepend(profileHtml);
}

function renderUserReview(content) {
  var UserReviewHtml =

  "        <!-- one user -->" +
  "        <div class='row post' data-post-id='" + content._id + "'>" +
  "          <div class='col-md-12'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin movie internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-12 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      		<li class='list-group-item'>" +
	"                      <h4 class='inline-header'>Movie:</h4>" +
	"                      <span class='movieName'>" + content.movie + "</span>" +
	"                      <li class='list-group-item'>" +
	"                      <h4 class='inline-header'>Review:</h4>" +
	"                      <span class='movieText'>" + content.text + "</span>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of user internal row -->" +
  "              </div>" + // end of panel-body
  "              <div class='panel-footer'>" +
  "                <button class='btn btn-danger deleteUserReview'>Delete Review</button>" +
  // "                <button class='btn btn-warning editUserReview'>Edit Review</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one user -->";
$('#userMovieReviews').prepend(UserReviewHtml);
}


//makes movies
function renderSearch(movie) {
  
  var searchHtml =
  "        <!-- one movie -->" +
  "        <div class='row movie' data-movie-id='" + movie.Title + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin movie internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/75x75'" +  " alt='movie poster'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'> Movie title:</h4>" +
  "                        <span class='Title'> <a id='getReviews'>" + movie.Title + "</a></span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Movie rating:</h4>" +
  "                        <span class='Rated'>" + movie.Rated + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='Released'>" + movie.Released + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'> Summary:</h4>" +
  "                        <span class='Plot'>" + movie.Plot + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item id'>" +
  "                        <h4 class='inline-header id'>imdb:</h4>" +
  "                         <span class='imdbID id'>" + movie.imdbID+ "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of movie internal row -->" +
  "              </div>" + // end of panel-body
  "              <div class='panel-footer'>" +
  "                <button class='btn btn-info addToWatchlist'>Add to Watchlist</button>" +
  "                <button class='btn btn-success addReview'>Add a Review</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one movie -->";
$('.movieResults').empty();
$('.movieResults').prepend(searchHtml);
}

//makes reviews
function renderReview(review) {

  var reviewHtml =
  "        <!-- one review -->" +
  "        <div class='row review' data-review-id='" + review._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin review internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>User Name:</h4>" +
  "                        <span class='userName'>" + review.user + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Movie:</h4>" +
  "                        <span class='movie'>" + review.movie + "</span>" +
  "                      </li>" +
   "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Review:</h4>" +
  "                        <span class='review'>" + review.text + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of review internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-success editReview'>Edit Review</button>" +
  "                <button class='btn btn-danger deleteReview'>Delete Review</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one review -->";

$('.userReview').prepend(reviewHtml);

}
});

