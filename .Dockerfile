FROM node:17-slim
WORKDIR /usr/src/appCOPY 
package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 4200
CMD [ "node", "index.js" ]