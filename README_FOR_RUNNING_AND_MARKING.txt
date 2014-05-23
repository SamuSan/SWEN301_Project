This project requires python to be installed to run

To start the application first start a python server
From a terminal etc. you need to cd into the main directory of the assignment where the index.html file is
and run ...

1. On the terminal(command line) Change to the directory folder which has index.html
$ cd /home/somedir

2. Then execute the python server
$ python -m SimpleHTTPServer

or for python version 3 the command  python -m http.server 8000

once the server is up you need to open a browser and go to localhost:8000


###say stuff about the pages.

All of the html code is in the /pages folder
The java script running the code is in the script.js in the root folder
/data contains json objects of which only the mastersimulation.json is used and it is only used once ot load the demo data the first time
