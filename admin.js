import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, deleteDoc, updateDoc, collection } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Admin Login
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Admin Logged In Successfully');
      document.getElementById('admin-dashboard').style.display = 'block';  // Show admin dashboard
      loadCategories();  // Load categories
      loadCities();      // Load cities
      loadAreas();       // Load areas
      loadSportsEvents(); // Load sports events for deletion
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Add/Update Sports Categories
document.getElementById('category-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const categoryName = document.getElementById('category-name').value;
  const categoryRef = doc(db, 'sportsCategories', categoryName);

  setDoc(categoryRef, { name: categoryName })
    .then(() => {
      alert('Category Added/Updated');
      loadCategories();  // Reload categories
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Load Categories
async function loadCategories() {
  const categoriesSnapshot = await getDocs(collection(db, 'sportsCategories'));
  const categoryList = document.getElementById('category-list');
  categoryList.innerHTML = '';  // Clear the list
  categoriesSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    categoryList.appendChild(li);
  });
}

// Add/Update Cities
document.getElementById('city-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const cityName = document.getElementById('city-name').value;
  const cityRef = doc(db, 'cities', cityName);

  setDoc(cityRef, { name: cityName })
    .then(() => {
      alert('City Added/Updated');
      loadCities();  // Reload cities
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Load Cities
async function loadCities() {
  const citiesSnapshot = await getDocs(collection(db, 'cities'));
  const cityList = document.getElementById('city-list');
  cityList.innerHTML = '';  // Clear the list
  citiesSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    cityList.appendChild(li);
  });
}

// Add/Update Areas
document.getElementById('area-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const areaName = document.getElementById('area-name').value;
  const areaRef = doc(db, 'areas', areaName);

  setDoc(areaRef, { name: areaName })
    .then(() => {
      alert('Area Added/Updated');
      loadAreas();  // Reload areas
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Load Areas
async function loadAreas() {
  const areasSnapshot = await getDocs(collection(db, 'areas'));
  const areaList = document.getElementById('area-list');
  areaList.innerHTML = '';  // Clear the list
  areasSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    areaList.appendChild(li);
  });
}

// Load Sports Events for Deletion
async function loadSportsEvents() {
  const sportsEventsSnapshot = await getDocs(collection(db, 'sportsEvents'));
  const eventList = document.getElementById('sports-event-list');
  eventList.innerHTML = '';  // Clear the list

  sportsEventsSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteSportsEvent(doc.id);
    li.appendChild(deleteButton);

    eventList.appendChild(li);
  });
}

// Delete Sports Event
function deleteSportsEvent(eventId) {
  const eventRef = doc(db, 'sportsEvents', eventId);
  deleteDoc(eventRef)
    .then(() => {
      alert('Sports Event Deleted');
      loadSportsEvents();  // Reload events list after deletion
    })
    .catch((error) => {
      alert(error.message);
    });
}
