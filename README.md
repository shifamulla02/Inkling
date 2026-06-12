# Inkling — PDF & Document Intelligence Platform

> A production-grade PDF processing platform built with **React + Vite**, **Java Spring Boot 3**, and **PostgreSQL**. No Docker required.

---

## Architecture

```
┌─────────────────────────────────────┐
│   React Frontend  (localhost:3000)  │
│   React + Vite + Tailwind CSS       │
│   Zustand · React Query · Framer    │
└──────────────┬──────────────────────┘
               │ HTTP (proxied via Vite)
               ▼
┌─────────────────────────────────────┐
│   Spring Boot API  (localhost:8080) │
│   Spring Security · JWT · PDFBox    │
│   Tess4J OCR · Flyway · HikariCP   │
└──────────────┬──────────────────────┘
               │ JDBC
               ▼
┌─────────────────────────────────────┐
│   PostgreSQL  (localhost:5432)      │
│   Database: inklingdb               │
└─────────────────────────────────────┘
```

---

## Prerequisites

Install these tools before running Inkling:

| Tool | Version | Download |
|---|---|---|
| Java JDK | 21+ | https://adoptium.net |
| Node.js | 20+ | https://nodejs.org |
| PostgreSQL | 15 or 16 | https://www.postgresql.org/download |
| Tesseract OCR | 4.x or 5.x | See OCR section below |

---

## Installation Guide

### 1. Install Java 21

**Windows:**
1. Go to https://adoptium.net
2. Download **Temurin 21 (LTS)** Windows installer (.msi)
3. Run the installer — check "Set JAVA_HOME variable" during install
4. Verify: open a new PowerShell and run `java -version`

**macOS:**
```bash
brew install --cask temurin@21
java -version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install temurin-21-jdk
java -version
```

---

### 2. Install Node.js 20

**Windows:**
1. Go to https://nodejs.org
2. Download the **LTS** installer
3. Run the installer
4. Verify: `node -v` and `npm -v`

**macOS:**
```bash
brew install node@20
node -v
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 3. Install PostgreSQL

**Windows:**
1. Go to https://www.postgresql.org/download/windows
2. Download the installer for PostgreSQL 16
3. Run the installer:
   - Set a password for the `postgres` user (remember this!)
   - Leave the port as **5432**
   - Leave locale as default
4. Verify: open pgAdmin (installed alongside PostgreSQL) or open a new PowerShell:
   ```powershell
   psql -U postgres -c "SELECT version();"
   ```

**macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

### 4. Install Tesseract OCR

Tesseract is required for the OCR features. If you don't need OCR, you can skip this.

**Windows:**
1. Download the installer from: https://github.com/UB-Mannheim/tesseract/wiki
2. Download **tesseract-ocr-w64-setup-5.x.x.exe**
3. Run the installer — during install, **check additional language packs** you need
4. Default install path: `C:\Program Files\Tesseract-OCR`
5. The tessdata folder will be: `C:\Program Files\Tesseract-OCR\tessdata`

**macOS:**
```bash
brew install tesseract tesseract-lang
# tessdata path: /usr/local/share/tessdata  (Intel)
# or:           /opt/homebrew/share/tessdata (Apple Silicon)
```

**Linux:**
```bash
sudo apt install tesseract-ocr tesseract-ocr-eng tesseract-ocr-fra \
                 tesseract-ocr-deu tesseract-ocr-spa
# tessdata path: /usr/share/tesseract-ocr/4.00/tessdata
```

**Update application.properties after installing:**
```properties
# Windows:
app.ocr.tesseract-data-path=C:/Program Files/Tesseract-OCR/tessdata

# macOS Intel:
app.ocr.tesseract-data-path=/usr/local/share/tessdata

# macOS Apple Silicon:
app.ocr.tesseract-data-path=/opt/homebrew/share/tessdata

# Linux:
app.ocr.tesseract-data-path=/usr/share/tesseract-ocr/4.00/tessdata
```

---

## Project Setup

### Step 1 — Clone / Extract the project

```
inkling/
├── backend/          ← Spring Boot API
├── frontend/         ← React app
├── scripts/          ← Startup scripts
└── README.md
```

### Step 2 — Create the database

Open a terminal and run:

**Windows (PowerShell):**
```powershell
psql -U postgres -f scripts/create-database.sql
```

Or manually in psql:
```sql
CREATE DATABASE inklingdb;
```

**macOS/Linux:**
```bash
psql -U postgres -f scripts/create-database.sql
```

### Step 3 — Configure the backend

Open `backend/src/main/resources/application.properties` and update:

```properties
# Match your PostgreSQL password
spring.datasource.password=your_postgres_password

# Match your Tesseract install path
app.ocr.tesseract-data-path=C:/Program Files/Tesseract-OCR/tessdata

# Storage folder (will be created automatically)
app.storage.local-path=C:/inkling-storage
app.storage.temp-path=C:/inkling-storage/temp
```

---

## Running the Application

### Option A — Using the startup scripts (easiest)

**Windows** — open two PowerShell windows:
```powershell
# Window 1 — Backend
.\scripts\start-backend.bat

# Window 2 — Frontend
.\scripts\start-frontend.bat
```

**macOS/Linux** — open two terminal windows:
```bash
# Terminal 1 — Backend
bash scripts/start-backend.sh

# Terminal 2 — Frontend
bash scripts/start-frontend.sh
```

### Option B — Manual commands

**Backend:**
```bash
cd backend

# Windows
mvnw.cmd spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install        # first time only
npm run dev
```

---

## Accessing the Application

| URL | Description |
|---|---|
| http://localhost:3000 | React frontend |
| http://localhost:8080/api/swagger-ui.html | Swagger API docs |
| http://localhost:8080/api/actuator/health | Backend health check |

**Default admin account:**
- Email: `admin@inkling.app`
- Password: `Admin@123!`

---

## PDF Features

| Feature | API Endpoint |
|---|---|
| Merge PDFs | `POST /api/pdf/merge` |
| Split PDF | `POST /api/pdf/split` |
| Compress PDF | `POST /api/pdf/compress` |
| Images to PDF | `POST /api/pdf/images-to-pdf` |
| PDF to Images | `POST /api/pdf/to-images` |
| Rotate Pages | `POST /api/pdf/rotate` |
| Text Watermark | `POST /api/pdf/watermark/text` |
| Image Watermark | `POST /api/pdf/watermark/image` |
| Protect PDF | `POST /api/pdf/protect` |
| Unlock PDF | `POST /api/pdf/unlock` |
| Extract Pages | `POST /api/pdf/extract-pages` |
| Reorder Pages | `POST /api/pdf/reorder` |
| View Metadata | `GET  /api/pdf/metadata/{token}` |
| Delete Metadata | `POST /api/pdf/metadata/delete` |

## OCR Features

| Feature | API Endpoint |
|---|---|
| Extract Text | `POST /api/ocr/extract` |
| Searchable PDF | `POST /api/ocr/searchable-pdf` |
| Export TXT | `GET  /api/ocr/{jobUuid}/export/txt` |
| Export DOCX | `GET  /api/ocr/{jobUuid}/export/docx` |

---

## Typical Workflow

```
1. Upload file  →  POST /api/files/upload
                   ← returns fileToken

2. Use tool     →  POST /api/pdf/compress
                   body: { fileToken, compressionLevel }
                   ← returns job with downloadUrl

3. Download     →  GET /api/files/download/{downloadToken}
                   ← returns processed file
```

Files are automatically deleted after 24 hours.

---

## Running Tests

**Backend:**
```bash
cd backend

# Windows
mvnw.cmd test

# macOS/Linux
./mvnw test
```

**Frontend (when test files are present):**
```bash
cd frontend
npm run test
```

---

## Project Structure

```
inkling/
├── backend/
│   ├── src/main/java/com/inkling/
│   │   ├── config/          # Security, CORS, OpenAPI, rate limiting
│   │   ├── controller/      # REST controllers (Auth, PDF, OCR, User, Admin)
│   │   ├── dto/             # Request and response DTOs
│   │   ├── entity/          # JPA entities (User, Job, OcrResult, ...)
│   │   ├── enums/           # JobType, JobStatus, RoleName
│   │   ├── exception/       # Custom exceptions + global handler
│   │   ├── repository/      # Spring Data JPA repositories
│   │   ├── security/        # JWT filter, UserDetailsService
│   │   ├── service/         # Business logic (PDF, OCR, Auth, User, Admin)
│   │   └── util/            # PdfProcessingEngine, OcrEngine, FileStorageUtil
│   ├── src/main/resources/
│   │   ├── application.properties       # Main config
│   │   ├── application-dev.properties   # Dev overrides
│   │   ├── application-prod.properties  # Prod overrides
│   │   └── db/migration/V1__initial_schema.sql
│   ├── mvnw / mvnw.cmd      # Maven wrapper
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/      # FileDropzone, ProgressBar, AppLayout, ToolPage
│   │   ├── pages/           # Landing, Auth, Dashboard, Tools, History, Admin
│   │   ├── services/        # apiClient.ts, api.ts (all API calls)
│   │   ├── store/           # Zustand authStore
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # helpers.ts, tools.ts
│   ├── .env.development     # VITE_API_BASE_URL=/api
│   ├── .env.production      # VITE_API_BASE_URL=http://localhost:8080/api
│   ├── vite.config.ts       # Vite + proxy config
│   └── package.json
│
├── scripts/
│   ├── create-database.sql  # Run once to create inklingdb
│   ├── drop-database.sql    # Reset database
│   ├── start-backend.bat    # Windows backend starter
│   ├── start-frontend.bat   # Windows frontend starter
│   ├── start-backend.sh     # macOS/Linux backend starter
│   └── start-frontend.sh    # macOS/Linux frontend starter
│
├── .env.example             # Environment variable reference
└── README.md
```

---

## Troubleshooting

**"Connection refused" on port 5432**
PostgreSQL isn't running.
- Windows: Open Services → start "postgresql-x64-16"
- macOS: `brew services start postgresql@16`
- Linux: `sudo systemctl start postgresql`

**"Database inklingdb does not exist"**
Run the setup script:
```bash
psql -U postgres -f scripts/create-database.sql
```

**"Could not find tessdata" or OCR errors**
Update the path in `application.properties`:
```properties
app.ocr.tesseract-data-path=C:/Program Files/Tesseract-OCR/tessdata
```

**Frontend can't reach backend ("ERR_NETWORK")**
Make sure the backend started successfully and is on port 8080. Check the terminal where you ran `mvnw spring-boot:run` for errors.

**Port 3000 or 8080 already in use**
```bash
# Windows — find what's using the port
netstat -ano | findstr :8080

# Change backend port in application.properties
server.port=8081

# Change frontend port in vite.config.ts
server: { port: 3001 }
```

**"mvnw is not recognized"**
Make sure you're inside the `backend/` directory, not the project root.

---

## License

MIT © Inkling Team
