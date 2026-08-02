# VisionCheck
### <ins> Problem Statement & Motivation:- </ins>
According to a recent report, an average Indian spends more than 3 hours of their day using smartphones and desktops. An increasing amount of time spent on screens is a problem for our eyes, which are sensitive organs. So, the primary motivation of the system is to provide a suite of preliminary tests to users, who can check & rate their vision through this and get some personalized feedback. 

### <ins> Features of the system :- </ins>
This vision check system provides 4 preliminary optometric tests to users for checking their vision and rates their vision to generate corresponding feedback with the scores they get. The four optometric tests included in this are:- 

```Snellen Chart Test```: This test helps in assessing the visual acuity.\
```Contrast Sensitivity Test```: This test is used to evaluate the user's ability to distinguish contrasts.\
```Astigmatism Test```: This test helps in detecting refractive errors.\
```Color Blindness Test```: This test helps in identifying color perception deficiencies.

Each of the above tests has its own separate interface in the application. The app is  WIP, though the primary functionalities have already been added. 


Check the app at : [link](https://visioncheck.surge.sh/)

![HomePage](https://github.com/user-attachments/assets/2ed9410d-dd41-4797-b544-79e7e208af65)


![TestPage](https://github.com/user-attachments/assets/f53367a5-6cad-4a43-ae0e-72666a4dafe9)


![ResultsPage](https://github.com/user-attachments/assets/713fa751-e0c3-4bd8-a539-a7bcc6f9b8ff)

Tech Stack:- 
```React.js```, ```Vanilla CSS```,  ```HTML```, ```Express.js``` and ```Surge``` for deployment.



### OAuth configuration

VisionCheck uses a configurable OAuth provider for sign in. Add the following Vite environment variables before running or deploying the app:

```bash
VITE_OAUTH_PROVIDER_NAME="Your Provider"
VITE_OAUTH_AUTHORIZATION_URL="https://provider.example.com/oauth2/authorize"
VITE_OAUTH_CLIENT_ID="your-oauth-client-id"
VITE_OAUTH_REDIRECT_URI="http://localhost:5173/auth/callback"
VITE_OAUTH_SCOPE="openid email profile"
```

The configured OAuth app must allow the `/auth/callback` redirect URI for each environment.
