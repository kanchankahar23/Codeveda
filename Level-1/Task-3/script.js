  document.getElementById("searchInput").addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBooks();
        }
    })
    async function searchBooks() {
        const query = document.getElementById("searchInput").value;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`);
        const data = await response.json();

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (data.items) {
            data.items.forEach(book => {
                const info = book.volumeInfo;
                const bookHTML = `
        <div class="book-card">
          <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${info.title}">
          <h3>${info.title}</h3>
          <p><strong>Author:</strong> ${info.authors ? info.authors.join(", ") : "N/A"}</p>
          <p>${info.description ? info.description.substring(0, 100) + '...' : 'No description available'}</p>
        </div>
      `;
                resultsDiv.innerHTML += bookHTML;
            });
        } else {
            resultsDiv.innerHTML = "<p style='color: white;'>No results found</p>";
        }
    }
      window.onload = function () {
    const emailInput = document.getElementById("no-autofill-email");
    
  };

 function login(event) {
     

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email == "kanchan kahar" && password == "1234") {
    
      window.location.href = "home.html"; 
      emailInput.value = "";
      passwordInput.value = "";
    } else {
      alert("Invalid username or password ❌");
    }
  }