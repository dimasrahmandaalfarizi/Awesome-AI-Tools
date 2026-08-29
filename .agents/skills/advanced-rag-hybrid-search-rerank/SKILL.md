---
name: Advanced RAG: Chunking, Hybrid Search & Cohere Rerank
description: Enterprise Retrieval-Augmented Generation using semantic chunking, BM25 + dense hybrid search, cross-encoder reranking, and contextual compression.
frameworks: [RAG, Python, TypeScript, Vector Database]
---

# Advanced RAG Architecture Guide
1. Use Semantic Chunking or Document Hierarchy chunking rather than naive fixed token splits.
2. Combine BM25 keyword search with dense vector similarity using Reciprocal Rank Fusion (RRF).
3. Pass top 25 retrieved candidates through Cohere Rerank (cross-encoder) to select top 5.
4. Inject contextual document summaries directly into chunk headers for higher retrieval accuracy.
