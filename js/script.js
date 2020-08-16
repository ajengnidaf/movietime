
function searchMovie() {
  
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'a680649b',
            's' : $('#search-input').val()
        },
        success: function (result){
            console.log(result);
                if ( result.Response == "True") {
                    let movies = result.Search;
                     console.log(movies);

                    $.each(movies, function (i, data) {
                        $('#movie-list').append(`

                            <div class = "col-md-4">
                            <div class="card md-6">
                                <img src="`+ data.Poster + `" class="card-img-top" alt="...">
                            
                            <div class="card-body">
                                <h5 class="card-title">` + data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year+`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID + `"> See Detail</a>
                                <div>                          
                        </div>
                    </div>
                `); 
            });

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    
                    <div class="col">
                         <h3 class="text-center">` + anf.Error + `</h3>
                        </div>        
                    `)
                }
        }
    });
}
    $('#search-button').on('click', function() {

            searchMovie();
});

$('#search-input').on('keyup', function (a){
    if (a.keyCode === 13){

        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
   
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'a680649b',
            'i' : $(this).data('id')
        },

        success: function (movie){
                if ( movie.Response === "True") {
                    
                    $('.modal-body').html(`
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="`+ movie.Poster + `" class="img-fluid">
                                </div>          
                                
                                
                                <div class="col-md-8">
                                    <ul class="list-group">
                                    <li class="list-group-item active"><h3`+ movie.Title +`</h3></li>

                                    <li class="list-group-item active">Released : `+ movie.Released+`</li>

                                    <li class="list-group-item active">Genre: `+ movie.Genre+`</li>
                                    
                                    <li class="list-group-item active">Director : `+ movie.Director+`</li>

                                    <li class="list-group-item active">Actors : `+ movie.Actors+`</li>
                                </ul
                            </div>
                        </div>
                    </div
                `);          
            }
         }
     });
});
