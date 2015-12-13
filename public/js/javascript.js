console.log("Sanity Check: JS is working!");

$(document).ready(function(){
var userSearched;

var sampleReview = {
	user: "user1",
	review: "this movie is the best!",
};



// function getMovie() {
// 	$.ajax({
// 		method: "GET",
// 		url: '/api/movies',
// 		success: function(movie){
// 			stuff.forEach(function (m){
// 				renderSearch(m);
// 			});
// 		}
// 	});
// }

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

		console.log(sampleReview);
		renderReview(sampleReview);

		// $.ajax({
		// 	method: "GET",
		// 	url: '/api/users',
		// });
	});

	$('.movieResults').on('click', '.addToWatchlist', function (event){
		event.preventDefault();
		alert(' add to watchlist under construction');
	});
//
	$('.userReview').on('click', '.editReview', function (event){
		event.preventDefault();
		alert('edit under construction');

	});

	$('.userReview').on('click', '.deleteReview', function (event){
		event.preventDefault();
		alert('delete under construction');

	});


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
  "                <button class='btn btn-success addToWatchlist'>Add to Watchlist</button>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one movie -->";
$('.movieResults').empty();
$('.movieResults').prepend(searchHtml);
}

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
