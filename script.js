//Display results
function displayResults(responseJson) {
    console.log(responseJson);
    //remove current results
    $('.results-list').empty();
    $('.error-message').css("display", "none");
    //Add html of results
    for (let i = 0; i < responseJson.length; i++){
        $('.results-list').append(
            `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
            </li>`
          )};
    //Show results
    const userInput = $('#user-search').val();
    $('.search-name').html(`${userInput}`);
    $('.results').css("display", "block");
}

//Build url
function buildURL (input) {
    //return the endpoint url
    return 'https://api.github.com/users/' + `${input}` + '/repos';
}

//Make call
function getRepos() {
    //Access user input
    const userInput = $('#user-search').val();
    //Call function to build URL with user input as argument
    const url = buildURL(userInput);
    console.log(url);
    const options = {
        headers: new Headers({
          "Accept": "application/vnd.github.v3+json"})
      };
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.statusText}`);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.results').css("display", "none");
            $('.error-message').html(`Something went wrong: ${err.message}`).css("display", "block");
        });
}

//Listen for user input
function watchForm() {
    $('form').submit(function(event) {
        event.preventDefault();
        //Call function to make API call
        getRepos();
    })
}

$(watchForm);