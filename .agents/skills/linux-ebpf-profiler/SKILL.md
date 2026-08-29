---
name: Linux eBPF Performance Profiler & Kernel Observability
description: Low-overhead Linux kernel observability, CPU profiling, memory leak detection, and network latency tracing using eBPF and BCC tools.
frameworks: [Linux, eBPF, C, Performance]
---

# Linux eBPF Performance Profiling Protocol
1. Use bpftrace and BCC tools to attach to kernel kprobes and tracepoints with near-zero overhead.
2. Profile on-CPU and off-CPU latency bottlenecks using flame graphs.
3. Monitor TCP socket retransmissions and dropped packets at the kernel interface.
4. Inspect system call frequency and memory page faults per container process.
