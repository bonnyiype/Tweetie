// Wait for the document to be ready before executing the code inside
document.addEventListener("DOMContentLoaded", () => {
    // Fetch posts from the API and output them in the container
    fetch("/api/posts")
      .then((response) => response.json())
      .then((results) => {
        outputPosts(results, document.querySelector(".postsContainer"));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  });
  
  /**
   * Output the fetched posts in the specified container.
   * @param {Array} results - The array of posts.
   * @param {HTMLElement} container - The container element where the posts will be displayed.
   */
  function outputPosts(results, container) {
    container.innerHTML = "";
  
    // Iterate through the results and create post HTML elements
    results.forEach((result) => {
      let html = createPostHtml(result);
      container.insertAdjacentHTML("beforeend", html);
    });
  
    // If there are no results, display a message
    if (results.length === 0) {
      container.insertAdjacentHTML("beforeend", "<span class='noResults'>Nothing to show</span>");
    }
  }
  