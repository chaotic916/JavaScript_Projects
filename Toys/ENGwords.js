let ENGword = [];

render_ENGword();

function render_ENGword() {

  let ENGword_HTML = '';

  // Generating the HTML
  for (let i = 0; i < ENGword.length; i++) {
    const word_object = ENGword[i];
    // destructuring
    const { word, meaning, date } = word_object;
    const html = `
      <div>${word}</div> 
      <div>${meaning}</div> 
      <div>${date}</div>
      <button class="delete_button">Delete</button>
    `;
    
    ENGword_HTML += html;
  }
  document.querySelector('.engwordlist_html').innerHTML = ENGword_HTML;

  document.querySelectorAll('.delete_button').forEach((deletebutton, index) => {
    deletebutton.addEventListener('click', () => {
      ENGword.splice(index, 1);
      render_ENGword();
    });
  });
}

function add_word() {
  // When the Add button is activated, pull the input from the input bar
  const wordinputElement = document.querySelector('.word_input');
  const word = wordinputElement.value;
  const meaninginputElement = document.querySelector('.meaning_input');
  const meaning = meaninginputElement.value;
  const dateinputElement = document.querySelector('.date_input');
  const date = dateinputElement.value;

  ENGword.push({word, meaning, date});

  // values must be emptied after they are added 
  wordinputElement.value = '';
  meaninginputElement.value = '';
  dateinputElement.value = '';

  render_ENGword();
}