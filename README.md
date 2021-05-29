## COVID APP

- World-wide covid-19 cases and death : used [covid-19 api by API-SPORTS](https://rapidapi.com/api-sports/api/covid-193)
- Custom Country covid-19 cases and death statistics : done with same API. Let the user choose one of the countries from a list of countries supported by api.
- Covid-19 statistics for Client's Location : Get user's coordinates with HTML Geolocation API, convert these coordinates into country using [LocationIQ](https://locationiq.com/geocoding), use this country to display stats as mentioned in step 2.  
- alerts for red, yellow and green zones calculated as follows : 
    - `isRed = newCases / population > 0.0001`
    - `isYellow = newCases / population > 0.00005`
    - `isGreen = !Red && !Yellow`
