

# 🌍 Country Explorer React Application

A React-based frontend application that allows users to explore and interact with country data using the [REST Countries API](https://restcountries.com/). Users can search countries by name, filter by region and language, and manage their favorite countries.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License](#license)

---

## ✨ Features

- **Country Exploration**: View essential details about countries, including name, capital, population, languages, region, and flag.
- **Search**: Find countries by typing the country name in the search bar.
- **Filter**: Filter countries by region or language.
- **Favorites**: Save and view your favorite countries if logged in.
- **Responsive Design**: Ensures an optimal experience across different devices (desktop, tablet, and mobile).
- **Session Management**: Manage user login/logout with local storage, keeping favorites intact across sessions.

---

## 🛠️ Tech Stack

- **Frontend**: React (functional components)
- **Styling**: Tailwind CSS
- **API**: REST Countries API (v3)
- **Session Management**: Local storage for user authentication and favorites
- **State Management**: React hooks (`useState`, `useEffect`)

---

## 🔗 API Integration

This application consumes data from the following [REST Countries API](https://restcountries.com/):

- `GET /all`: Retrieve a list of all countries.
- `GET /name/{name}`: Search for a country by name.
- `GET /region/{region}`: Filter countries by region.
- `GET /alpha/{code}`: Fetch full details for a country using its alpha code.

Each country includes essential details:
- **Name**: The country's name.
- **Capital**: The capital city.
- **Population**: The population of the country.
- **Region**: The region the country belongs to.
- **Languages**: The languages spoken in the country.
- **Flag**: The country's flag image.

---

## 🚀 Getting Started

To get this app running locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** 

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-jeewa-hash.git

🧪 Testing
Unit and integration tests are written using Jest.

Includes component tests and mocks for API data.

npm test

🚀 Deployment

Frontend is deployed on [Vercel]https://mapora-explore-countries.vercel.app

## 🛠️ Challenges Faced and How They Were Fixed

### 1. **API Rate Limiting**
   - **Challenge**: While developing the app, we encountered rate-limiting issues with the REST Countries API, especially when making frequent requests for large amounts of data.
   - **Solution**: To manage the rate limits, we implemented caching by storing previously fetched data in `localStorage`. This ensures that repeated requests for the same data are avoided, reducing the number of API calls and speeding up the app's performance.

### 2. **Handling Large Dataset**
   - **Challenge**: Fetching all countries from the `/all` endpoint could result in slow performance, especially when the application was first loading or filtering the data.
   - **Solution**: Implemented lazy loading and pagination techniques to fetch and display data in smaller chunks. This ensures that users get a smooth experience without waiting for a long time for the full list of countries to load.

### 3. **Ensuring Responsive Design**
   - **Challenge**: Initially, the layout of the app did not scale well on mobile devices, which affected the user experience.
   - **Solution**: We switched to **Tailwind CSS** for rapid prototyping and used its built-in responsive design utilities. By adding appropriate breakpoints and optimizing the layout, the app now performs well across desktop, tablet, and mobile devices.

### 4. **Search Functionality with Large Dataset**
   - **Challenge**: The search functionality was slow when dealing with large datasets, especially when users typed rapidly in the search bar.
   - **Solution**: Introduced **debouncing** to delay the API call until the user has stopped typing for a specified amount of time. This minimizes unnecessary calls and improves performance. We also filtered the country names client-side to speed up the search process.


