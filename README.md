This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker Deployment

This project is configured for Docker deployment using Next.js standalone output mode, which creates an optimized production image with only the necessary files.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- Docker Desktop (for macOS/Windows) or Docker Engine (for Linux)

### Building the Docker Image

Build the Docker image using the following command:

```bash
docker build -t nextjs-feature-test .
```

You can replace `nextjs-feature-test` with any name you prefer for your image.

### Running the Container

Run the container with the default port (3000):

```bash
docker run -p 3000:3000 nextjs-feature-test
```

The application will be available at [http://localhost:3000](http://localhost:3000).

#### Custom Port

To run on a different port, use the `PORT` environment variable:

```bash
docker run -p 8080:8080 -e PORT=8080 nextjs-feature-test
```

### Environment Variables

The application supports several environment variables. Pass them to the container using the `-e` flag:

```bash
docker run -p 3000:3000 \
  -e REDIS_URL=redis://your-redis-url \
  -e MOCK_API_BASE_URL=https://api.example.com \
  nextjs-feature-test
```

#### Available Environment Variables

- `REDIS_URL` - Redis connection URL for cache handlers (optional)
- `MOCK_API_BASE_URL` - Base URL for the mock API (optional)
- `PORT` - Port number for the server (default: 3000)
- `HOSTNAME` - Hostname to bind to (default: 0.0.0.0)
- `NODE_ENV` - Node environment (set to `production` in the Dockerfile)

### Using Docker Compose

For easier management, you can use Docker Compose. Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  nextjs-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=${REDIS_URL}
      - MOCK_API_BASE_URL=${MOCK_API_BASE_URL}
    # Uncomment to use a volume for development
    # volumes:
    #   - .:/app
    #   - /app/node_modules
    #   - /app/.next
```

Then run:

```bash
docker-compose up
```

Or in detached mode:

```bash
docker-compose up -d
```

### Production Deployment

For production deployments, consider the following:

1. **Use a reverse proxy**: Place nginx or another reverse proxy in front of your Next.js container to handle SSL termination, rate limiting, and request buffering.

2. **Environment variables**: Use Docker secrets or environment variable files for sensitive data:

```bash
docker run -p 3000:3000 --env-file .env.production nextjs-feature-test
```

3. **Resource limits**: Set appropriate resource limits:

```bash
docker run -p 3000:3000 \
  --memory="512m" \
  --cpus="1.0" \
  nextjs-feature-test
```

4. **Health checks**: The container exposes port 3000. You can add a health check:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Docker Image Details

The Dockerfile uses a multi-stage build process:

1. **Dependencies stage**: Installs all npm dependencies
2. **Builder stage**: Builds the Next.js application with `npm run build`
3. **Runner stage**: Creates a minimal production image with only the necessary files

The final image:
- Uses Node.js 20 Alpine Linux for a smaller image size
- Runs as a non-root user (`nextjs`) for security
- Includes only the standalone build output and static assets
- Exposes port 3000 by default

### Troubleshooting

#### Port Already in Use

If port 3000 is already in use, change the host port:

```bash
docker run -p 8080:3000 nextjs-feature-test
```

#### Build Fails

If the build fails, ensure:
- All dependencies are listed in `package.json`
- The `package-lock.json` file is present and up to date
- You have sufficient disk space

#### Container Exits Immediately

Check the container logs:

```bash
docker logs <container-id>
```

Or if running with a name:

```bash
docker logs nextjs-feature-test
```

#### Cache Issues

To rebuild without using cache:

```bash
docker build --no-cache -t nextjs-feature-test .
```

### Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/app/guides/self-hosting)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
