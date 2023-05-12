<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h1 align="center">AI Image Generator</h1>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1682547402/GitHub/image-generator/main_xsazfq.png" width="100%" >
  <p align="center">
    <a href="https://ai-image-generator-app.vercel.app/" target="_blank">Web Page</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>
    <strong>
        Table of Contents
    </strong>
  </summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#desktop">Desktop</a></li>
        <li><a href="#mobile">Mobile</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Allows the user to generate an image using a prompt, which is sent to openAI to generate the image and return the image generated with AI.

### Features

- Allows the user to generate an image via AI by providing a description
- You can share the generated image with other users
- You can search for images through the description provided
- Download each image

### Tech Stack

<table>
    <tr>
      <td align="center" width="96">          
        <br><strong>Tech</strong>
      </td>           
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487163/GitHub/assets/vite-logo-BFD4283991-seeklogo.com_s9rulc.png" width="full" height="48" alt="Vite" />
        <br><strong>Vite</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487163/GitHub/assets/react_original_logo_icon_146374_whazfv.png" width="48" height="48" alt="React" />
        <br><strong>React</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487162/GitHub/assets/file_type_tailwind_icon_130128_mwu7ie.png" width="48" height="48" alt="Tailwind CSS" />
        <br><strong>Tailwind CSS</strong>        
      </td>     
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682564470/GitHub/assets/express_jzkx6a.png" width="48" height="48" alt="Express.js" />
        <br><strong>Express.js</strong>        
      </td>     
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682564526/GitHub/assets/2560px-Node.js_logo.svg_buptpr.png" width="full" height="48" alt="Node.js" />
        <br><strong>Node.js</strong>        
      </td>     
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682564470/GitHub/assets/mongodb_obxtml.png" width="full" height="48" alt="MongoDB" />
        <br><strong>MongoDB</strong>        
      </td>     
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682550257/GitHub/assets/openai_wf5jek.png" width="48" height="48" alt="OpenAI" />
        <br><strong>OpenAI</strong>        
      </td>     
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682564470/GitHub/assets/cloudinary_sjvklt.png" width="48" height="48" alt="Express.js" />
        <br><strong>Cloudinary</strong>        
      </td>     
    </tr>
     <tr>
      <td align="center" width="96">          
        <br><strong>Version</strong>
      </td>      
      <td align="center" width="96">
        <br>4.1.0
      </td>     
      <td align="center" width="96">
        <br>18.2.0
      </td>     
      <td align="center" width="96">
        <br>3.2.7
      </td>     
      <td align="center" width="96">
        <br>4.18.2
      </td>     
      <td align="center" width="96">
        <br>18.13.0
      </td>     
      <td align="center" width="96">
        <br>6.0
      </td>     
      <td align="center" width="96">
        <br>3.2.1
      </td>     
      <td align="center" width="96">
        <br>1.35.0
      </td>     
    </tr>
  </table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Desktop

<div align="center">
  <div>
    <h3>Create & Post Image</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1682547400/GitHub/image-generator/post_csc9ua.png" width="100%" >
  </div>
  <div>
    <h3>Search</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1682547401/GitHub/image-generator/search_uqt9ma.png" width="100%" >
  </div>
</div>

### Mobile

<div align="center">
  <div>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1682547728/GitHub/image-generator/mobile_qoemik.png" width="100%" >
  </div>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

_Follow the instructions below_

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/WilmerL2000/ai-image-generator-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get & Enter your API KEY from OPENAI in `.env` file in server folder
   ```js
   API_KEY = 'ENTER YOUR API';
   ```
4. Get & Enter your MongoDB connection in `.env` file in server folder
   ```js
   API_KEY = 'ENTER YOUR API';
   ```
5. Get & Enter your API KEYS from Cloudinary in `.env` file in server folder
   ```js
   API_KEY = 'ENTER YOUR API';
   ```
6. Start project client project
   ```sh
   npm run dev
   ```
7. Start project server project
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

`Wilmer Lopez Cespedes`

- Correo: wilmerlopezcespedes@gmail.com
- <a href="https://www.linkedin.com/in/wilmer-lopez-cespedes/" target="_blank">LinkedIn</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
