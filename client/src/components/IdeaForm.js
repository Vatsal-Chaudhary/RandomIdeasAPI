import IdeasAPI from '../services/IdeasApi.js';
import IdeaList from './IdeaList.js';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListener() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert('Please enter all fields');
      return;
    }

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // Add idea to server
    const newIdea = await IdeasAPI.createIdea(idea);

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Save user to local storage
    localStorage.setItem('username', this._form.elements.username.value); // <--- Add this line

    // Clear all fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `<form id="idea-form">
    <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value=${
          localStorage.getItem('username')
            ? localStorage.getItem('username')
            : ''
        }>
    </div>
    <div class="form-control">
        <label for="idea-text">What is your idea</label>
        <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag">
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
    </form>`;
    this._form = document.querySelector('#idea-form');
    this.addEventListener();
  }
}

export default IdeaForm;
