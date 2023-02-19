# Altomobile React Challenge Luis Tellez

![React Calendar](https://user-images.githubusercontent.com/27663011/219922454-f35c187f-5814-4405-9645-a8c6cb390977.gif)

## Description

This is a simple React application that displays a calendar with the current month and allows the user to select a date. The user can also add events to the calendar by clicking on a date and filling out a form. The events are saved in the browser's local storage. (for now).

The task was to create a simple calendar application that allows the user to add events to the calendar. The challenge was to build the application functionality from scratch without using any external libraries, therefore the base functionality of the calendar was built using JavaScript's Date object.

```javascript
Date,
  Date.prototype.getDay,
  Date.prototype.getDate,
  Date.prototype.getMonth,
  Date.prototype.getFullYear,
  Date.prototype.setDate,
  Date.prototype.setMonth,
  Date.prototype.setFullYear,
  Date.prototype.toLocaleDateString,
  Date.prototype.toLocaleS;
```

## Development environment

- Node.js v18.13.0
- npm v9.4.0
- React v18.2.0
- Vite v4.1.0

Even though I prefer to use a meta framework like Next.js for it's improved developer experience and overall better performance, I decided to use Vite for this challenge to focus on a base React Experience that would allow React developers of all levels to understand the code easily.

Vite provides a nearly identical experience to Create React App, but with a much faster build time and a more flexible configuration. Therefore, I decided to use it for this challenge.

## Functionality

### Calendar buttons

In the Calendar component, the header has three buttons that allow the user to go back and forward on the current date & year, and a button that allows the user to go back to the current date & year. (Back, Next, Today)

The initial state is set using the useState hook, and the current date is set using the Date object. The current date is then used to set the initial state of the calendar.

```javascript
// define the state for the current date using the JS Date object
const [currentDate, setCurrentDate] = React.useState(() => {
  // try to retrieve the saved date from localStorage
  const savedDate = localStorage.getItem('currentDate');
  return savedDate ? new Date(savedDate) : new Date();
});
```

The Back and Next buttons use the handleDateChange function by a system of increments and decrements.

```javascript
// function to handle the back and next buttons by incrementing or decrementing the month by 1 (increment = -1 or 1)
function handleDateChange(increment) {
  const newDate = new Date(currentDate);
  newDate.setMonth(newDate.getMonth() + increment);
  setCurrentDate(newDate);
}
```

The Today button uses the handleResetClick function to set the current date to the current date.

```javascript
// function to handle the reset button by setting the current date to today
function handleResetClick() {
  setCurrentDate(new Date());
}
```

All of this works because the currentDate is saved in the browser's local storage. This allows the user to refresh the page and the calendar will still be on the same date.

This is done using the useEffect hook. The useEffect hook is used to save the current date to the browser's local storage every time the currentDate state changes.

The ideal solution would be to use a database to save the events, but for this challenge I decided to use the browser's local storage to save the events, this would limit the development time and allow me to focus solely on Front End development.

```javascript
React.useEffect(() => {
  localStorage.setItem('currentDate', currentDate);
}, [currentDate]);
```

## Roadmap

- [x] Display a calendar with the current month
- [x] Allow the user to select a date
- [x] Allow the user to add events to the calendar
- [x] Save events in the browser's local storage
- [ ] Allow the user to edit events
- [ ] Allow the user to delete events
- [ ] Import events from external sources
