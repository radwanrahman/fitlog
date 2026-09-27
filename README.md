# FitLog

FitLog is a workout library website I built for my Next.js course assignment. It shows a list of workouts, lets you check the details of each one, and lets you plan what to do today or save workouts for later.

## What I used to build this

- Next.js (App Router)
- Tailwind CSS for styling
- React Context to keep track of the plan and saved list across pages
- localStorage so the plan doesn't disappear when you refresh the page
- react-hot-toast for the small pop-up notifications
- A public API for the workout data

## Features

1. Browse a library of 12 workouts, each with a photo, category tags, equipment, and stats (time, calories, rating).
2. Click any workout to see a full detail page with instructions and specs.
3. Add a workout to "today's plan" or save it for later, with a toast message confirming it.
4. A My Plan page that shows your added workouts, tracks total exercises/minutes/calories, and lets you mark workouts as done or remove them.
5. Sort the library by duration, calories, or rating using a dropdown.
6. Works on phone, tablet, and desktop screens.
7. A custom 404 page for any page that doesn't exist.

## Notes

- The workout images used inside the app come from the public API, not made by me.
- Padding and spacing may not match the Figma design pixel-for-pixel, but the layout and structure follow it closely.


## Live Link

https://fitlogappbasic.netlify.app/

## GitHub Repository

https://github.com/radwanrahman/fitlog