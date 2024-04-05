class NoteSearch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .search-bar {
                    margin: 20px auto;
                    justify-content: center;
                    width: 90%;
                    display: flex;
                    align-items: center;
                }

                #search {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px;
                    width: 80%;
                }

                input[type="text"] {
                    padding: 20px;
                    width: 70%;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    margin-right: 10px;
                    outline: none;
                    transition: box-shadow 0.3s;
                    font-size: 16px;
                }

                btn[type="submit"] {
                    padding: 20px;
                    background-color: pink;
                    color: black;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 16px;
                }
                
                btn[type="submit"]:hover {
                    background-color: white;
                }

                input[type="text"]:focus {
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
            </style>
            <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Find ur Notes..">
            <btn type="submit" id="searchButton">Search</button>
        </div>
        `;
        this.searchInput = this.shadowRoot.getElementById('searchInput');
        this.searchButton = this.shadowRoot.getElementById('searchButton');
        this.searchButton.addEventListener('click', this.handleSearch.bind(this));
    }

    handleSearch() {
        const searchTerm = this.searchInput.value;
        
        console.log('Searching for:', searchTerm);
        
        this.dispatchEvent(new CustomEvent('search', { detail: searchTerm }));
    }

    connectedCallback() {
        const searchInput = this.shadowRoot.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.trim().toLowerCase();
            const searchEvent = new CustomEvent('search', { detail: searchValue });
            this.dispatchEvent(searchEvent);
        });
    }
    
}

customElements.define('note-search', NoteSearch);