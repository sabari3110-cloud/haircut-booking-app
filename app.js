let selectedSalon = "";

function bookSalon(salonName) {
    selectedSalon = salonName;

    document.getElementById("selectedSalon").innerText =
        "Selected Salon: " + salonName;

    document.getElementById("bookingBox").style.display = "block";
}

function closeBooking() {
    document.getElementById("bookingBox").style.display = "none";
}

function confirmBooking() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (name === "" || phone === "" || date === "") {
        alert("Please fill all details.");
        return;
    }

    if (phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }

    alert(
        "✅ Booking Confirmed!\n\n" +
        "Salon: " + selectedSalon + "\n" +
        "Name: " + name + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time
    );

    document.getElementById("bookingBox").style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date").value = "";
}