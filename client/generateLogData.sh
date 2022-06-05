#!/bin/bash

# Create a file
#touch logData.ts

# Delete previous data
> logData.ts

# Get start of route
function splitStringFrom () {
  echo $1
}

# Get end of route
function splitStringTo () {
  echo $3
}

# Drop the hidden return
# Calculate duration
function parseDuration () {
  stripped=$(echo $1|tr -d '\t\r\n')
  IFS=':' read hrs min <<< "$stripped"
  echo $(($hrs * 60 + $min))
}

function parseDate () {
  IFS="-" read day month year <<< "$1"
  echo "'20$year/$month/$day'"
}

# Loop through csv and build js-objects
arr_csv=() 
while IFS="|" read -r rec_column1 rec_column2 rec_column3 rec_column4 rec_column5 rec_column6
do
  if [[ $rec_column3 == "day off" ]]
  then
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  statusOfDay: 'day off',
  weekNumber: $rec_column1
  }")
  elif [[ $rec_column3 == "home" ]]
  then
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  statusOfDay: 'working from home',
  weekNumber: $rec_column1
  }")
  elif [[ $rec_column3 == "public" ]]
  then
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  durationTrip: $(parseDuration $rec_column6), 
  meansOfTransport: 'public transport', 
  routeTripFrom: '$(splitStringFrom $rec_column4)',
  routeTripTo: '$(splitStringTo $rec_column4)',
  statusOfDay: 'working at the office',
  weekNumber: $rec_column1
  }")
  else 
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  durationTrip: $(parseDuration $rec_column6), 
  meansOfTransport: 'car', 
  routeTripFrom: '$(splitStringFrom $rec_column4)',
  routeTripTo: '$(splitStringTo $rec_column4)',
  statusOfDay: 'working at the office',
  weekNumber: $rec_column1
  }")
  fi
done < csvLog.txt

# Start writing js-file, open array
echo "export const logDataSeed = [" >> logData.ts

# Add all objects to the array in the js-file
index=0
for record in "${arr_csv[@]}"
do
    echo "$record", >> logData.ts
	((index++))
done

# Close array with objects
echo "]" >> logData.ts

