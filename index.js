const user = 1;
const presentButton = document.getElementById('presentButton');
const absentButton = document.getElementById('absentButton');
const sickButton = document.getElementById('sickButton'); 
const sidesection = document.getElementById('sideBar');
const sideButton =document.getElementById('sideBarSubmit') ;
const sideHeading =document.getElementById('sideHeading')
function presentAttendance(status) {// Get user's location using geolocation API
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;
      const apiUrl = `https://geocode.maps.co/reverse?lat=${userLatitude}&lon=${userLongitude}&api_key=6752248146f48610401497ouq7974e3`;

      // Send a request to your API to check if the user's location matches the specified location
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          
          // Compare the latitude and longitude values, allowing for small tolerances in the comparison
          const tolerance = 0.0004; // You can adjust this tolerance based on your needs and measured in meters
          
          // Check if the difference between user and API lat/lon is within tolerance
          if (
            Math.abs(userLatitude - data.lat) < tolerance &&
            Math.abs(userLongitude - data.lon) < tolerance
          ) {
            // Mark attendance as present
            alert("present welcome to the office");
          } else {
            // Mark attendance as absent
            alert("Absent");
          }
        })
        .catch(error => {
          alert('Error fetching location:', error);
        });
    },
    (error) => {
      alert('Error getting location:', error);
    }
  );
}
function absentAttendance() {
  sidesection.style.display="block";
  sideHeading.innerHTML=`REASONS FOR BEING ABSENT`

}
function submitAbsentAttendance() {
  sidesection.style.display="none";
  
}
function sickAttendance(){
  sidesection.style.display="block";
  sideHeading.innerHTML=`REASONS FOR BEING sick`
}

presentButton.addEventListener('click', () => presentAttendance('present'));
absentButton.addEventListener('click', () => absentAttendance('absent'));
sickButton.addEventListener('click', () => sickAttendance('sick'));
sideButton.addEventListener('click', () => submitAbsentAttendance('absent'));

