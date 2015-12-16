console.log("Sanity Check: JS is working!");

$(document).ready(function(){
var userSearched;

var dataToAdd= {};
var url;

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
getUser();


//delete user
	$('.userName').on('click', '.deleteUser', function (event){
		    var id= $(this).parents('.user').data('user-id');
		    console.log('id',id);
		    $('.deleteReview').data('user-id', id);
		    url= '/users/' + id;
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
		    	});
	});






//movie search
	$('#searchBox').on('submit', function (event){
		event.preventDefault();
		$('.movieResults').empty();
		userSearched = $('#movieSearch').val();
		console.log(userSearched);
		$.ajax({
			method: "GET",
			url: 'http://www.omdbapi.com/?t=' + userSearched + '&y=&plot=short&r=json',
			success: function(movie){
				renderSearch(movie);
			}
		});

	});

	$('.movieResults').on('click', '#getReviews', function (event){
		$.ajax({
			method: "GET",
			url: '/api/reviews',
			success: function(response){
				response.forEach(function (element){
				$('.userReview').empty();
				renderReview(element);
				});
			}
		});
	});

	$('.movieResults').on('click', '.addToWatchlist', function (event){
		event.preventDefault();
		alert('add to watchlist under construction');
		// $.ajax({
		// 	method: "POST",
		// 	url: '/api/users',
		// 	data: 
		// });
	});

//reviews
	$('.movieResults').on('click', '.addReview', function (event){
		$('#postReviewModal').modal("show");
		});

	$('#saveReview').on('click', function (event){
			dataToAdd.movie = $('#movieSearch').val();
			dataToAdd.user = $('#userName').val();
			dataToAdd.review = $('#review').val();
			var reviewToAdd = {user: dataToAdd.user, movie: dataToAdd.movie, review: dataToAdd.review};
			console.log(reviewToAdd);
			$('#postReviewModal').modal("hide");
				$.ajax({
					method: "POST",
					url: '/api/reviews',
					data: reviewToAdd,
					success: function(){
						getReviews();
					}
					});
	});

	$('.userReview').on('click', '.editReview', function (event){
	var id= $(this).parents('.review').data('review-id');
	$('#editReviewModal').data('review-id', id);
		console.log('id',id);
		url= '/api/reviews/' + id;
        $.ajax({
          method: "GET",
          url: url,
          success: function (data) {
          	data.forEach(function(element){
	        $("#editReviewModal #editUserName").val(element.user);
	        $("#editReviewModal #editReview").val(element.movie);
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
		console.log('data to add', dataToAdd);
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


	$('.userReview').on('click', '.deleteReview', function (event){
		    var id= $(this).parents('.review').data('review-id');
		    console.log('id',id);
		    $('.deleteReview').data('review-id', id);
		    url= '/api/reviews/' + id;
		    	$.ajax({
		    		method: "DELETE",
		    		url: url,
		    		success: function(response){
		    			$('.userReview').empty();
		    			getReviews();
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
  // "                      <li class='list-group-item'>" +
  // "                        <h4 class='inline-header'>Movie rating:</h4>" +
  // "                        <span class='Rated'>" + movie.Rated + "</span>" +
  // // "                      </li>" +
  // "                      <li class='list-group-item'>" +
  // "                        <h4 class='inline-header'>Released date:</h4>" +
  // "                        <span class='Released'>" + movie.Released + "</span>" +
  // "                      </li>" +
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
  "                <button class='btn btn-info deleteUser'>Delete User</button>" +
  // "                <button class='btn btn-success addReview'>Add a Review</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one user -->";
//$('.userName').empty();
$('.userName').prepend(profileHtml);
}

	
//makes movies
function renderSearch(movie) {
  
  var searchHtml =
  "        <!-- one movie -->" +
  "        <div class='row movie' data-movie-id='" + 'hard coded data' + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin movie internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='movie poster'>" +
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
  "                        <h4 class='inline-header'>Review:</h4>" +
  "                        <span class='review'>" + review.review + "</span>" +
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

