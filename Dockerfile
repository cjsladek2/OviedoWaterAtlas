FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    cmake \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN cmake -S DSAProject2 -B build -DCMAKE_BUILD_TYPE=Release && \
cmake --build build --config Release

CMD ["./build/OWA_DSA"]
