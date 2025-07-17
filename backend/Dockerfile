FROM ghcr.io/puppeteer/puppeteer:latest

# Set working directory
WORKDIR /app

# Copy your project
COPY . .

# ✅ Fix permissions so pptruser can write to /app
USER root
RUN chown -R pptruser:pptruser /app

# Switch back to puppeteer's user
USER pptruser

# Install dependencies safely
RUN npm install --omit=optional --unsafe-perm

# Expose your backend port
EXPOSE 8000

# Start your app
CMD ["node", "server.js"]