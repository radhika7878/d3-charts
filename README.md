# d3-charts
Collection of charts made using D3.js

Clone the repo and start a localserver, for python use - python -m http.server 8000 --bind 127.0.0.1

1. Choropleth - 

Dataset in education.csv, us.json and education_details.csv, visualized as a choropleth map.

Each record in education.csv represents a county and is of the form <id,name,percent_educated>, where
id corresponds to the county id
name is the county name
percent_educated is the percentage of educated people living in that county

The education_details.csv file contains a list of records, each having four fields:
an id field corresponding to a county in the United States,
a qualified_professionals field corresponding to the number of professionals in the county,
a high_school and a middle_school_or_lower fields corresponding to the number of high school students and middle school students respectively.

The us.json file is a TopoJSON topology containing three geometry collections: counties, states, and nation.

![Alt text](images/choropleth.png?raw=true "Choropleth")

2. Interactive - 

Dataset provided in the dataset.txt file to create an interactive bar chart. Each line in the file represents population growth (per year) of an US city over the past five years, starting with total population of year 2012.

![Alt text](images/interactive.png?raw=true "Choropleth")

3. Heatmap -

Dataset provided in heatmap.csv that describes the number and types of Charms cast by each of the wizarding houses across J.K. Rowling’s 7 Harry Potter books. Visualized the data using D3 heatmaps.

![Alt text](images/heatmap.png?raw=true "Choropleth")

4. Scatterplot - 

Dataset provided in the file movies.csv (in the Q3 folder) to create a scatter plot.
Attributes in the dataset:
Feature 1: Id of the movie
Feature 2: Title
Feature 3: Year
Feature 4: Runtime (minutes)
Feature 5: Country
Feature 6: IMDb Rating
Feature 7: IMDb Votes
Feature 8: Budget (in USD)
Feature 9: Gross (in USD)
Feature 10: Wins and nominations
Feature 11: Is good rating? ( value 1 means “good”, value 0 - “bad”)
To learn more about IMDb, visit https://en.wikipedia.org/wiki/IMDb

![Alt text](images/scatterplot.png?raw=true "Choropleth")

5. Graph - 

![Alt text](images/graph.png?raw=true "Choropleth")
