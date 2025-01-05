import paramiko
from decouple import config
import time

# Server details
HOST = config('SSH_HOST')
PORT = config('SSH_PORT', cast=int)
USERNAME = config('SSH_USERNAME')
PASSWORD = config('SSH_PASSWORD')

# remote destination
REMOTE_PROJECT_PATH = "/home/try-nginx/project"

# Path to custom SSH key
SSH_KEY_PATH = "/home/try-nginx/.ssh/id_ed25519"


# For Clone from github using below command
# f"GIT_SSH_COMMAND='ssh -i {SSH_KEY_PATH}' git clone REPO_URL",


NON_INTERACTIVE_COMMANDS = [
    f"cd {REMOTE_PROJECT_PATH} && ls -la",
    f"cd {REMOTE_PROJECT_PATH} && GIT_SSH_COMMAND='ssh -i {SSH_KEY_PATH}' git pull",
    f"cd {REMOTE_PROJECT_PATH} && ls -la",
    f"cd {REMOTE_PROJECT_PATH} && npm install",
]

INTERACTIVE_COMMANDS = [
    "sudo service nginx restart",
]


def create_ssh_client(host, port, username, password):
    """
    Purpose: Create an SSH client and connect to the server.
    """
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {host}...")
    ssh_client.connect(hostname=host, port=port,
                       username=username, password=password)
    print("Connected successfully.")
    return ssh_client


def execute_non_interactive_commands(ssh_client, commands):
    """
    Purpose: Execute non-interactive commands.
    """
    for command in commands:
        try:
            print(f"Executing non-interactive command: {command}")
            stdin, stdout, stderr = ssh_client.exec_command(command)
            output = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')

            if output:
                print(output)
            if error:
                print(f"Error: {error}")

        except Exception as e:
            print(f"Failed to execute command '{command}': {e}")
            raise


def execute_interactive_commands(ssh_client, commands, sudo_password):
    """
    Purpose: Execute interactive commands using invoke_shell (e.g., sudo).
    """
    try:
        print("Opening interactive shell session...")
        shell = ssh_client.invoke_shell()

        for command in commands:
            print(f"Executing interactive command: {command}")
            shell.send(command + "\n")
            time.sleep(1)  # Give the server time to process the command

            output = ""
            while shell.recv_ready():
                output += shell.recv(2048).decode('utf-8')

            # Handle sudo password prompt
            if "password for" in output.lower():
                print("Providing sudo password...")
                shell.send(sudo_password + "\n")
                time.sleep(1)
                output = ""
                while shell.recv_ready():
                    output += shell.recv(2048).decode('utf-8')

            print(output)

            if "error" in output.lower():
                print(f"Command '{command}' failed.")
            else:
                print(f"Command '{command}' executed successfully.")
    except Exception as e:
        print(f"Failed to execute interactive command '{command}': {e}")
        raise


def main():
    """
    Purpose: Main function to handle the entire process.
    """
    ssh_client = None
    try:
        # Connect to the server
        ssh_client = create_ssh_client(HOST, PORT, USERNAME, PASSWORD)

        # Execute non-interactive commands
        execute_non_interactive_commands(ssh_client, NON_INTERACTIVE_COMMANDS)

        # Execute interactive commands
        execute_interactive_commands(
            ssh_client, INTERACTIVE_COMMANDS, PASSWORD)

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if ssh_client:
            ssh_client.close()
            print("Connection closed.")


if __name__ == "__main__":
    main()