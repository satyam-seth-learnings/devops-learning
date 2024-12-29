# Setup SSH Config for Multiple Users

- [Setup ssh key based authentication](https://github.com/satyam-seth-learnings/devops-learning/blob/main/2.setup-ssh-key-based-authentication.md)

### To Ease the Remote Server Login from Window Machine

- Create `config` on path C:\Users\<YourUser>\\.ssh and Write below credentials then save it

    - Syntax:-
    
        ```sh
        Host <ANY_NAME>
            HostName <SERVER_IP> or <SERVER_DOMAIN>
            User <SERVER_USERNAME>
            Port <SERVER_PORT>
            IdentityFile ~/.ssh/<YOUR_PVT_SSH_KEY_NAME>
            IdentitiesOnly yes
        ```

    - Example:-
    
        ```sh
        Host try-nginx
            HostName 172.30.93.186
            User try-nginx
            Port 1037
            IdentityFile ~/.ssh/try_nginx_ed25519
            IdentitiesOnly yes
        ```

- You can add as many as Host you need. This way you can manage multiple users and their respective ssh keys.

- Now you can use Host to login into Remote Server via cmd or terminal

    Syntax:- 
    
        ```sh
        ssh <HOST>
        ```

    Example:-

        ```sh
        ssh <try-nginx>
        ```

### To Ease the Github Clone Pull from Remote Server Linux Machine

- Open CMD or Terminal

- To Get Access to Remote Server via SSH

    - Syntax:- 
    
        ```sh
        ssh -p PORT <USERNAME@HOSTIP>
        ```
    
    - Example:-

        ```sh
        ssh -p 22 try-nginx@172.30.93.186
        ```

    OR

    - Syntax:- 
    
        ```sh
        ssh <HOST>
        ```
    
    - Example:-

        ```sh
        ssh try-nginx
        ```
    
- Create config file

    ```sh
    touch ~/.ssh/config
    ```

- Edit config using nano

    ```sh
    nano ~/.ssh/config
    ```

- Write below credentials then save it

    - Syntax:- 

        ```sh
        Host <ANY_NAME>
            HostName <GITHUB_IP> or <GITHUB_DOMAIN>
            User <GITHUB_USERNAME>
            IdentityFile ~/.ssh/<YOUR_PVT_SSH_KEY_NAME>
            IdentitiesOnly yes
        ```

    - Example:-

        ```sh
        Host react_project
            HostName github.com
            User satyam-seth
            IdentityFile ~/.ssh/react_ed25519
            IdentitiesOnly yes
        ```


- You can add as many as Host you need. This way you can manage multiple github repo and their respective ssh keys.

- Now you can use git command as follow

    - Verify Connection

        - Syntax:-

            ```sh
            ssh -T git@<HOST>
            ```

        - Example:-

            ```sh
            ssh -T git@react_project
            ```

    - Clone Git Repo

        - Syntax:-

            ```sh
            git clone git@<HOST>:<GITHUB_USERNAME>/<REPO_NAME>
            ```

        - Example:-

            ```sh
            git clone git@react_project:satyam-seth-learnings/deploy-mern-project-with-apache-web-server-deploy.git
            ```

    - Git Pull will work as normal
            
        ```sh
        git pull
        ```

# Reference Links 

- [YouTube Video Link](https://youtu.be/c04MZDyXGbI?si=ly6E_O2VNoIY7HLC)

- [Github Link](https://github.com/geekyshow1/GeekyShowsNotes/blob/main/SSH_Config_File.md)
