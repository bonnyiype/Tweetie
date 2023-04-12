// Handle keyup event on postTextarea
document.querySelector("#postTextarea").addEventListener("keyup", (event) => {
    const textbox = event.target;
    const value = textbox.value.trim();

    const submitButton = document.querySelector("#submitPostButton");

    if (!submitButton) {
        alert("No submit button found");
        return;
    }

    // Enable or disable the submit button based on the textbox content
    submitButton.disabled = value === "";
});


// Handle click event on submitPostButton
document.querySelector("#submitPostButton").addEventListener("click", async (event) => {
    const button = event.target;
    const textbox = document.querySelector("#postTextarea");

    const data = {
        content: textbox.value
    };

    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error creating post");
        }

        const postData = await response.json();
        const html = createPostHtml(postData);
        document.querySelector(".postsContainer").insertAdjacentHTML("afterbegin", html);
        textbox.value = "";
        button.disabled = true;

    } catch (error) {
        console.error("Error:", error);
    }
});

    



// Attach a click event handler to elements with the class "likeButton"
document.addEventListener("click", (event) => {
    // Check if the clicked element has the class "likeButton"
    if (!event.target.classList.contains("likeButton")) return;

    // Get the clicked button element
    let button = event.target;
    // Get the post ID from the button element
    let postId = getPostIdFromElement(button);

    // If the post ID is undefined, do nothing
    if (postId === undefined) return;

    // Send a fetch request to update the like status of the post
    fetch(`/api/posts/${postId}/like`, {
        method: "PUT",
    })
    .then((response) => response.json())
    .then((postData) => {
        // Update the number of likes displayed on the button
        button.querySelector("span").textContent = postData.likes.length || "";

        // If the user has liked the post, add the "active" class to the button
        if (postData.likes.includes(userLoggedIn._id)) {
            button.classList.add("active");
        } else {
            // If the user has not liked the post, remove the "active" class from the button
            button.classList.remove("active");
        }
    });
});


// Handle click event on retweetButton
document.addEventListener("click", (event) => {
    if (event.target.closest(".retweetButton")) {
        const button = event.target.closest(".retweetButton");
        const postId = getPostIdFromElement(button);

        if (postId === undefined) return;

        fetch(`/api/posts/${postId}/retweet`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(postData => {
            button.querySelector("span").textContent = postData.retweetUsers.length || "";

            if (postData.retweetUsers.includes(userLoggedIn._id)) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }
});


// Get post ID from an element
function getPostIdFromElement(element) {
    // Check if the element has the class "post"
    const isRoot = element.classList.contains("post");
    // Get the root element, which is either the element itself or the closest ancestor with the class "post"
    const rootElement = isRoot ? element : element.closest(".post");
    // Get the post ID from the "data-id" attribute of the root element
    const postId = rootElement.dataset.id;

    // If the post ID is undefined, show an alert and return
    if (postId === undefined) {
        alert("Post id undefined");
        return;
    }

    // Return the post ID
    return postId;
}



// Create HTML structure for a post
function createPostHtml(postData) {
    if (postData === null) return alert("post object is null");

    const isRetweet = postData.retweetData !== undefined;
    const retweetedBy = isRetweet ? postData.postedBy.username : null;
    postData = isRetweet ? postData.retweetData : postData;

    console.log(isRetweet);

    const postedBy = postData.postedBy;

    if (postedBy._id === undefined) {
        return console.log("User object not populated");
    }

    const displayName = `${postedBy.firstName} ${postedBy.lastName}`;
    const timestamp = timeDifference(new Date(), new Date(postData.createdAt));

    const likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : "";
    const retweetButtonActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : "";

    let retweetText = '';
    if (isRetweet) {
        retweetText = `<span>
                        <i class='fas fa-retweet'></i>
                        Retweeted by <a href='/profile/${retweetedBy}'>@${retweetedBy}</a>
                    </span>`;
    }

    return `<div class='post' data-id='${postData._id}'>
                <div class='postActionContainer'>
                    ${retweetText}
                </div>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer green'>
                                <button class='retweetButton ${retweetButtonActiveClass}'>
                                    <i class='fas fa-retweet'></i>
                                    <span>${postData.retweetUsers.length || ""}</span>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class='likeButton ${likeButtonActiveClass}'>
                                    <i class='far fa-heart'></i>
                                    <span>${postData.likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

// Calculate the time difference between two dates and return a human-readable string
function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 30) return "Just now";

        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}


