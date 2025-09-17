---
title: Docker
description: Step-by-step guide for running Netsody within Docker.
pagination_prev: null
pagination_next: get-started/first-network
---

# Running Netsody within Docker

This guide explains how to run Netsody within Docker. You can either make the Netsody network available to the Docker host or to other containers.

:::info Linux-only Support
The Netsody agent requires a TUN device to process network packets at the IP level. TUN device functionality within Docker is only reliably supported on Linux hosts.
:::

## Make Netsody Network Available to Docker Host

In this approach, the Netsody agent runs inside a Docker container that is attached to the host's network stack. By using the host's network namespace, the container can create and manage a TUN interface that appears directly on the Docker host. This allows the host system to access the Netsody network.

### Step 1: Start the Docker container

Start the Netsody Docker container with the required parameters. The `--cap-add=NET_ADMIN` and `--device=/dev/net/tun` parameters are required because Netsody needs to create and configure TUN devices for IP packet processing. The `--volume netsody:/netsody` parameter ensures that the device's Netsody identity and joined networks are persisted. The `--network host` parameter allows the container to share the same network namespace as the host.

```bash
docker run --detach --name netsody \
  --cap-add=NET_ADMIN \
  --device=/dev/net/tun \
  --volume netsody:/netsody \
  --network host \
  netsody/netsody:latest \
  run
```

The `--rm` flag only removes the container when stopped. Data in the `netsody` named volume (such as identity and joined networks) remains persisted.

### Step 2: Add Device to Network

Retrieve the public key so you can add this device to your network configuration. If you have not yet created a network, see the [first network setup guide](https://docs.netsody.io/get-started/first-network) for instructions. The public key is displayed in the container logs when starting:

```bash
docker logs netsody
```

Alternatively, you can query it from the running container:

```bash
docker exec -ti netsody netsody status
```

Then add the device to your network configuration:

```bash
docker exec -ti netsody netsody add https://example.com/my-network.toml
```

The device should now join the network and create a corresponding network interface. You can monitor this process using the `netsody status` command. Once the node has joined the network, you can access the Netsody network from the Docker host.

### Docker Compose

If you prefer to use Docker Compose, you can find an example below that you can adapt to your preferences:

```yaml title="docker-compose.yml"
version: '3.8'
services:
  netsody:
    image: netsody/netsody:latest
    container_name: netsody
    command: run
    volumes:
      - netsody:/netsody
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    network_mode: host
    restart: unless-stopped
volumes:
  netsody:
      name: netsody
```

## Share Netsody Network to Other Docker Containers

In this approach, the Netsody agent runs inside a Docker container with its own dedicated network namespace. Other containers can join this namespace to access the Netsody network directly.

### Step 1: Start the Docker container

Start the Netsody Docker container with the required parameters. The `--cap-add=NET_ADMIN` and `--device=/dev/net/tun` parameters are required because Netsody needs to create and configure TUN devices for IP packet processing. The `--volume netsody:/netsody` parameter ensures that the device's Netsody identity and joined networks are persisted.

```bash
docker run --detach --name netsody \
  --cap-add=NET_ADMIN \
  --device=/dev/net/tun \
  --volume netsody:/netsody \
  netsody/netsody:latest \
  run
```

### Step 2: Add Device to Network

Retrieve the public key so you can add this device to your network configuration. If you have not yet created a network, see the [first network setup guide](https://docs.netsody.io/get-started/first-network) for instructions. The public key is displayed in the container logs when starting:

```bash
docker logs netsody
```

Alternatively, you can query it from the running container:

```bash
docker exec -ti netsody netsody status
```

Then add the device to your network configuration:

```bash
docker exec -ti netsody netsody add https://example.com/my-network.toml
```

The device should now join the network and create a corresponding network interface. You can monitor this process using the `netsody status` command. Once the node has joined the network, you can create additional containers that share the same network namespace. For example, to run an nginx web server:

```bash
docker run --rm --name nginx \
  --network container:netsody \
  nginx:latest
```

With this setup, other Netsody devices can reach the nginx service running in the sidecar container through the Netsody network.

### Docker Compose

```yaml title="docker-compose.yml"
version: '3.8'
services:
  netsody:
    image: netsody/netsody:latest
    container_name: netsody
    command: run
    volumes:
      - netsody:/netsody
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    restart: unless-stopped

  nginx:
    image: nginx:latest
    container_name: nginx-sidecar
    network_mode: service:netsody
    depends_on:
      - netsody
    restart: unless-stopped

volumes:
  netsody:
    name: netsody
```

