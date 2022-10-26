//Sara Pereira up201906821

//API
//https://github.com/D3vd/Meme_Api#readme

//Variables
let memeText;

let memeNumber;

let removeBtn;

$().ready(function (){//When DOM elements are ready
    $('.MemeBtn').on('click', getMeme);//When clicking the button, the getMeme function runs
})

function getMeme(){//Function to create the meme when clicking the button

    let subreddit = $('.memeOptions').val();//Getting #memeOptions values (corresponding the name of the subreddit)

    let memeUrl = `https://meme-api.herokuapp.com/gimme/${subreddit}`;//Creating a variable for the API link with the changeable subreddit value

    fetch(memeUrl)//Calling the API link (when the request was asked)
    .then(function(response){//Giving a response
        return response.json();//When the response arrives, we give it back to html(we turn it into json object)
    })
    .then(function(data){//When the response is here, it's data will be used

        //The Memes
        let newElement = document.createElement('article');//Creating an article in which the memes will appear
        $(newElement).attr('id', 'memeArticleProperties');//Giving the article an id to easily manipulate in CSS
        $(newElement).html(`<h2>${data.title}</h2>
                            <figure id="memeImage">
                            <img src="${data.url}"/>
                            </figure>
                            <p>Post Link:<a href="${data.postLink}" class="links">${data.postLink}</a></p>
                            <p>Author: ${data.author}</p>`);//Calling title, images, link and author from the website memes inserting innerHTML
                                                            //data.title --> title is a property already set by the API creator, I'm simply "calling" it
        $('#memeBox').append(newElement);

        //Remove button creation for each post
        removeBtn = document.createElement("button");//Creating the button
        $(removeBtn).text("Remove").attr("class", "MemeBtn");//Adding the button's class previously created on CSS
        $(newElement).append(removeBtn);//Appending it to the element created previously, containing the meme
        $(removeBtn).on('click', removeMeme);//Adding it's "click" property and naming the function

        function removeMeme(){//Function that removes the article previously created containing the meme
            $(newElement).remove();
        };
        return
    })
    .catch(function(error){//In case there is an error, the user is alerted to it
        alert("There was an error.", error);
    })
};