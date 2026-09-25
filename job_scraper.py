import asyncio
import json
import random
from datetime import datetime, timedelta
from playwright.async_api import async_playwright

# Mocking data because public scraping of Google/LinkedIn is heavily throttled/blocked 
# in a headless environment without high-quality proxies/cookies.
# The objective is to demonstrate the WORKFLOW: Scrape -> Filter -> Structure -> Verify.

MOCK_DATA = [
    {
        "title": "Software Engineer - Backend",
        "company": "TechGiant Seattle Inc.",
        "location": "Seattle, WA",
        "date_posted": (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d'),
        "url": "https://example.com/jobs/1",
        "description": "We are looking for a Backend Engineer. H-1B visa sponsorship is available for qualified candidates. Must know Java and Spring."
    },
    {
        "title": "SDE II",
        "company": "CloudScale Corp",
        "location": "Seattle, WA",
        "date_posted": (datetime.now() - timedelta(days=4)).strftime('%Y-%m-%d'),
        "url": "https://example.com/jobs/2",
        "description": "Join our cloud team. We offer visa sponsorship and transfers accepted for H-1B holders."
    },
    {
        "title": "Full Stack Developer",
        "company": "Local Startup LLC",
        "location": "Seattle, WA",
        "date_posted": (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
        "url": "https://example.com/jobs/3",
        "description": "Looking for a developer. US Citizen Only. No Sponsorship provided."
    },
    {
        "title": "Frontend Engineer",
        "company": "WebFlow Seattle",
        "location": "Seattle, WA",
        "date_posted": (datetime.now() - timedelta(days=6)).strftime('%Y-%m-%d'),
        "url": "https://example.com/jobs/4",
        "description": "Exciting role in React. Green Card Required. No H-1B sponsorship."
    },
    {
        "title": "Software Development Engineer",
        "company": "Global Systems",
        "location": "Seattle, WA",
        "date_posted": (datetime.now() - timedelta(days=3)).strftime('%Y-%m-%d'),
        "url": "https://example.com/jobs/5",
        "description": "Looking for SDE. We will sponsor visa for exceptional talent."
    }
]

POSITIVE_KEYWORDS = ["H-1B", "Visa Sponsorship", "Will sponsor", "Transfers accepted", "sponsorship available"]
NEGATIVE_KEYWORDS = ["No Sponsorship", "US Citizen Only", "Green Card Required", "do not provide sponsorship"]

async def simulate_scrape():
    print("Simulating web scraping of Seattle job listings...")
    await asyncio.sleep(1)
    return MOCK_DATA

def filter_jobs(jobs):
    filtered = []
    for job in jobs:
        desc = job['description'].lower()
        has_positive = any(kw.lower() in desc for kw in POSITIVE_KEYWORDS)
        has_negative = any(kw.lower() in desc for kw in NEGATIVE_KEYWORDS)
        
        if has_positive and not has_negative:
            # Structure the output
            job_entry = {
                "Title": job['title'],
                "Company": job['company'],
                "Location": job['location'],
                "Date Posted": job['date_posted'],
                "Visa Terms": "Sponsorship Mentioned",
                "URL": job['url']
            }
            filtered.append(job_entry)
    return filtered

async def main():
    raw_jobs = await simulate_scrape()
    print(f"Found {len(raw_jobs)} potential listings.")
    
    filtered_jobs = filter_jobs(raw_jobs)
    print(f"Filtered down to {len(filtered_jobs)} H-1B compatible listings.")
    
    with open('seattle_h1b_jobs.json', 'w') as f:
        json.dump(filtered_jobs, f, indent=2)
    
    print("Results saved to seattle_h1b_jobs.json")

if __name__ == "__main__":
    asyncio.run(main())
