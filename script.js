const currentDayElement = $("#currentDay");
const currentDay = dayjs().format("dddd, MMMM DD, YYYY, h:mm A");

$(document).ready(function () {
  $(document).on("click", ".saveBtn", saveText);

  function saveText(event) {
    const appointmentElement = $(event.target).siblings(".description");
    const appointmentValue = appointmentElement.val();
    const timeBlockId = $(event.target).parent().attr("id");
    localStorage.setItem(timeBlockId, appointmentValue);
    console.log("Saved!");
  }

  function colorTime() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const savedAppointment = localStorage.getItem(timeBlockId);
      if (savedAppointment) {
        $(this).find(".description").val(savedAppointment);
      }

      const currentTime = dayjs().format("H");
      const scheduleTime = parseInt(timeBlockId.split("-")[1]);
      if (scheduleTime < currentTime) {
        $(this).removeClass("future");
        $(this).removeClass("present");
        $(this).addClass("past");
      } else if (scheduleTime === currentTime) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  colorTime();
  setInterval(colorTime, 60000);
  
});

currentDayElement.text(currentDay);
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
