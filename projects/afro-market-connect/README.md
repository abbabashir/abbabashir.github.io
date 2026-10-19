# Afro Market Connect — Cross-Border Commerce & Digital Trade Platform

## Overview
A comprehensive digital marketplace and commerce engine engineered to connect African agricultural producers, artisans, and merchants with regional and global buyers. Features multi-currency escrow settlement, real-time inventory management, localized logistics tracking, and mobile-first accessibility.

- **Live Production Platform:** [https://afro-market.netlify.app/](https://afro-market.netlify.app/)

## Technical Architecture
- **Client Applications:** React (Next.js) Web Portal & Flutter Mobile Application
- **Backend Services:** Spring Boot 3.x (Java 21) Microservices & Spring Security
- **Data Layer:** PostgreSQL (Transactional Store) with Redis Cache & ElasticSearch for catalog discovery
- **Infrastructure:** Docker, Kubernetes, Stripe / Paystack Gateway Integrations, Celery / RabbitMQ background queues

## Key Features
- **Escrow-Protected Settlements:** High-concurrency wallet ledger with dispute-mitigation escrow.
- **Cross-Border Order Routing:** Automated currency conversion and localized freight cost estimation.
- **Offline Sync for Rural Markets:** Progressive mobile caching for low-connectivity environments.
- **Vendor Analytics Dashboard:** Real-time stock turnover, profit margin analytics, and fulfillment status.

## Getting Started
1. Clone the repository
2. Configure `.env` with payment gateway credentials and database connections
3. Start dependencies: `docker-compose up -d`
4. Run backend microservices: `./mvnw spring-boot:run`
5. Run web client: `npm run dev`
