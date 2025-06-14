# frontend/Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./

# Clean install without package-lock.json (buggy)
RUN rm -f package-lock.json && npm install
RUN npm install -g vite

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]

