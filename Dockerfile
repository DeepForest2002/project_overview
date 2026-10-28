
# Creating a node js image 

FROM node:22.15.1-alpine

# workdir app create a workdir inside docker container
WORKDIR /app 

#Copy all the package file
COPY package*.json ./

#Installing node
RUN npm ci 

#Copy all the application source code

COPY . .

#this is a ts project so compile ts
RUN npm run build

#Expose application port
EXPOSE 4000

#Start the application
CMD [ "node", "dist/server.js" ]