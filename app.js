import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Register a New User
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User Registered Successfully');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// User Login
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User Logged In Successfully');
      // Show Event Section
      document.getElementById('event-section').style.display = 'block';
      loadEvents();  // Load events once logged in
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Add Sports Event
document.getElementById('add-event-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const eventName = document.getElementById('event-name').value;
  const eventRef = doc(db, 'sportsEvents', eventName);

  setDoc(eventRef, { name: eventName })
    .then(() => {
      alert('Sports Event Added');
      loadEvents();  // Reload the events list
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Load Events
async function loadEvents() {
  const eventsSnapshot = await getDocs(collection(db, 'sportsEvents'));
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = '';  // Clear existing list

  eventsSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    
    // Add Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => updateEvent(doc.id);
    li.appendChild(editButton);
    
    // Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteEvent(doc.id);
    li.appendChild(deleteButton);

    eventList.appendChild(li);
  });
}

// Update Event
function updateEvent(eventId) {
  const newName = prompt('Enter new event name:');
  if (newName) {
    const eventRef = doc(db, 'sportsEvents', eventId);
    updateDoc(eventRef, { name: newName })
      .then(() => {
        alert('Event Updated');
        loadEvents();  // Reload the events list
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

// Delete Event
function deleteEvent(eventId) {
  const eventRef = doc(db, 'sportsEvents', eventId);
  deleteDoc(eventRef)
    .then(() => {
      alert('Event Deleted');
      loadEvents();  // Reload the events list
    })
    .catch((error) => {
      alert(error.message);
    });
}
