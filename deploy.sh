# !/env/bash

docker build -t ventuary-dao .
docker run -itd --name ventuary-dao --restart always -p 5000:5000 ventuary-dao