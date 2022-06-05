#!/bin/bash

# Create a file
#touch dummyLogs

# Delete previous data
> dummyLogs.js

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
  statusOfDay: 0,
  durationTrip: null,
  meansOfTransport: 2,
  startingPoint: null,
  destination: null,
  meta: {job: 'Job A'}
  }")
  elif [[ $rec_column3 == "home" ]]
  then
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  statusOfDay: 2,
  durationTrip: null,
  meansOfTransport: 2,
  startingPoint: null,
  destination: null,
  meta: {job: 'Job A'}
  }")
  elif [[ $rec_column3 == "public" ]]
  then
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  statusOfDay: 1,
  durationTrip: $(parseDuration $rec_column6), 
  meansOfTransport: 1, 
  startingPoint: '$(splitStringFrom $rec_column4)',
  Destination: '$(splitStringTo $rec_column4)',
  meta: {job: 'Job A'}
  }")
  else 
    arr_csv+=("{
  date: String(new Date($(parseDate $rec_column2))), 
  statusOfDay: 0,
  durationTrip: $(parseDuration $rec_column6), 
  meansOfTransport: 0, 
  startingPoint: '$(splitStringFrom $rec_column4)',
  destination: '$(splitStringTo $rec_column4)',
  meta: {job: 'Job A'}
  }")
  fi
done < dummy_logs.txt

# Start writing js-file, open array
echo "export const logDataSeed = [" >> dummyLogs.js

# Add all objects to the array in the js-file
index=0
for record in "${arr_csv[@]}"
do
    echo "$record", >> dummyLogs.js
	((index++))
done

# Close array with objects
echo "]" >> dummyLogs.js

