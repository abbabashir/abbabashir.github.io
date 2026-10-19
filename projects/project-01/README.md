# Paychipa — Fintech & Digital Payments Platform

## Overview
High-throughput digital payments and wallet infrastructure designed for seamless financial transactions, multi-currency processing, and instant settlements.

## Technical Architecture
- **Mobile Client:** Flutter (Dart) with BLoC state management
- **Backend Services:** Spring Boot 3.x (Java 21) & Spring Security
- **Database:** PostgreSQL with read replicas & connection pooling
- **Infrastructure:** Docker, Kubernetes, Redis caching, Stripe/Paystack API gateways

## Integration & Setup
1. Clone the repository
2. Set environment variables in `.env`
3. Run `docker-compose up -d` to launch PostgreSQL and Redis
4. Start backend: `./mvnw spring-boot:run`
5. Start Flutter app: `flutter run`
