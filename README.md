# Pterodactyl Send Command Action

A GitHub Action that sends commands to a Pterodactyl game server panel container via the Pterodactyl API.

## Features

-   Send any command to your Pterodactyl server
-   Supports authentication via bearer token
-   Provides detailed error messages for debugging
-   Works with any Pterodactyl panel instance

## Usage

### Basic Example

```yaml
name: Send Server Command

on:
    workflow_dispatch:
        inputs:
            command:
                description: 'Command to send'
                required: true
                default: 'say Hello from GitHub Actions!'

jobs:
    send-command:
        runs-on: ubuntu-latest
        steps:
            - name: Send command to Pterodactyl server
              uses: supercrafter100/Pterodactyl-Send-Command@v1
              with:
                  PTE_PANEL_URL: 'https://panel.example.com'
                  PTE_BEARER_TOKEN: ${{ secrets.PTERODACTYL_TOKEN }}
                  PTE_PANEL_ID: 'abc12345'
                  PTE_COMMAND: ${{ github.event.inputs.command }}
```

### Schedule Server Restart

```yaml
name: Scheduled Server Restart

on:
    schedule:
        - cron: '0 4 * * *' # Run at 4 AM UTC daily

jobs:
    restart-server:
        runs-on: ubuntu-latest
        steps:
            - name: Restart Pterodactyl server
              uses: supercrafter100/Pterodactyl-Send-Command@v1
              with:
                  PTE_PANEL_URL: ${{ secrets.PANEL_URL }}
                  PTE_BEARER_TOKEN: ${{ secrets.PTERODACTYL_TOKEN }}
                  PTE_PANEL_ID: ${{ secrets.SERVER_ID }}
                  PTE_COMMAND: 'restart'
```

### Send Multiple Commands

```yaml
name: Server Maintenance

on:
    workflow_dispatch:

jobs:
    maintenance:
        runs-on: ubuntu-latest
        steps:
            - name: Announce maintenance
              uses: supercrafter100/Pterodactyl-Send-Command@v1
              with:
                  PTE_PANEL_URL: ${{ secrets.PANEL_URL }}
                  PTE_BEARER_TOKEN: ${{ secrets.PTERODACTYL_TOKEN }}
                  PTE_PANEL_ID: ${{ secrets.SERVER_ID }}
                  PTE_COMMAND: 'say Server maintenance starting in 5 minutes'

            - name: Wait 5 minutes
              run: sleep 300

            - name: Save world
              uses: supercrafter100/Pterodactyl-Send-Command@v1
              with:
                  PTE_PANEL_URL: ${{ secrets.PANEL_URL }}
                  PTE_BEARER_TOKEN: ${{ secrets.PTERODACTYL_TOKEN }}
                  PTE_PANEL_ID: ${{ secrets.SERVER_ID }}
                  PTE_COMMAND: 'save-all'
```

## Inputs

| Input              | Description                                                           | Required |
| ------------------ | --------------------------------------------------------------------- | -------- |
| `PTE_PANEL_URL`    | The URL of your Pterodactyl panel (e.g., `https://panel.example.com`) | Yes      |
| `PTE_BEARER_TOKEN` | The API bearer token for authentication                               | Yes      |
| `PTE_PANEL_ID`     | The server identifier/UUID from your panel                            | Yes      |
| `PTE_COMMAND`      | The command to send to the server                                     | Yes      |

## Getting Your Credentials

### Finding Your Panel URL

Your panel URL is the base URL you use to access your Pterodactyl panel (e.g., `https://panel.example.com`).

### Getting Your Bearer Token

1. Log in to your Pterodactyl panel
2. Navigate to your Account Settings
3. Go to the API Credentials section
4. Create a new API key with appropriate permissions
5. Copy the generated token and save it as a GitHub secret

### Finding Your Server ID

1. Go to your server in the Pterodactyl panel
2. The server ID is visible in the URL: `https://panel.example.com/server/{SERVER_ID}`
3. Alternatively, you can find it in the server settings

## Security

⚠️ **Important**: Never commit your bearer token or other sensitive credentials to your repository. Always use GitHub Secrets to store sensitive information.

To add secrets to your repository:

1. Go to your repository Settings
2. Navigate to Secrets and variables → Actions
3. Click "New repository secret"
4. Add your `PTERODACTYL_TOKEN`, `PANEL_URL`, and `SERVER_ID`

## Error Handling

The action will fail and provide detailed error messages if:

-   The panel URL is invalid
-   Authentication fails (invalid token)
-   The server ID is incorrect
-   The API request fails for any reason

Check the action logs for specific error details.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Supercrafter100](https://github.com/supercrafter100)
