# Architecture Plan: Sidhant Bansal GitHub-Themed Portfolio

## 1. Data Mapping
- **Profile Sidebar**: 
    - Avatar: Default GitHub-style avatar or placeholder.
    - Name: Sidhant Bansal
    - Bio: Software Engineer with 4+ years of experience spanning full-stack delivery and applied data engineering. Specialized in Python simulation models and C# incident-management platforms.
    - Location: Seattle, WA
    - Contact: sidhantbansal18@outlook.com | +1 (425) 382-9156
    - Socials: LinkedIn, GitHub (placeholder)
    - Education: MS in CS (University of Washington), B.Tech in IT (GGSIPU)

- **Pinned Projects (Repo-style Cards)**:
    - Project 1: AIS Vessel Tracking Model (Python, Numba, Polars, ArcGIS) - "Optimized vessel casualty simulation runtime from 2h to 10m."
    - Project 2: SPIIS Platform (C#, ASP.NET, SQL Server, Azure DevOps) - "Statewide environmental incident response system."
    - Project 3: Dependify (Java, Spring Boot, PostgreSQL, AWS) - "Distributed microservices for centralized dependency management."
    - Project 4: MEAN Stack App (React, Node.js, MongoDB) - "Reduced API response time by 40% and increased concurrent users by 30%."

- **Contribution Graph**:
    - Mock data representing high activity over the last year (using a CSS grid of squares with varying shades of green).

- **Tech Stack (Markdown Badges)**:
    - Languages: Python, C#, JavaScript, TypeScript, SQL, Java
    - Frameworks/Cloud: React, Node.js, Express, ASP.NET, Spring Boot, AWS, Azure, Docker, ArcGIS
    - Databases/Tools: PostgreSQL, MySQL, MongoDB, SQL Server, Git, JIRA, GitHub Copilot, Numba, Polars

- **README Section (Professional Experience)**:
    - Structured as a GitHub Profile README.
    - Work history with bold headings and bullet points.

## 2. Visual Specification
- **Colors**:
    - Background: `#0d1117`
    - Surface: `#161b22`
    - Border: `#30363d`
    - Text: `#c9d1d9`
    - Text Muted: `#8b949e`
    - Accent Green: `#238636` (Buttons/Contribution)
    - Accent Blue: `#58a6ff` (Links/Badges)
- **Typography**: Inter or system-sans, mimicking GitHub's clean look.
- **Layout**: 2-column (Sidebar 25%, Main Content 75%) on desktop, single column on mobile.

## 3. Technical Stack
- **React (via CDN)**: For component-based architecture.
- **Tailwind CSS (via CDN)**: For rapid, pixel-perfect styling.
- **Lucide-React**: For GitHub-like iconography.
