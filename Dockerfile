# Use a specific version of the node image to ensure consistent environments across all builds.
FROM node:20-buster AS development


# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


# Create app directory
WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y ghostscript google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json first to leverage Docker cache layers
# This avoids re-installing all node_modules every build unless these files change.
COPY package.json ./
# Install dependencies with npm ci, which is faster and more reliable for production builds.
# Adjust npm settings to optimize installation time and reduce verbosity.
RUN npm install --verbose
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 8000
# Command to run the application
CMD ["npm", "run", "prod"]
