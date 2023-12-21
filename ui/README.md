# Weathery - An AnnieCannons Project

Weathery is a project for students at AnnieCannons.. The finished app allows users to search for locations and get the matching weather forecasts.

This project brings together all the skills needed for the Advanced Modules, so that staff and student alike can know the student is ready to proceed with confidence, or know with confidence what skills gaps need addressing.

## Goal

The purpose of this assignment is to bring together everything you have learned so far in 'Intro to Programming' into one project.

## Learning Objectives

To complete this project, students will need to demonstrate skills in:

- manipulating a user interface with the JS DOM API
- making API calls with `fetch`
- laying out a user interface with CSS Grid and CSS Flexbox

## Rubric

#### Functionality

The app meets all of the following user stories:

- The user can enter a city name in an input box and press a submit button to see the following information for the searched city:
  - the name of the city
  - the country for the city
  - the current temperature
  - the high temperature
  - the low temperature
  - the chance of precipitation
  - the high, low, and chance of precipitation for each of the following 3 days
- When the user searches, _one_ of the following is displayed as well:
  - The app will display "It's Hot Today!" if it is above 75 degrees.
  - The app will display "It's Moderate Today!" if it is between 45 - 74 degrees.
  - The app will display "It's Cold Today!" if it is below 45 degrees.
- When the user searches, they see which day out of the next three days will be hottest.

Please see [our wireframe](https://www.figma.com/file/9C3tbvQrT2EmKElg6ySJEF/Weathery-Website?type=design&node-id=0-1&mode=design) to see a visual depiction of these user stories. 

###### Functionality Stretch Goals

These are **_not_** a requirement, but are given so that you have a way to push yourself and practice more should you want to do so.

- Add a background image or emojis to represent the current weather.
- Add a drop-down for the user to choose Celsius or Fahrenheit temperatures, updating the display to match.
- When the user submits a search, that search and all previous searches are displayed under "Previous Searches." When the user clicks a previous search, that search is run again.

#### Code Quality

The code should:

- Use vanilla JS DOM manipulation and no other UI framework.
- Use `fetch` for an API call to the Weather API.
- Use CSS Grid to lay out the overall interface.
- Use CSS Flexbox to lay out at least one individual section.

#### User Interface Design

The app should:

- Be responsive to different screen sizes.
- Have an input box for users to type their searches in with a submit button.
- Have a design that follows [our wireframe](https://www.figma.com/file/9C3tbvQrT2EmKElg6ySJEF/Weathery-Website?type=design&node-id=0-1&mode=design).

## A Note On Using The API

Here is the link to sign up for the API service. This is free, but you will need to sign up to get an API Key: https://www.weatherapi.com/signup.aspx

Here is the documentation for the API: https://www.weatherapi.com/docs/

Here is a sample API call: `http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London`

## Getting Started

1. Fork this repository.
2. Clone your forked repository.
3. Create an HTML file named `index.html`.
4. Link your CSS file using a `link` tag in your HTML file.
5. Link your JavaScript file using a `script` tag in your HTML file.

## Suggested Tools

We suggest using Visual Studio Code as your editor. You can download it here: https://code.visualstudio.com/download

We also suggest using Visual Studio Code's Live Server extension to render your project in the browser. You can download it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

## Submitting Your Assignment

To submit your work, you will submit a Pull Request on GitHub from your fork to the original repo. If you're unsure how to do so, you can refer to [our guide to submitting assignments via Pull Request](https://github.com/AnnieCannons/intro-to-programming-curriculum/blob/main/git/resources/github-pull-request-guide.md)
