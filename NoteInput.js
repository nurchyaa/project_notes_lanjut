class InputNote extends HTMLElement {
  _root = null;
  _style = null;
  
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
      this._style = document.createElement('style');
    }

    connectedCallback() {
      this.renderForm();
      this.setupFormSubmission();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div>
      <div class="container shadow" id="add-note">
        <h2 class="container-header text-center">Tambahkan Catatan</h2>
        <form class="note-input" action="#" id="note">
          <div class="note-group note-title">
            <label for="judul">Judul</label>
            <input type="text" id="judul" name="judul" required>
          </div>
          <div class="note-group label note-desc">
            <label for="deskripsi">Deskripsi</label>
            <textarea name="deskripsi" id="deskripsi" cols="30" rows="5" required></textarea>
          </div>
          <input type="submit" value="Submit" name="submit" class="btn-submit">
        </form>
      </div>
    </div>
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
    this._shadowRoot.querySelector('#note').addEventListener('submit', this._handleSubmit.bind(this));
  }

  _handleSubmit(event) {
    event.preventDefault();
    const title = this._shadowRoot.querySelector('#judul').value;
    const description = this._shadowRoot.querySelector('#deskripsi').value;

    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: title,
      body: description,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));
    
  
    this._shadowRoot.querySelector('#judul').value = '';
    this._shadowRoot.querySelector('#deskripsi').value = '';
  }
  
    _updateStyle() {
      this._style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .container {
        width: 100%;
        max-width: 500px;
        border-radius: 8px;
        margin: 16px;
        background: pink;
        padding: 16px;
        flex-grow: 1;
        height: fit-content;
        color: black;
      }
      
      div {
        width: 100%;
        max-width: 500px;
      }
      
      .note-input {
        display: flex;
        flex-direction: column;
        height: fit-content;
        padding: 16px;
        border-radius: 16px;
      }

      .note-group label {
        margin-bottom: 4px;
        font-size: 15x;
        font-weight: bold;
      }
      
      .note-group {
        display: flex;
        flex-direction: column;
        color: black;
      }

      .btn-submit {
        width: fit-content;
        border-radius: 16px;
        padding: 12px 24px;
        border: 2px solid pink;
        background: white;
        color: pink;
        font-size: 20px;
        margin-top: auto;
        align-self: center;
        cursor: pointer;
        color: black;
      }
      
      .btn-submit:hover {
        background: black;
        color: white;
      }
      
      .text-center {
        text-align: center;
      }
      
      input[type=text], textarea{
        padding: 18px;
        margin: 13px 0;
        font-family: 'Poppins', sans-serif;
        background-color: white;
        color: white;
        border: 2px solid white;
        border-radius: 7px;
        box-shadow: 0px 5px 10px 0px #fff;
      }

      input[type=text], textarea, .btn-submit:focus {
        border-color: white;
        color: #000;
        font-size: 15px;
        box-shadow: inset 100em 0 0 0 #fff;
      }
  
      @media screen and (max-width: 768px) {
        container {
          width: 100%;
        }
      }
      `;
    }
  }
  
  customElements.define('note-input', InputNote);