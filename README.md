**Integration Overview**

- **React Native:** React Native is an open-source UI software framework created by Facebook Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use the React framework along with native platform capabilities.
- **TypeScript:** TypeScript is a language which extends JavaScript by adding type definitions. New React Native projects target TypeScript by default, but also support JavaScript and Flow.
- **Amazon Web Services:** Amazon Web Services, Inc. is a subsidiary of Amazon that provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered, pay-as-you-go basis. Clients will often use this in combination with autoscaling.

**Quick start**

1. Clone this repo using git clone --depth=1 <https://github.com/khodal-savani/reactnative_aws.git>
2. Move to the appropriate directory: cd reactnative_aws.
3. Run npm install to install dependencies.
4. Start the Metro Server
  - First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.
  - To start Metro, run the following command from the _root_ of your React Native project:
    ```bash
    # using npm
    npm start
    
    # OR using Yarn
    yarn start
    ```
5. Start your Application
  - Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:
    
    ### For Android
    
    ```bash
    # using npm
    npm run android
    
    # OR using Yarn
    yarn android
    ```
    
    ### For iOS
    
    ```bash
    # using npm
    npm run ios
    
    # OR using Yarn
    yarn ios
    ``` 

  - If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

**Congratulations! :tada:**

You've successfully run React Native App. :partying_face:

