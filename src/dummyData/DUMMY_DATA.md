## What?

`generateLogData.sh` will generate a `dummyLogs.js` file with dummy data for the commuter log server.

## How?

Have a `dummy_logs.txt` file next to the bash script.

Data separated by pipes:

- week number
- date (dd-mm-yyyy)
- status (day off, home, public, car)
- from (place)
- to (place)
- time (00:00)

Example
12|22-12-2000|public|venus|mars|05:50

> bash generateLogData.sh
