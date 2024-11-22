// Fetch and display the list of people
document.getElementById('list').addEventListener('click', function() {
  fetch('/person')
      .then(response => response.json())
      .then(data => {
          const peopleContainer = document.getElementById('people-container');
          peopleContainer.innerHTML = ''; // Clear previous entries
          data.forEach(person => {
              const li = document.createElement('li');
              li.innerText = `${person.name} - ${person.age} - ${person.gender} - ${person.mobile}`;
              const editButton = document.createElement('button');
              editButton.innerText = 'Edit';
              editButton.onclick = () => loadPersonForEdit(person);
              const deleteButton = document.createElement('button');
              deleteButton.innerText = 'Delete';
              deleteButton.onclick = () => deletePerson(person._id);
              li.appendChild(editButton);
              li.appendChild(deleteButton);
              peopleContainer.appendChild(li);
          });
          document.getElementById('people-list').style.display = 'block';
          document.getElementById('add-person-form').style.display = 'none';
          document.getElementById('edit-person-form').style.display = 'none';
      });
});

// Load person data into the edit form
function loadPersonForEdit(person) {
  document.getElementById('editId').value = person._id;
  document.getElementById('editName').value = person.name;
  document.getElementById('editAge').value = person.age;
  document.getElementById('editGender').value = person.gender;
  document.getElementById('editMobile').value = person.mobile;
  document.getElementById('edit-person-form').style.display = 'block';
  document.getElementById('people-list').style.display = 'none';
  document.getElementById('add-person-form').style.display = 'none';
}

// Handle adding a new person
document.getElementById('addForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  const person = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      mobile: document.getElementById('mobile').value,
  };
  fetch('/person', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
  })
  .then(response => response.json())
  .then(() => {
      document.getElementById('addForm').reset(); // Reset the form
      alert('Person added successfully!');
      document.getElementById('list').click(); // Refresh the people list
  });
});

// Handle updating a person
document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  const personId = document.getElementById('editId').value;
  const updatedPerson = {
      name: document.getElementById('editName').value,
      age: document.getElementById('editAge').value,
      gender: document.getElementById('editGender').value,
      mobile: document.getElementById('editMobile').value,
  };
  fetch(`/person/${personId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPerson)
  })
  .then(response => response.json())
  .then(() => {
      alert('Person updated successfully!');
      document.getElementById('edit-person-form').style.display = 'none';
      document.getElementById('list').click(); // Refresh the people list
  });
});

// Handle deleting a person
function deletePerson(personId) {
  if (confirm('Are you sure you want to delete this person?')) {
      fetch(`/person/${personId}`, {
          method: 'DELETE'
      })
      .then(() => {
          alert('Person deleted successfully!');
          document.getElementById('list').click(); // Refresh the people list
      });
  }
}

// Show the Add Person form
document.getElementById('add').addEventListener('click', function() {
  document.getElementById('add-person-form').style.display = 'block';
  document.getElementById('people-list').style.display = 'none';
  document.getElementById('edit-person-form').style.display = 'none';
});
