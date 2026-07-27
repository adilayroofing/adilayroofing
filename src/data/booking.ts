// Google Calendar appointment schedules offered on the contact form
// thank-you screen.
//
// To activate: create each appointment schedule in Google Calendar
// (on the same Adilay calendar Zoho writes to), copy its booking-page
// link (open the schedule → Share → "Use a link"), and paste it into
// `url` below. An entry with an empty `url` is hidden; when every url
// is empty the whole booking section is hidden.
//
// Note: Google's booking page does NOT support prefill via URL params
// (verified 2026-07). Visitors signed into a Google account get their
// name/email auto-filled by Google. Phone is not asked for — we already
// have it from the form.
//
// Use the FULL calendar.google.com URL here, not the calendar.app.google
// short link — the short link can't take the gv=true embed param.

export interface BookingSchedule {
  /** Button label shown to the lead */
  label: string;
  /** Human-readable duration shown next to the label */
  duration: string;
  /** Google Calendar appointment-schedule booking link */
  url: string;
}

// The current Google Workspace plan allows only ONE appointment schedule.
// The schedule is set to 1-hour slots — the hour is the ARRIVAL WINDOW
// the team can show up in, not the inspection length.
// If the plan is upgraded later, add a second entry here and it will
// appear as a second card.
export const bookingSchedules: BookingSchedule[] = [
  {
    label: "Free Roof Visit",
    duration: "1-hour arrival window",
    url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1kSY9TA18Jk5W5wQdXBdTbqDa-0jnDFrFWD1GdgzvFjs7vjZxQmEj1mU9cUz8GoB5nkapZn5Cv",
  },
];
