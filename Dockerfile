FROM node:18.18-alpine

# Create workdir
RUN mkdir -p /usr/sapi
WORKDIR /usr/sapi

# Install global dep as root
RUN npm install pm2 -g

# Run as normal user from here on (better security)
RUN chown node:node ./
USER node

# Default node env to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY . .

# Default port to 3000
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

CMD ["pm2-runtime", "src/index.js"]