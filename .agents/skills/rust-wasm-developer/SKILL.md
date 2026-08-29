---
name: Rust WebAssembly (Wasm) Browser Engineer
description: High-performance in-browser computation using Rust compiled to WebAssembly (Wasm), wasm-bindgen, Web Workers, and SIMD optimizations.
frameworks: [Rust, WebAssembly, TypeScript, Performance]
---

# Rust Wasm High-Performance Guide
1. Use wasm-bindgen to export type-safe functions to JavaScript.
2. Minimize serialization overhead by sharing ArrayBuffer and SharedArrayBuffer memory.
3. Run heavy computational loops inside Web Workers to avoid freezing the UI thread.
4. Enable LTO (Link-Time Optimization) and wasm-opt for minimal binary sizes.
