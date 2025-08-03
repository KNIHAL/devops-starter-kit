# DevOps Starter Kit - Full Stack Site on AWS ECS Fargate

This repository contains a full stack web application deployed on AWS ECS Fargate using Docker containers. The backend and frontend images are pre-built and pushed to Docker Hub.

---

## Project Overview

- **Backend:** Python Flask app (or your backend tech) running on port 5000.
- **Frontend:** Static site served on port 80.
- Both services run as AWS ECS Fargate tasks in a single ECS cluster.
- AWS CloudWatch Logs are configured for backend logs.
- Networking uses `awsvpc` mode with public subnets and security groups allowing HTTP (80) and backend port (5000).

---

## Architecture Diagram

[User] <---> [AWS ALB or Public IP] <---> [ECS Fargate Tasks: Frontend & Backend]


---

## Prerequisites

- AWS Account with proper IAM permissions.
- Docker images pushed to Docker Hub under `kumarnihal/devops-starter-kit-frontend` and `kumarnihal/devops-starter-kit-backend`.
- AWS CLI configured locally with access keys.
- Existing ECS cluster, task definitions, and services created for backend and frontend.

---

