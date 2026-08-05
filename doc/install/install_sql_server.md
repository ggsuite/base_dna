<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Install SQL Server

Make sure [docker is installed](./install_docker_ubuntu.md)

Pull, install and start the MSSQL docker image:

```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password123!" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2022-latest
```

Check if it is running:

```bash
sudo docker ps | grep mssql
```
