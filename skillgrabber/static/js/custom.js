$("#skillSubmit").click(getFormResults);

function getFormResults() {

    // Synopsis:
    //  Get all the form results into a structured string and send it to the submission function below.

    // 1. Get the users name:
    var user = $("#skillexName").val()

    // 2. Get the racf
    var racf = $("#skillexRacf").val()

    // 3. Get the racf
    var title = $("#skillexTitle").val()

    // 4. Get the strongest
    var strong = $("#skillexStrongest").val()

    // 5. Get the strongest
    var weak = $("#skillexWeakest").val()

    // 6. Get the strongest
    var dev = $("#skillexDevelopment").val()

    // 7. Get the skills values
    var sk1 = $("input[name='skill_1']:checked").val()
    var sk2 = $("input[name='skill_2']:checked").val()
    var sk3 = $("input[name='skill_3']:checked").val()
    var sk4 = $("input[name='skill_4']:checked").val()
    var sk5 = $("input[name='skill_5']:checked").val()
    var sk6 = $("input[name='skill_6']:checked").val()
    var sk7 = $("input[name='skill_7']:checked").val()
    var sk8 = $("input[name='skill_8']:checked").val()

    var payload =   ' { "name": "' + user + '",' +
                    ' "racf": "' + racf + '",' +
                    ' "title": "' + title + '",' +
                    ' "strongest": "' + strong + '",' +
                    ' "weakest": "' + weak + '",' +
                    ' "dev": "' + dev + '",' +
                    ' "skills": {' +
                        ' "loadrunner": "' + sk1 + '",' +
                        ' "silk": "' + sk2 + '",' +
                        ' "java": "' + sk3 + '",' +
                        ' "automation": "' + sk4 + '",' +
                        ' "jenkins": "' + sk5 + '",' +
                        ' "elasticsearch": "' + sk6 + '",' +
                        ' "influx": "' + sk7 + '",' +
                        ' "javascript": "' + sk8 + '"}' +
                    '}'

    // Dump to console for troubleshooting
    console.log("Here is the string version:");
    console.log(payload);

    var t = JSON.parse(payload);
    console.log("Json version:");
    console.log(t);

    // Send to Ajax handler
    //submitToFlask(payload);
    alternativeSubmitToFlask(payload);
}

function submitToFlask(payload) {

    // Synopsis:
    // -- Receive the structured data from the collector then send it to the back end handler function.

    console.log(payload);
    console.log("Above from the XHR Function....");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/receiveSubmission', true);
    xhr.send(payload)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
           // $("#responseTarget").text(xhr.responseText)
           console.log(xhr.responseText)
        }
    }

}

function alternativeSubmitToFlask(payload) {

    $.ajax({
        url: '/receiveSubmission',
        dataType: 'JSON',
        method: 'post',
        contentType: 'application/json',
        data: payload,

        success: function( data, textStatus, jQxhr ){
            console.log("------------------------");
            console.log("The Data received from flask:");
            console.log(data);
            console.log("------------------------");
            console.log("The text status:");
            console.log(textStatus);
            console.log("------------------------");
            console.log("The jQxhr - whatever that is:");
            console.log(jQxhr);
            console.log(jQxhr.status);
            console.log("Here is the response from flask:");
            console.log(data);
        },

        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

}

