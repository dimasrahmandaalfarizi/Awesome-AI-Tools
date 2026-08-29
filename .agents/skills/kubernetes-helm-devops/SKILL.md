---
name: Kubernetes & Helm Cloud-Native Operator
description: Production Kubernetes deployment manifests, Helm charts, Horizontal Pod Autoscaling (HPA), Ingress-NGINX, and zero-downtime rolling updates.
frameworks: [Kubernetes, Helm, DevOps, Docker]
---

# Kubernetes Cloud-Native Deployment Guide
1. Always specify resource requests and limits on all containers.
2. Configure readinessProbe and livenessProbe with graceful shutdown periods.
3. Use Helm value templates for environment-specific configs (dev/stage/prod).
4. Implement Horizontal Pod Autoscaling based on CPU and custom metrics.
