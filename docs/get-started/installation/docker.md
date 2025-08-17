---
title: Docker
description: Step-by-step guide for running drasyl within Docker.
pagination_prev: null
pagination_next: get-started/first-network
---

# Running drasyl within Docker

This guide explains how to run drasyl within Docker. You can either make the drasyl network available to the Docker host or to other containers.

:::info Linux-only Support
The drasyl agent requires a TUN device to process network packets at the IP level. TUN device functionality within Docker is only reliably supported on Linux hosts.
:::

## Make drasyl Network Available to Docker Host

In this approach, the drasyl agent runs inside a Docker container that is attached to the host's network stack. By using the host's network namespace, the container can create and manage a TUN interface that appears directly on the Docker host. This allows the host system to access the drasyl network.

### Step 1: Start the Docker container

Start the drasyl Docker container with the required parameters. The `--cap-add=NET_ADMIN` and `--device=/dev/net/tun` parameters are required because drasyl needs to create and configure TUN devices for IP packet processing. The `--volume drasyl:/drasyl` parameter ensures that the device's drasyl identity and joined networks are persisted. The `--network host` parameter allows the container to share the same network namespace as the host.

```bash
docker run --detach --name drasyl \
  --cap-add=NET_ADMIN \
  --device=/dev/net/tun \
  --volume drasyl:/drasyl \
  --network host \
  drasyl/drasyl:latest \
  run
```

The `--rm` flag only removes the container when stopped. Data in the `drasyl` named volume (such as identity and joined networks) remains persisted.

### Step 2: Add Device to Network

Retrieve the public key so you can add this device to your network configuration. If you have not yet created a network, see the [first network setup guide](https://docs.drasyl.org/get-started/first-network) for instructions. The public key is displayed in the container logs when starting:

```bash
docker logs drasyl
```

Alternatively, you can query it from the running container:

```bash
docker exec -ti drasyl drasyl status
```

Then add the device to your network configuration:

```bash
docker exec -ti drasyl drasyl add https://example.com/my-network.toml
```

The device should now join the network and create a corresponding network interface. You can monitor this process using the `drasyl status` command. Once the node has joined the network, you can access the drasyl network from the Docker host.

### Docker Compose

If you prefer to use Docker Compose, you can find an example below that you can adapt to your preferences:

```yaml title="docker-compose.yml"
version: '3.8'
services:
  drasyl:
    image: drasyl/drasyl:latest
    container_name: drasyl
    command: run
    volumes:
      - drasyl:/drasyl
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    network_mode: host
    restart: unless-stopped
volumes:
  drasyl:
      name: drasyl
```

## Share drasyl Network to Other Docker Containers

In this approach, the drasyl agent runs inside a Docker container with its own dedicated network namespace. Other containers can join this namespace to access the drasyl network directly.

### Step 1: Start the Docker container

Start the drasyl Docker container with the required parameters. The `--cap-add=NET_ADMIN` and `--device=/dev/net/tun` parameters are required because drasyl needs to create and configure TUN devices for IP packet processing. The `--volume drasyl:/drasyl` parameter ensures that the device's drasyl identity and joined networks are persisted.

```bash
docker run --detach --name drasyl \
  --cap-add=NET_ADMIN \
  --device=/dev/net/tun \
  --volume drasyl:/drasyl \
  drasyl/drasyl:latest \
  run
```

### Step 2: Add Device to Network

Retrieve the public key so you can add this device to your network configuration. If you have not yet created a network, see the [first network setup guide](https://docs.drasyl.org/get-started/first-network) for instructions. The public key is displayed in the container logs when starting:

```bash
docker logs drasyl
```

Alternatively, you can query it from the running container:

```bash
docker exec -ti drasyl drasyl status
```

Then add the device to your network configuration:

```bash
docker exec -ti drasyl drasyl add https://example.com/my-network.toml
```

The device should now join the network and create a corresponding network interface. You can monitor this process using the `drasyl status` command. Once the node has joined the network, you can create additional containers that share the same network namespace. For example, to run an nginx web server:

```bash
docker run --rm --name nginx \
  --network container:drasyl \
  nginx:latest
```

With this setup, other drasyl devices can reach the nginx service running in the sidecar container through the drasyl network.

### Docker Compose

```yaml title="docker-compose.yml"
version: '3.8'
services:
  drasyl:
    image: drasyl/drasyl:latest
    container_name: drasyl
    command: run
    volumes:
      - drasyl:/drasyl
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    restart: unless-stopped

  nginx:
    image: nginx:latest
    container_name: nginx-sidecar
    network_mode: service:drasyl
    depends_on:
      - drasyl
    restart: unless-stopped

volumes:
  drasyl:
    name: drasyl
```

