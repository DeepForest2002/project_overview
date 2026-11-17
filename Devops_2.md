Docker Volumes = used to persist data , security , backup and restoration

# Commands

1. docker volume create volume_name
2. run a container= docker run -d -p 27017:27017 mongo
3. Attach the container with the volume = docker run -d --name demo-mongo -v volume_name:/data/db -p 27017:27017 mongo
4. docker volume ls
5. docker volume inspect volume_name
6. testing= docker exec -it demo-mongo mongosh

7. use testdb, db.getname(), insert the data db.demos.insert({}) quit()
8. docker rm -f demo-mongo
9. create a new container docker run -d --name demo-mongo2 -v volume_name:/data/db -p 27017:27017 mongo
10. db.demos.find.().pretty()
