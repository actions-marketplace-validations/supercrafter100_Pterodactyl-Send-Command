import core from '@actions/core';

const token = core.getInput('PTE_BEARER_TOKEN', { required: true });
const panelUrl = core.getInput('PTE_PANEL_URL', { required: true });
const containerId = core.getInput('PTE_PANEL_ID', { required: true });
const command = core.getInput('PTE_COMMAND', { required: true });

let url;

try {
    url = new URL(`${panelUrl}/api/client/servers/${containerId}/command`);
} catch (e) {
    core.setFailed(`The provided panel URL is not a valid URL: ${panelUrl}`);
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};

const body = {
    command: command,
};

core.info(
    `Sending command "${command}" to container with ID ${containerId} on panel ${panelUrl}`
);
fetch(url.toString(), {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
})
    .then(async (response) => {
        if (!response.ok) {
            const text = await response.text();
            core.setFailed(
                `Failed to send command. Status: ${response.status} - ${response.statusText}. Response: ${text}`
            );
            return;
        }

        core.info(
            `Successfully sent command to container with ID ${containerId}`
        );
    })
    .catch((error) => {
        core.setFailed(
            `An error occurred while sending the command: ${error.message}`
        );
    });
