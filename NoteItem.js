class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const note = this._note;

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="container">
        <div class="note-item">
          <div class="note-item_info">
            <div class="note-item_title h2">
              <h2>${note.title}</h2>
            </div>
            <div class="note-desc">
              <p>${note.body}</p>
            </div>
            <div class="date">
              <p>${new Date(note.createdAt).toLocaleString()}</p>
            </div>
            <div class="note-delete">
            <button type="button" class="button-delete" id=""${note.id}>Hapus</button>
          </div>
          </div>
        </div>
      </div>
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get getNote() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      .container {
        padding: 2%;
      }

      .note-item {
        display: block;
        border-radius: 8px;
        width: 450px;
        background: pink;
        padding: 0;
        box-shadow: 0 5px 10px rgba(154, 160, 185, .05), 0 15px 40px rgba(166, 173, 201, .2);
      }

      .note-item_title h2 {
        font-weight: bold;
        text-align: center;
      }
      
      .note-item_info {
        padding: 20px;
        border-radius: 8px;
        border: 2px solid white;
        height: 200px;
      }
      
      .note-desc {
        margin-top: 2px;
      }

      .date {
        margin-top: 1rem;
        text-align: center;
      }

      @media screen and (max-width: 768px) {
        .list {
          justify-items: center;
          justify-content: center;
        }
      }
      .note-delete {
        margin-top: 2rem;
        text-align: right;
      }

      .button-delete {
        color: #fff;
        background-color: #dc3545;
        border: 1px solid;
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 16px;
      }

      .button-delete:hover {
        background-color: darkred;
      }
    `;
  }
}

customElements.define("note-item", NoteItem);