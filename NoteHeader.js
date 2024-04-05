class NoteHeader extends HTMLElement {
    _shadowRoot = null;
    _style = null;
  
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
      this._style = document.createElement('style');
    }

    render() {
      this._emptyContent();
      this._updateStyle();
  
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
      <div className="note-app_header">
      <h1>Notes App</h1>
    </div>
      `;
    }
  
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
  
    connectedCallback() {
      this.render();
    }
  
    _updateStyle() {
      this._style.textContent = `
        nav {
          display: block;
        }
  
        note-app_header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          box-shadow: 0px 2px 10px 0px #c9d1d9;
        }

        note-app_header h1 {
          margin: 8px 0;
          flex: 1;
        }
        
        div {
          padding: 24px 20px;
          color: black;
          background-color: pink;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
          font-size: 20px;
        }
  
        @media screen and (max-width: 768px) {
          div {
            width: 100%;
          }
        }
      `;
    }
  }
  
  customElements.define('note-header', NoteHeader);