# 🌦️ Weather Dashboard Application

A containerized weather dashboard built with **React.js**, **FastAPI**, and the **OpenWeatherMap API**. Docker Compose runs the frontend and backend as separate services, with Nginx serving the React production build and forwarding API requests to FastAPI.

## ✨ Features

- Search for current weather by city name
- Display temperature in Celsius, weather description, humidity, and wind speed
- React-based frontend
- FastAPI REST API backend
- OpenWeatherMap integration
- Dockerized frontend and backend
- Docker Compose orchestration
- Nginx reverse proxy for `/api/` requests
- Backend health check and frontend startup dependency
- Non-root containers and basic container hardening

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, JavaScript, CSS |
| Web server / reverse proxy | Nginx (unprivileged image) |
| Backend | Python 3.12, FastAPI, Uvicorn |
| Weather data | OpenWeatherMap API |
| Containers | Docker |
| Orchestration | Docker Compose |

## 🏗️ Architecture

```text
Browser
   |
   | http://localhost:3000
   v
Frontend container (Nginx :8080)
   |                     |
   | React static files  | /api/*
   v                     v
React application    Backend service (FastAPI :8000)
                           |
                           | HTTPS request
                           v
                    OpenWeatherMap API
```

The browser accesses the application through port `3000` on the host. Nginx serves the React application and proxies requests beginning with `/api/` to the Compose service named `backend`. The backend retrieves weather data from OpenWeatherMap and returns it to the frontend.

## 📁 Project Structure

```text
Weather_Dashboard_Application/
├── backend/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   └── src/
├── .gitignore
├── compose.yaml
└── README.md
```

## ✅ Prerequisites

For the Docker-based setup, install:

- Ubuntu Linux (including Ubuntu on WSL 2)
- Docker Engine
- Docker Compose plugin (`docker compose`)
- An OpenWeatherMap API key

> You do not need to install Python, Node.js, or the project dependencies directly on Ubuntu when running the application with Docker.

### Check Docker installation

```bash
docker --version
docker compose version
```

If either command is unavailable, install Docker Engine and the Compose plugin by following the official [Docker Engine on Ubuntu installation guide](https://docs.docker.com/engine/install/ubuntu/).

On Ubuntu, your user may need permission to access Docker. If `docker` returns a permission error, either run Docker commands with `sudo` or follow Docker's [Linux post-installation instructions](https://docs.docker.com/engine/install/linux-postinstall/) to configure non-root access. Re-open your terminal after changing group membership.

## 🔑 Configure the OpenWeatherMap API key

1. Create or sign in to an account at [OpenWeatherMap](https://openweathermap.org/api).
2. Generate an API key.
3. From the project root (the folder containing `compose.yaml`), create a `.env` file:

```bash
nano .env
```

Add your key:

```env
OPENWEATHER_API_KEY=your_actual_openweathermap_api_key
```

Save the file. Do not commit `.env` or share your API key publicly.

The Compose configuration requires `OPENWEATHER_API_KEY` to be set. The backend receives it as an environment variable.

## 🚀 Run with Docker Compose

Run all commands from the **project root directory**, where `compose.yaml` is located.

### 1. Clone the repository

```bash
git clone https://github.com/sanskarr10/Weather_Dashboard_Application.git
cd Weather_Dashboard_Application
```

If you already have the project locally, simply `cd` into its root directory.

### 2. Create the environment file

Complete the API-key instructions above and confirm `.env` exists:

```bash
ls -la
```

### 3. Build and start the containers

```bash
docker compose up --build -d
```

This command builds the frontend and backend images, creates the Compose network, and starts both services in the background. The frontend waits for the backend health check to pass.

### 4. Check container status

```bash
docker compose ps
```

### 5. Open the application

Visit:

**http://localhost:3000**

When using Ubuntu in WSL 2, open the same address in your Windows browser.

## 🧪 API usage

The backend exposes the weather endpoint:

```http
GET /weather?city=Mumbai
```

When using the running Compose application, send the request through the frontend Nginx reverse proxy:

```text
http://localhost:3000/api/weather?city=Mumbai
```

Nginx forwards `/api/weather?city=Mumbai` to the backend as `/weather?city=Mumbai`.

The backend's internal container port is `8000`. It is not published directly to the host by the current `compose.yaml`; browser/API access is routed through the frontend on port `3000`.

## 🐳 Useful Docker Compose commands

| Task | Command |
|---|---|
| Start services | `docker compose up -d` |
| Build and start | `docker compose up --build -d` |
| Stop services | `docker compose down` |
| Stop and remove containers and network | `docker compose down` |
| View running containers | `docker compose ps` |
| View all service logs | `docker compose logs` |
| Follow logs live | `docker compose logs -f` |
| Backend logs only | `docker compose logs -f backend` |
| Frontend logs only | `docker compose logs -f frontend` |
| Restart services | `docker compose restart` |
| Rebuild after code changes | `docker compose up --build -d` |

To stop the application:

```bash
docker compose down
```

To stop it and remove the Compose-created network as well:

```bash
docker compose down
```

The named images are not automatically deleted by this command.

## 🔍 Troubleshooting

### `OPENWEATHER_API_KEY` is not set

Make sure `.env` is in the same directory as `compose.yaml` and contains:

```env
OPENWEATHER_API_KEY=your_actual_api_key
```

Then recreate the services:

```bash
docker compose up --build -d
```

### Frontend opens, but weather data does not load

Check both services:

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
```

Confirm that the API key is valid and active. Check that the frontend calls the `/api` path so Nginx can proxy the request to the backend.

### Backend is unhealthy

Inspect backend logs:

```bash
docker compose logs backend
```

The configured backend health check requests `http://localhost:8000/` inside the backend container. Confirm that the FastAPI application starts successfully and responds at `/`.

### Port 3000 is already in use

Stop the other application using port `3000`, or change the host-side port mapping in `compose.yaml`. For example, change:

```yaml
ports:
  - "3000:8080"
```

to:

```yaml
ports:
  - "3001:8080"
```

Then run:

```bash
docker compose up --build -d
```

Open `http://localhost:3001`.

### Rebuild after changing source code

The frontend is built into a production bundle inside its Docker image. Rebuild the images after source or Dockerfile changes:

```bash
docker compose up --build -d
```

## 🔐 Security notes

- Keep API keys in `.env`; never hardcode them in source code.
- Do not commit `.env` to Git.
- The backend container runs as a non-root user.
- The backend service uses a read-only filesystem and `no-new-privileges`.
- The frontend uses an unprivileged Nginx image.
- Before production deployment, configure HTTPS, review allowed origins, and apply appropriate rate limiting and secret management.

## 🛣️ Future Improvements

- Five-day weather forecast
- Weather icons and improved visualizations
- Dark mode
- Search history
- Geolocation support
- Celsius/Fahrenheit toggle
- Automated tests and CI/CD pipeline

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## 📄 License

Add the license that applies to this project. If no license file is present, all rights remain with the copyright holder by default.

## 👨‍💻 Author

**GitHub:** [@sanskarr10](https://github.com/sanskarr10)

---

If you find this project useful, consider giving the repository a ⭐.

