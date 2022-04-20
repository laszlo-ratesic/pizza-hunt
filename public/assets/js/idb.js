// create a variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open("pizza_hunt", 1);

// this event will emit if the db version changes (nonexistent to 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called 'new_pizza'
  // set it to auto increment primary key
  db.createObjectStore("new_pizza", { autoIncrement: true });
};

// upon success
request.onsuccess = function (event) {
  // when db is successfully created with its object store
  // (from onupgradeneeded event above) or established a connection,
  // save reference to db in global var
  db = event.target.result;

  // check if app is online, if yes
  // run uploadPizza() fn to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet
    // uploadPizza();
  }
};

request.onerror = function (event) {
  // log error
  console.log(event.target.errorCode);
};

// This function will execute if we attempt to submit a new pizza
// and there's no internet connection
function saveRecord(record) {
  // open a new txn w/ the db with read and write permissions
  const txn = db.transaction(["new_pizza"], "readwrite");

  // access the object store for 'new_pizza'
  const pizzaObjectStore = txn.objectStore("new_pizza");

  // add record to your store with add method
  pizzaObjectStore.add(record);
}
