# Deploy any Project on VPS in one command

- Create virtual environment

    ```sh
    python3 -m venv .venv
    ```

- Activate virtual environment

    ```sh
    source .venv/bin/activate
    ```

- Install Required Packages

    ```sh
    pip install -r requirements.txt
    ```

- Create `.env` file

    ```sh
    touch .env
    ```

- Add Environment Variables in `.env` file

    ```sh
    SSH_HOST=<server_host>
    SSH_PORT=<server_ssh_port>
    SSH_USERNAME=<server_username>
    SSH_PASSWORD=<server_username_password>
    ```

- Update project file and ssh key path in deploy.py file

    ```python
    # remote destination
    REMOTE_PROJECT_PATH = "<project_path>"
    
    # Path to custom SSH key
    SSH_KEY_PATH = "<path_to_ssh_key>"
    ```

- Run the script

    ```sh
    python3 deploy.py
    ```

# Reference Links

- [GitHub Link](https://github.com/geekyshow1/deploy_using_python)

- [YouTube Video Link](https://youtu.be/GBVQIkC3s10?si=q9AzAwGRSTRF3mEE)