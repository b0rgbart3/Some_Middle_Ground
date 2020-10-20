$(document).ready(function() { 

    // use jQuery to grab handles to our input Fields on the form
    var accountNameInput = $("input#accountName");
    var accountNameSubmit = $("#accountName");
    var keywordInput = $("input#keyword");
    var keywordSubmit = $("#submitKeyword")
    var keywordForm = $("#keywordForm");

    // Keyword submit button
    keywordForm.on('submit', function(event) {
        event.preventDefault();
        var keyword = keywordInput.val().trim();
        if (!keyword) {
            return;
        }
        AnalyzeKeyword(keyword);
       // keywordInput.val("");
    })
        
});



// Generate an ajax Post Request to send the keyword to the server 
function AnalyzeKeyword(keyword) {

    if (keyword) {
        console.log("In AnalyzeKeyword:", keyword);
    $.ajax({
        method: "POST",
        url: "/api/analyze_keyword",
        data: {keyword: keyword}
        }).then( function(dataReturned) {

            console.log("Data returned: ", dataReturned);
            // We don't do anything with the dataReturned, which I think is odd...

            // Then reload the page on the /keyword_analysis route
            if (dataReturned.dataFound === false) {
                // window.location.replace("/");
                $("#error").show();
            } else {
                console.log("Success!");
                $("#error").hide();
                window.location.replace("/results" + "?keyword=" + keyword);
            }
        }
    ).catch( function(err) {
        handleLoginErr(err);
    });
}

}

function handleLoginErr(err) {
    console.log(err.responseJSON);
  }
